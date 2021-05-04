const activeWatchElem = document.querySelector(".slider__element_active");
const watchTarget = document.querySelector(".watch-online__slider-value");
const watchSlider = document.querySelector(".watch-online__slider_pictures");
const watchRange = document.querySelector(".watch-online__slider-range");

let watchCounter = 2;

function watchHandleUpdate() {
  const slides = watchSlider.querySelectorAll(".slider__element");
  let width;
  let margin;

  for (let slide of slides) {
    if (!slide.classList.contains("slider__element_active")) {
      width = slide.offsetWidth;
      if (width > 180) {
        continue;
      }
      break;
    }
  }
  switch (width) {
    case 140:
      margin = 15;
      break;
    case 180:
      margin = 10;
      break;
  }
  slides.forEach((slider) => {
    if (
      slider.classList.contains("slider__element_active") &&
      slider.dataset.position != watchCounter
    ) {
      slider
        .querySelector("img")
        .classList.remove("watch-online__slider_picture-active");
      slider.classList.remove("slider__element_active");
    }
    if (
      !slider.classList.contains("slider__element_active") &&
      slider.dataset.position == watchCounter
    ) {
      slider
        .querySelector("img")
        .classList.add("watch-online__slider_picture-active");
      slider.classList.add("slider__element_active");
      console.log(slider.parentElement);
      slider.parentElement.style.transform = `translateX(${
        -(slider.dataset.position - 2) * (width + margin * 2)
      }px)`;
    }
  });
}

function clickImg(elem) {
  if (elem.target.matches("img")) {
    console.log(elem.target.closest("div"));
    watchRange.value = elem.target.closest("div").dataset.position;
    console.log(watchRange.value);
    watchCounter = watchRange.value;
    console.log(watchCounter);
    watchRangeValue();
    watchHandleUpdate();
  }
}

watchSlider.addEventListener("click", clickImg);

function watchRangeValue() {
  watchCounter = watchRange.value;
  watchHandleUpdate();
  watchTarget.innerHTML = `0${watchCounter}/`;
}

watchRange.addEventListener("input", watchRangeValue);

const howRange = document.querySelector(".how__slider-range");

var rangeValue = function () {
  var newValue = howRange.value;

  var target = document.querySelector(".how__slider-value");
  target.innerHTML = `0${newValue}/`;
};

howRange.addEventListener("input", rangeValue);
const petsLeftArrow = document.querySelector(".pets__left-button");
const petsRightArrow = document.querySelector(".pets__right-button");
const petsRange = document.querySelector(".pets__slider-range");
const petsElements = document.querySelectorAll(".pets__slider_element");
let currentPetsElem = 1;
let petsFlag = true;

petsRightArrow.addEventListener("click", function () {
  if (currentPetsElem == 8) {
    currentPetsElem = 0;
  }
  console.log(currentPetsElem);
  petsRange.value = +currentPetsElem + 1;
  handleUpdate(petsRange.value);
  currentPetsElem++;
});

petsLeftArrow.addEventListener("click", function () {
  if (currentPetsElem == 1) {
    currentPetsElem = 9;
  }
  petsRange.value = currentPetsElem - 1;
  handleUpdate(petsRange.value);
  currentPetsElem--;
});
var rangeValue = function () {
  var newValue = petsRange.value;
  handleUpdate(newValue);
  currentPetsElem = petsRange.value;
};

function handleUpdate(newValue) {
  let target = document.querySelector(".pets__slider-value");
  let active = document.querySelector(".pets__slider_element.active");
  let newElem = document.querySelector(`.pet_${newValue}`);
  target.innerHTML = `0${newValue}/`;
  newElem.classList.add("active");
  active.classList.remove("active");
  if (currentPetsElem == 9) {
    newElem.parentElement.style.transform = `translateX(${
      -(currentPetsElem - 6) * 307.5
    }px)`;
  }
  if (newValue > 4 && currentPetsElem < newValue) {
    newElem.parentElement.style.transform = `translateX(${
      -(currentPetsElem - 4) * 307.5
    }px)`;
  }
  if ((newValue < 5 && newValue < currentPetsElem) || currentPetsElem == 0) {
    newElem.parentElement.style.transform = `translateX(${
      -(newValue - 2) * 307.5
    }px)`;
  }
}

petsRange.addEventListener("input", rangeValue);

const testimonialsRange = document.querySelector(".testimonials-slider-range");

var rangeValue = function () {
  var newValue = testimonialsRange.value;

  var target = document.querySelector(".testimonials__slider-value");
  target.innerHTML = `0${newValue}/`;
};

testimonialsRange.addEventListener("input", rangeValue);
