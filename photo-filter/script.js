const filters = document.querySelector(".filters");
const inputs = filters.querySelectorAll("input");
function handleUpdate() {
  const sizing = this.dataset.sizing || "";
  let output = this.closest("label").querySelector("output");
  document.documentElement.style.setProperty(
    `--${this.name}`,
    this.value + sizing
  );
  output.value = this.value;
}
inputs.forEach((element) => {
  element.addEventListener("input", handleUpdate);
});

const resetBtn = document.querySelector(".btn-reset");
resetBtn.addEventListener("click", reset);
function reset() {
  inputs.forEach((element) => {
    let output = element.closest("label").querySelector("output");
    const sizing = element.dataset.sizing || "";
    if (element.name === "saturate") {
      element.value = 100;
      document.documentElement.style.setProperty(
        `--${element.name}`,
        element.value + sizing
      );
      output.value = element.value;
    } else {
      element.value = 0;
      document.documentElement.style.setProperty(
        `--${element.name}`,
        element.value + sizing
      );
      output.value = element.value;
    }
  });
}

const day =
  "https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/day/";
const evening =
  "https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/";
const morning =
  "https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/morning/";
const night =
  "https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/night/";
const images = [
  "01.jpg",
  "02.jpg",
  "03.jpg",
  "04.jpg",
  "05.jpg",
  "06.jpg",
  "07.jpg",
  "08.jpg",
  "09.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
  "13.jpg",
  "14.jpg",
  "15.jpg",
  "16.jpg",
  "17.jpg",
  "18.jpg",
  "19.jpg",
  "20.jpg",
];
const date = new Date();
const nextBtn = document.querySelector(".btn-next");
let base;
let counter = 0;
image = document.querySelector("img");
nextBtn.addEventListener("click", nextPicture);
nextBtn.onload = nextPicture;
function nextPicture() {
  counter++;
  if (counter > 19) {
    counter = 0;
  }
  loadBtn.value = "";
  if (date.getHours() >= 0 && date.getHours() < 6) {
    base = night;
  } else if (date.getHours() >= 6 && date.getHours() < 12) {
    base = morning;
  } else if (date.getHours() >= 12 && date.getHours() < 18) {
    base = day;
  } else if (date.getHours() >= 18 && date.getHours() < 24) {
    base = evening;
  }
  image.src = base + images[counter];
}
const loadBtn = document.querySelector(".btn-load--input");
loadBtn.addEventListener("change", loadImg);
function loadImg() {
  const file = loadBtn.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    image.src = reader.result;
    console.log(image);
  };
  reader.readAsDataURL(file);
}

const saveBtn = document.querySelector(".btn-save");
const canvas = document.querySelector("canvas");
function drawImage() {
  const img = new Image();
  img.setAttribute("crossOrigin", "anonymous");
  if (date.getHours() >= 0 && date.getHours() < 6) {
    base = night;
  } else if (date.getHours() >= 6 && date.getHours() < 12) {
    base = morning;
  } else if (date.getHours() >= 12 && date.getHours() < 18) {
    base = day;
  } else if (date.getHours() >= 18 && date.getHours() < 24) {
    base = evening;
  }
  img.src = image.src;
  console.log(img);
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
  };
}
saveBtn.addEventListener("click", function (e) {
  drawImage();
  console.log(canvas);
  console.log(canvas.toDataURL());
  let link = document.createElement("a");
  link.download = "image.png";
  link.href = canvas.toDataURL();
  link.click();
  link.delete;
});
