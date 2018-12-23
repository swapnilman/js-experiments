class Bird {
  constructor(element) {
    this.x = 150;
    this.y = 0;
    this.birdElement = document.createElement("div");
    this.birdElement.id = "bird";
    this.width = 34;
    this.height = 24;
    this.birdElement.style.backgroundImage = "url(images/bird.png)";
    this.birdElement.style.top = "220px";
    this.birdElement.style.left = "150px";
    this.birdElement.style.width = "34px";
    this.birdElement.style.height = "24px";
    this.birdElement.style.position = "absolute";
    element.appendChild(this.birdElement);
    this.gravity = 2.5;
    this.initialPosition = 220;
  }
  draw() {
    this.birdElement.style.top = this.y + 'px';
  }

  newPosition(goDown) {
    if (goDown) {
      this.y += this.gravity;
      this.draw();
      if (this.y > 480) {
        gameOver();
      }
    } else {
      this.y -= this.gravity * 15;
      this.draw();
    }
  }
}


//PIPE
class Pipe {
  constructor() {
    this.isCrossed = false;
    this.pipeX = 900;
    this.pipeHeight = 150;
    this.pipeWidth = 32;
    this.padding = 80;
    this.constraint = game.height - this.pipeHeight - this.padding * 2;
    this.topHeight = Math.floor(Math.random() * this.constraint + this.padding);
    this.bottomHeight = game.height - this.pipeHeight - this.topHeight;
    this.pipeDiv = document.createElement("div");
    this.pipeDiv.className = "pipe";
    this.pipeDiv.style.left = "900px";
    element.appendChild(this.pipeDiv);
    //crete upper pipe
    this.upperPipeDiv = document.createElement("div");
    this.upperPipeDiv.className = "pipe_upper";
    this.upperPipeDiv.style.height = this.topHeight + "px";
    this.pipeDiv.appendChild(this.upperPipeDiv);
    //creating lower pipe
    this.lowerPipeDiv = document.createElement("div");
    this.lowerPipeDiv.className = "pipe_lower";
    this.lowerPipeDiv.style.height = this.bottomHeight + "px";
    this.pipeDiv.appendChild(this.lowerPipeDiv);
  }
  drawPipe() {
    this.pipeDiv.style.left = this.pipeX + 'px';
  }

  updatePipes() {
    this.pipeX -= game.dx;
    this.drawPipe();
  }
}


//GAME
class Game {
  constructor(element) {
    this.x = 1;
    this.dx = 2;
    this.gameElement = element;
    this.height = 504;
  }
  gameLoop() {
    let pipes = [];
    this.score = 0;
    let bird = new Bird(element);
    this.updateInterval = setInterval(() => {
      game.updatePosition();
      if (game.updatePosition() % 155 == 0) {
        let pipe = new Pipe;
        pipes.push(pipe);
      }
      pipes.forEach((pipe) => {

        pipe.updatePipes();
        if (pipe.pipeDiv.style.left < 0 + "px") {
          element.removeChild(pipe.pipeDiv);
          pipes.splice(0, 1);
        }
        if (pipe.pipeX + pipe.pipeWidth < bird.x && !pipe.isCrossed) {
          this.score++;
          pipe.isCrossed = true;
        }
        if (pipe.pipeX < bird.x + bird.width && pipe.pipeX + pipe.pipeWidth > bird.x) {
          //for top
          if (pipe.topHeight > bird.y) {

              gameOver();
          }
          if (game.height - pipe.bottomHeight < bird.y + bird.height) {

            gameOver();
          }
        }
      });
    }, 10);

    this.birdPos = setInterval(() => {
      bird.newPosition(true);
    }, 20);

    let dx = 2;
    let position = 0;
    this.scoreDiv = document.createElement('div');
    this.scoreDiv.style.position = "absolute";
    this.scoreDiv.style.color = "white";
    this.scoreDiv.style.fontSize = "40px";
    element.appendChild(this.scoreDiv);
    document.onkeydown = (event) => {
      if (event.keyCode == 32) {
        bird.newPosition(false); //false to go up

      }
    }
  }
  updatePosition() {
    this.scoreDiv.innerHTML = game.score;
    this.x -= this.dx;
    this.gameElement.style.backgroundPositionX = "2px";
    return this.x;
  }
}


element = document.getElementById("bg");
let game = new Game(element);

//GAMEOVER
function gameOver() {
  clearInterval(game.birdPos);
  clearInterval(game.updateInterval);
  let mainBody = document.getElementsByTagName('body');
  let gameOver = document.createElement('div');
  gameOver.style.width = "900px";
  gameOver.style.height = "504px";
  gameOver.style.background = "black";
  gameOver.style.position = "absolute";
  gameOver.style.top = "0";
  gameOver.style.left = "225px";
  gameOver.style.zIndex = "10";
  gameOver.style.opacity = "0.8";

  mainBody[0].appendChild(gameOver);

  let gameOverText = document.createElement('div');
  gameOverText.style.color = "white";
  gameOverText.innerHTML = "Game Over";
  gameOverText.style.fontSize = "85px";
  gameOverText.style.textAlign = "center";
  gameOver.appendChild(gameOverText);

  let playAgainBtn = document.createElement('button');
  playAgainBtn.innerHTML = "Play Again";
  playAgainBtn.style.padding = "20px";
  playAgainBtn.style.top = "300px";
  playAgainBtn.style.left = "385px";
  playAgainBtn.style.position = "absolute";
  gameOver.appendChild(playAgainBtn);


  playAgainBtn.onclick = function() {
    while (element.children[0])
      element.removeChild(element.children[0]);

    mainBody[0].removeChild(gameOver);
    gameOver.removeChild(playAgainBtn);
    game.gameLoop();
  }
  document.onkeydown = (event) => {
    if (event.keyCode == null) {
      bird.newPosition(false);

    }
  }
}

function startGame() {
  let element = document.getElementById('bg');
  let playBtn = document.createElement('button');
  playBtn.innerHTML = "Play Again";
  playBtn.style.padding = "20px";
  playBtn.style.top = "300px";
  playBtn.style.left = "385px";
  playBtn.style.position = "absolute";
  element.appendChild(playBtn);

  playBtn.onclick = function() {
    element.removeChild(playBtn);
    game.gameLoop();
  }
}
startGame();
