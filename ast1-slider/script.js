function Slider(elementId) {
  var that = this;
  var element = document.getElementById(elementId);

  var img = element.getElementsByTagName('img');
  element.appendChild(img[0]);

  console.log(img);

  for(var i = 0; i < img.length; i++) {
    img[i].style.left = i * 800 + 'px';
  }

  var prev = document.getElementById("prev");
  var next = document.getElementById("next");
  
  var interval;
  this.current = 0;
  this.marginLeft = 0;
  this.slideSpeed = 5;

  this.init = function () {
    this.autoSlide();
    this.listenClick();
  }

  this.autoSlide = function () {
    setInterval(function () {
      that.slide(5)
    }, 5000)
  }

  this.slide = function (slideSpeed) {
    interval = setInterval(function () {
      that.marginLeft -= slideSpeed;
      element.style.marginLeft = that.marginLeft + 'px';

      if (that.marginLeft < -4000) {
        that.marginLeft = 800;
      }

      if (that.marginLeft > 0) {
        that.marginLeft  = -4800;
      }

      if (that.marginLeft % 800 == 0) {
        clearInterval(interval);
      }
    }, 1000 / 60);
  }

  this.listenClick = function () {
    prev.addEventListener('click', that.previous);
    next.addEventListener('click', that.next);
  }
  
  this.previous = function () {

    that.slide(-50);
    console.log(that.marginLeft);

    // var value = that.marginLeft;
    // var remainder = value % 800;

    // value = value - remainder + 800;

    // if (value > 0) {
    //   value = -4000;
    // }

    // that.marginLeft = value;
    // element.style.marginLeft = that.marginLeft + 'px';
  }

  this.next = function () {

    that.slide(50);
    console.log(that.marginLeft);

    // var value = that.marginLeft;
    // var remainder = value % 800;

    // value = value - remainder - 800;

    // if (value < -4000) {
    //   value = 0;
    // }

    // that.marginLeft = value;
    // element.style.marginLeft = that.marginLeft + 'px';
  }
}

