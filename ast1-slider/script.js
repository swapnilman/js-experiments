function Slider(sliderId, wrapperId) {
  var that = this;
  var slider = document.getElementById(sliderId);
  var wrapper = document.getElementById(wrapperId)

  var img = slider.getElementsByTagName('img');
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
    this.createButton();
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
      slider.style.marginLeft = that.marginLeft + 'px';

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
    // slider.style.marginLeft = that.marginLeft + 'px';
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
    // slider.style.marginLeft = that.marginLeft + 'px';
  }

  this.createButton = function () {
    console.log(img)
    console.log(wrapper)
    for (var i = 1; i <= img.length; i++) {
      var btn = document.createElement("button");
      btn.id = "btn" + i;
      btn.style.border = "1px solid black";
      btn.style.borderRadius = "10px";
      btn.style.height = "15px";
      btn.style.width = "15px";
      btn.style.zIndex = 5;

      wrapper.appendChild(btn);

      // btn.addEventListener('click', function (i) {
      //   return function () {
      //     that.goto(i);
      //     that.changeColor(i);
      //
      //   }
      // }(i));

      // this.reset = function () {
      //   btn1.style.backgroundColor = '';
      //   btn2.style.backgroundColor = '';
      //   btn3.style.backgroundColor = '';
      //   btn4.style.backgroundColor = '';
      //   btn5.style.backgroundColor = '';
      // }

      // this.changeColor = function (i) {
      //   that.reset();
      //   var value = that.marginLeft;
      //   var quotient = value / 1024;
      //   console.log('quotient' + (1 - quotient));
      //   var b = document.querySelector("#btn" + (1 - quotient));
      //   if (that.marginLeft == 0) {
      //     b.setAttribute("class", "active");
      //     b.style.border = "1px solid black";
      //     b.style.backgroundColor = "#8E44AD  ";
      //   }
      //   if (that.marginLeft == -1024) {
      //     b.setAttribute("class", "active");
      //     b.style.border = "1px solid black";
      //     b.style.backgroundColor = "#8E44AD  ";
      //   }
      //   if (that.marginLeft == -2048) {
      //     b.setAttribute("class", "active");
      //     b.style.border = "1px solid black";
      //     b.style.backgroundColor = "#8E44AD  ";
      //   }
      //   if (that.marginLeft == -3072) {
      //     b.setAttribute("class", "active");
      //     b.style.border = "1px solid black";
      //     b.style.backgroundColor = "#8E44AD  ";
      //   }
      //   if (that.marginLeft == -4096) {
      //     b.setAttribute("class", "active");
      //     b.style.border = "1px solid black";
      //     b.style.backgroundColor = "#8E44AD  ";
      //   }
      // };
      // clearInterval(intervalId);
    }
}
}
