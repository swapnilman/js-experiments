function Slider(wrapperId, containerId) {
  var that = this;
  var wrapper = document.getElementById(wrapperId);
  var container = document.getElementById(containerId);
  var img = wrapper.getElementsByTagName('img');

  for(var i = 0; i < img.length; i++) {
    img[i].style.left = i * 800 + 'px';
  }

  var prev = document.createElement("button");
  prev.className = 'prev';
  prev.innerHTML = '<';

  var next = document.createElement("button");
  next.className = 'next';
  next.innerHTML = '>';

  container.appendChild(prev);
  container.appendChild(next);

  var indexBtnWrapper = document.createElement("div");
  indexBtnWrapper.className = 'index-btn';

  for (var i = 1; i <= img.length; i++) {
    var btn = document.createElement("button");
    btn.classList.add('indexBtn')
    btn.id = "btn" + i;
    indexBtnWrapper.appendChild(btn)
  }

  container.appendChild(indexBtnWrapper);

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
      wrapper.style.marginLeft = that.marginLeft + 'px';

      if (!(that.marginLeft > -4000)) {
        that.marginLeft = 0;
        console.log(that.marginLeft)
      }

      if (that.marginLeft % 800 == 0) {
        clearInterval(interval);
        console.log(slideSpeed, that.marginLeft);
      }
    }, 1000 / 60);
  }

  this.listenClick = function () {
    prev.addEventListener('click', that.previous);
    next.addEventListener('click', that.next);
  }

  this.previous = function () {
    clearInterval(interval);
    that.slide(-50);
  }

  this.next = function () {
    clearInterval(interval);
    that.slide(50);
  }
}
