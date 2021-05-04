const mapRange = document.querySelector(".map-slider-range");
const arrowLeft = document.querySelector("#arrow_left");
const arrowRight = document.querySelector("#arrow_right");
const mapTarget = document.querySelector(".map__slider-value");
const panda = document.querySelector(".map__placeholder_1");
const eagle = document.querySelector(".map__placeholder_2");
const alligator = document.querySelector(".map__placeholder_3");
const gorilla = document.querySelector(".map__placeholder_4");
const mapButton = document.querySelector(".map__button");
let counter = 2;

function handlePlaceholder(counter){
    if(counter == 2){
        mapButton.closest("a").href="../zoos/panda/panda.html";
        if(!panda.classList.contains("active")){
            panda.classList.add("active");
        }
    }else{
        mapButton.closest("a").href="#";
      if(panda.classList.contains("active")){
          panda.classList.remove("active");
      }
    }
    if(counter == 7){
        mapButton.closest("a").href="../zoos/eagle/eagle.html";
        if(!eagle.classList.contains("active")){
            eagle.classList.add("active");
        }
    }else{
      if(eagle.classList.contains("active")){
          eagle.classList.remove("active");
      }
    }
    if(counter == 6){
        mapButton.closest("a").href="../zoos/alligator/alligator.html";
        if(!alligator.classList.contains("active")){
            alligator.classList.add("active");
        }
    }else{
      if(alligator.classList.contains("active")){
          alligator.classList.remove("active");
      }
    }
    if(counter == 1){
        mapButton.closest("a").href="../zoos/gorilla/gorilla.html";
        if(!gorilla.classList.contains("active")){
            gorilla.classList.add("active");
        }
    }else{
      if(gorilla.classList.contains("active")){
          gorilla.classList.remove("active");
      }
    }
}

function rangeValue() {
  let newValue = mapRange.value;
  counter = newValue;
  handlePlaceholder(counter);
  const act = document.querySelector(".slider__element_active");
  const newAct = document.querySelector(`.el_${newValue}`);
  act.classList.remove("slider__element_active");
  newAct.classList.add("slider__element_active");
  mapTarget.innerHTML = `0${newValue}/`;
}

mapRange.addEventListener("input", rangeValue);

arrowLeft.addEventListener("click", left);

function left() {
  if (counter == 1) {
    counter = 8;
    handlePlaceholder(counter);
    mapTarget.innerHTML = `0${counter}/`;
    mapRange.value = counter;
    const act = document.querySelector(".slider__element_active");
    const newAct = document.querySelector(`.el_${counter}`);
    act.classList.remove("slider__element_active");
    newAct.classList.add("slider__element_active");
    return;
  }
  counter--;
  handlePlaceholder(counter);
  mapTarget.innerHTML = `0${counter}/`;
  mapRange.value = counter;
  const act = document.querySelector(".slider__element_active");
  const newAct = document.querySelector(`.el_${counter}`);
  act.classList.remove("slider__element_active");
  newAct.classList.add("slider__element_active");
}

arrowRight.addEventListener("click", right);

function right() {
  if (counter == 8) {
    counter = 1;
    handlePlaceholder(counter);
    mapTarget.innerHTML = `0${counter}/`;
    mapRange.value = counter;
    const act = document.querySelector(".slider__element_active");
    const newAct = document.querySelector(`.el_${counter}`);
    act.classList.remove("slider__element_active");
    newAct.classList.add("slider__element_active");
    return;
  }
  counter++;
  handlePlaceholder(counter);
  mapTarget.innerHTML = `0${counter}/`;
  mapRange.value = counter;
  const act = document.querySelector(".slider__element_active");
  const newAct = document.querySelector(`.el_${counter}`);
  act.classList.remove("slider__element_active");
  newAct.classList.add("slider__element_active");
}

panda.addEventListener("click", handlePanda);

function handlePanda(){
    panda.classList.add("active");
    const current = document.querySelector(`.el_${counter}`);
    console.log(current);
    current.classList.remove("slider__element_active");
    const temp = document.querySelector(".el_2");
    temp.classList.add("slider__element_active");
    counter = 2;
    handlePlaceholder(counter);
    mapTarget.innerHTML = `0${counter}/`;
    mapRange.value = counter;
}

alligator.addEventListener("click", handleAlligator);
function handleAlligator(){
    alligator.classList.add("active");
    const current = document.querySelector(`.el_${counter}`);
    console.log(current);
    current.classList.remove("slider__element_active");
    const temp = document.querySelector(".el_6");
    temp.classList.add("slider__element_active");
    counter = 6;
    handlePlaceholder(counter);
    mapTarget.innerHTML = `0${counter}/`;
    mapRange.value = counter;
}

eagle.addEventListener("click", handleEagle);
function handleEagle(){
    eagle.classList.add("active");
    const current = document.querySelector(`.el_${counter}`);
    console.log(current);
    current.classList.remove("slider__element_active");
    const temp = document.querySelector(".el_7");
    temp.classList.add("slider__element_active");
    counter = 7;
    handlePlaceholder(counter);
    mapTarget.innerHTML = `0${counter}/`;
    mapRange.value = counter;
}

gorilla.addEventListener("click", handleGorilla);
function handleGorilla(){
    gorilla.classList.add("active");
    const current = document.querySelector(`.el_${counter}`);
    console.log(current);
    current.classList.remove("slider__element_active");
    const temp = document.querySelector(".el_1");
    temp.classList.add("slider__element_active");
    counter = 1;
    handlePlaceholder(counter);
    mapTarget.innerHTML = `0${counter}/`;
    mapRange.value = counter;
}


