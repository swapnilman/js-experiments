(function() {
  const APP_HEIGHT = 600;
  const APP_WIDTH = 600;

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  function Box(x, y, parentEl) {
    this.x = x;
    this.y = y;
    this.element;

    this.createBox = function() {
      this.element = document.createElement('div');
      this.element.classList.add('box');
      parentEl.appendChild(this.element);
    }

    this.draw = function() {
      this.element.style.top = this.y + 'px';
      this.element.style.left = this.x + 'px';
    }

    this.update = function() {
      this.x += 1;
      this.y += 1;
    }
  }

  function Game() {
    var boxes = [];
    var gameInterval;

    this.init = function() {
      var app = document.getElementById('container');

      for (var i = 1; i <= 10; i++) {
        var randomX = getRandomInt(0, APP_WIDTH);
        var randomY = getRandomInt(0, APP_HEIGHT);
        var box = new Box(randomX, randomY, app);
        box.createBox();
        boxes.push(box);
      }

      gameInterval = setInterval(this.move, 50);
    }

    this.move = function() {
      boxes.forEach(function(box) {
        box.update();
        box.draw();
      });
    }
  }

  new Game().init();
})()
