// Individual Box Class

function Box() {
  this.element = document.createElement("div");

  this.posX;
  this.posY;
  this.movePosX = 1;
  this.movePosY = 1;

  var that = this;

  this.addClass = function(className) {
    that.element.className = className;
  }


  this.setInitialPos = function() {
    this.posX = Math.floor((Math.random() * 850) + 1);
    this.posY = Math.floor((Math.random() * 450) + 1);

    that.element.style.left = that.posX + 'px';
    that.element.style.top = that.posY + 'px';
  }

  this.appendTo = function(parentElement) {
    parentElement.appendChild(that.element);
  }
}


//Class for animating each box

function BoxAnimator(boxObj) {
  var boxes = boxObj;

  var intervalId;

  var that = this;

  this.animate = function(speed) {
    intervalId = setInterval(function() {
      for (var i = 0; i < boxes.length; i++) {
        that.boxCollide(i);
        that.wallCollide(i);
        boxes[i].posX += boxes[i].movePosX;
        boxes[i].posY += boxes[i].movePosY;
        boxes[i].element.style.left = boxes[i].posX + 'px';
        boxes[i].element.style.top = boxes[i].posY + 'px';
      }
    }, speed);
  }

  this.wallCollide = function(i) {
    if ((boxes[i].posX <= 0) || (boxes[i].posX >= 870)) {
      boxes[i].movePosX *= -1;
    }
    if ((boxes[i].posY <= 0) || (boxes[i].posY >= 470)) {
      boxes[i].movePosY *= -1;
    }
  }

  this.boxCollide = function(i) {
    for (var j = 0; j < boxes.length; j++) {
      if (i != j) {
        if (((boxes[i].posX + 30) >= boxes[j].posX) && (boxes[i].posX <= (boxes[j].posX + 30)) && ((boxes[i].posY + 30) >= boxes[j].posY) && (boxes[i].posY <= (boxes[j].posY + 30))) {
          // code to detect which side the box got hit
          boxHeightY = boxes[i].posY + 30;
          box2HeightY = boxes[j].posY + 30;
          boxWidthX = boxes[i].posX + 30;
          box2WidthX = boxes[j].posX + 30;

          t_diff = boxHeightY - boxes[j].posY;
          b_diff = box2HeightY - boxes[i].posY;
          l_diff = boxWidthX - boxes[j].posX;
          r_diff = box2WidthX - boxes[i].posX;

          if (t_diff <= b_diff && t_diff <= l_diff && t_diff <= r_diff) {
            if (boxes[i].movePosY == 0) {
              boxes[i].movePosY = 1;
            }
            boxes[i].movePosY *= -1;
          }
          if (b_diff <= t_diff && b_diff <= l_diff && b_diff <= r_diff) {
            if (boxes[i].movePosY == 0) {
              boxes[i].movePosY = -1;
            }
            boxes[i].movePosY *= -1;
          }
          if (l_diff <= r_diff && l_diff <= t_diff && l_diff <= b_diff) {
            if (boxes[i].movePosX == 0) {
              boxes[i].movePosX = 1;
            }
            boxes[i].movePosX *= -1;
          }
          if (r_diff <= l_diff && r_diff <= t_diff && r_diff <= b_diff) {
            if (boxes[i].movePosX == 0) {
              boxes[i].movePosX = -1;
            }
            boxes[i].movePosX *= -1;
          }
        }
      }
    }
  }

}


// MAIN CLASS OF THE APPLICATION

function BoxCollider() {
  var boxes = [];
  var container;
  var totalBoxes = 6;


  var box;
  var boxAnimator;

  var that = this;

  this.start = function() {
    container = document.getElementsByClassName('container')[0];


    for (var i = 0; i < totalBoxes; i++) {
      box = new Box();
      box.addClass('box');
      box.setInitialPos();
      box.appendTo(container);

      boxes.push(box);
    }

    that.startBoxCollider();
  }

  this.startBoxCollider = function() {
    boxAnimator = new BoxAnimator(boxes);
    boxAnimator.animate(10);

  }
}

var boxCollider = new BoxCollider();
boxCollider.start();
