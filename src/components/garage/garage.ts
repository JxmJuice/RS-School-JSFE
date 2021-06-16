import {
  createCar,
  CreateCarObj,
  createWinner,
  deleteCar,
  engineDriveMode,
  getCar,
  getCarAmount,
  getCars,
  GetRandomColor,
  GetRandomName,
  getWinner,
  startEngine,
  stopEngine,
  updateCar,
  updateWinner,
} from "../../api";
import { store } from "../../store";
import { BaseComponent } from "../baseComponent";
import { Car } from "../car/car";
import "./garage.scss";
import { CarModel } from "../models/carModel";
import { PopUp } from "../winnersPopUp/popUp";

export class Garage extends BaseComponent {
  isWinner: boolean;

  constructor() {
    super("div", ["garage"]);
    this.element.innerHTML = `
      <div class="garage">
    <h1 class="garage_title">Garage (4)</h1>
    <div class="garage_forms">
    <form id="create-car">
        <input type="text" required minlength = "3" maxlength = "30" class="car-name-input" id='create-name'>
        <input type="color" value='#ffffff' class="car-color-input" id='create-color'>
        <input type="submit" value="Create" class="submit-btn" id='create'>
    </form>
    <form id="edit-car">
      <input type="text" disabled required minlength = "3" maxlength = "30" class="car-name-input disabled" id='edit-name'>
      <input type="color" disabled value='#ffffff' class="car-color-input" id='edit-color'>
      <input type="submit" disabled value="Update" class="submit-btn" id='update'>
  </form> 
</div>
<nav class="garage_nav">
  <button class="garage_nav__btn" id="race">race</button>
  <button class="garage_nav__btn" id="reset">reset</button>
  <button class="garage_nav__btn" id="generate">generate cars</button>
</nav>
<div class="pagination">
<button id="prev-page" class="pagination_btn">prev</button>
<button id="next-page" class="pagination_btn">next</button>
<div class="pagination_page">Page #${store.garagePage}</div>
</div>
        `;
    this.isWinner = false;
    this.handleGarage();
  }

  async handleGarage() {
    const carList: CarModel[] = await getCars(
      store.garagePage,
      store.carsLimit
    );
    carList.forEach((element) => {
      const car = new Car(element.name, element.color, element.id);
      this.element.appendChild(car.element);
    });

    this.handleTitle();

    document.getElementById("race")?.addEventListener("click", async () => {
      this.handleRace();
    });

    document.getElementById("reset")?.addEventListener("click", async () => {
      this.handleReset();
    });

    this.handleCreate();
    (document.getElementById("reset") as HTMLButtonElement).disabled = true;

    this.handleGenerate();

    this.handleNextPage();

    this.handlePrevPage();
  }

  async handleNextPage() {
    const carAmount = await getCarAmount(store.garagePage, store.carsLimit);
    const nextPageBtn = document.getElementById(
      "next-page"
    ) as HTMLButtonElement;

    if (carAmount) {
      if (Math.ceil(+carAmount / 7) <= store.garagePage) {
        nextPageBtn.disabled = true;
      }
      nextPageBtn.addEventListener("click", () => {
        store.garagePage++;
        if (Math.ceil(+carAmount / 7) <= store.garagePage) {
          nextPageBtn.disabled = true;
        }
        this.element.innerHTML = `
        <div class="garage">
      <h1 class="garage_title">Garage (${carAmount})</h1>
      <div class="garage_forms">
      <form id="create-car">
          <input type="text" required minlength = "3" maxlength = "30" class="car-name-input" id='create-name'>
          <input type="color" value='#ffffff' class="car-color-input" id='create-color'>
          <input type="submit" value="Create" class="submit-btn" id='create'>
      </form>
      <form id="edit-car">
        <input type="text" disabled required minlength = "3" maxlength = "30" class="car-name-input disabled" id='edit-name'>
        <input type="color" disabled value='#ffffff' class="car-color-input" id='edit-color'>
        <input type="submit" disabled value="Update" class="submit-btn" id='update'>
    </form> 
  </div>
  <nav class="garage_nav">
    <button class="garage_nav__btn" id="race">race</button>
    <button class="garage_nav__btn" id="reset" disabled>reset</button>
    <button class="garage_nav__btn" id="generate">generate cars</button>
  </nav>
  <div class="pagination">
  <button id="prev-page" class="pagination_btn">prev</button>
  <button id="next-page" class="pagination_btn">next</button>
  <div class="pagination_page">Page #${store.garagePage}</div>
  </div>
          `;
        this.handleGarage();
      });
    }
  }

  async handlePrevPage() {
    const carAmount = await getCarAmount(store.garagePage, store.carsLimit);
    const prevPageBtn = document.getElementById(
      "prev-page"
    ) as HTMLButtonElement;

    if (carAmount) {
      if (store.garagePage == 1) {
        prevPageBtn.disabled = true;
      }
      prevPageBtn.addEventListener("click", () => {
        store.garagePage--;
        if (store.garagePage == 1) {
          prevPageBtn.disabled = true;
        }
        this.element.innerHTML = `
        <div class="garage">
      <h1 class="garage_title">Garage (${carAmount})</h1>
      <div class="garage_forms">
      <form id="create-car">
          <input type="text" required minlength = "3" maxlength = "30" class="car-name-input" id='create-name'>
          <input type="color" value='#ffffff' class="car-color-input" id='create-color'>
          <input type="submit" value="Create" class="submit-btn" id='create'>
      </form>
      <form id="edit-car">
        <input type="text" disabled required minlength = "3" maxlength = "30" class="car-name-input disabled" id='edit-name'>
        <input type="color" disabled value='#ffffff' class="car-color-input" id='edit-color'>
        <input type="submit" disabled value="Update" class="submit-btn" id='update'>
    </form> 
  </div>
  <nav class="garage_nav">
    <button class="garage_nav__btn" id="race">race</button>
    <button class="garage_nav__btn" id="reset" disabled>reset</button>
    <button class="garage_nav__btn" id="generate">generate cars</button>
  </nav>
  <div class="pagination">
  <button id="prev-page" class="pagination_btn">prev</button>
  <button id="next-page" class="pagination_btn">next</button>
  <div class="pagination_page">Page #${store.garagePage}</div>
  </div>
          `;
        this.handleGarage();
      });
    }
  }

  async handleTitle() {
    const carAmount = await getCarAmount(store.garagePage, store.carsLimit);
    if (carAmount && +carAmount == 0) {
      (document.getElementById("race") as HTMLButtonElement).disabled = true;
    } else {
      (document.getElementById("race") as HTMLButtonElement).disabled = false;
    }
    const title = document.querySelector(".garage_title");
    if (title != undefined) {
      title.innerHTML = `Garage (${carAmount})`;
    }
  }

  async handleRace() {
    this.isWinner = false;

    const STOPDELAY = 30;

    let defaultTime = 5000;

    const resetBtn = document.getElementById("reset") as HTMLButtonElement;
    resetBtn.disabled = true;

    const raceBtn = document.getElementById("race") as HTMLButtonElement;
    raceBtn.disabled = true;

    const cars = document.querySelectorAll(".car_model");

    const startTime = new Date();

    const startBtns = document.querySelectorAll(".start_button");
    startBtns.forEach((el) => {
      (el as HTMLButtonElement).disabled = true;
    });

    cars.forEach(async (el) => {
      const carId = el.id;
      const car = document.getElementById(`${carId}`);
      if (carId != undefined) {
        const result = await startEngine(carId);
        const time = result.distance / result.velocity;
        if (time + 1000 > defaultTime) {
          defaultTime = time + 1000;
        }
        setTimeout(async () => {
          if (
            !car?.classList.contains("stop") &&
            car?.classList.contains("race")
          ) {
            car?.classList.add("stop");
            const stopTime = new Date();
            if (this.isWinner == false) {
              this.isWinner = true;
              const winnerTime = +stopTime - +startTime + STOPDELAY;
              const winnerCar = await getCar(car.id);
              const existingWinner = await getWinner(car.id).catch();
              if (Object.keys(existingWinner).length != 0) {
                if (winnerTime/1000 < existingWinner.time) {
                  await updateWinner(car.id, {
                    wins: existingWinner.wins + 1,
                    time: winnerTime/1000,
                  });
                } else {
                  await updateWinner(car.id, {
                    wins: existingWinner.wins + 1,
                    time: existingWinner.time,
                  });
                }
              } else {
                await createWinner({
                  id: carId,
                  wins: 1,
                  time: winnerTime/1000,
                });
              }
              const winnerPopUp = new PopUp(winnerCar.name, winnerTime);
              this.element.appendChild(winnerPopUp.element);
            }
          }
        }, time - STOPDELAY);
        if (car != undefined) {
          car?.classList.add("race");
          car.style.setProperty("--time", time + "ms");
        }
        const res = await engineDriveMode(carId);
        if (res.success == false && car?.classList.contains("race")) {
          car?.classList.add("stop");
        }
      }
    });
    resetBtn.disabled = false;
  }

  async handleReset() {
    this.isWinner = true;

    const startBtns = document.querySelectorAll(".start_button");

    const resetBtn = document.getElementById("reset") as HTMLButtonElement;
    resetBtn.disabled = true;

    const raceBtn = document.getElementById("race") as HTMLButtonElement;

    const cars = document.querySelectorAll(".car_model");
    cars.forEach(async (el) => {
      await stopEngine(`${el.id}`);
      el.classList.remove("race");
      el.classList.remove("stop");
    });
    setTimeout(() => {
      startBtns.forEach((el) => {
        (el as HTMLButtonElement).disabled = false;
      });
      raceBtn.disabled = false;
    }, 6000);
  }

  async handleGenerate() {
    const generateBtn = document.getElementById("generate");
    generateBtn?.addEventListener("click", async () => {
      for (let i = 0; i < 100; i++) {
        const carName = GetRandomName();
        const carColor = GetRandomColor();
        const car = {
          name: carName,
          color: carColor,
        };
        createCar(car);
        const carAmount = await getCarAmount(store.garagePage, store.carsLimit);
        if (carAmount) {
          if (!(+carAmount > store.garagePage * store.carsLimit)) {
            const nextPageBtn = document.getElementById(
              "next-page"
            ) as HTMLButtonElement;
            nextPageBtn.disabled = false;
            const cars = await getCars(store.garagePage, store.carsLimit);
            const id = cars[cars.length - 1].id;
            const createdCar = new Car(car.name, car.color, id);
            this.element.appendChild(createdCar.element);
          }
        }
      }

      const carAmount = await getCarAmount(store.garagePage, store.carsLimit);
      const nextPageBtn = document.getElementById(
        "next-page"
      ) as HTMLButtonElement;

      if (carAmount) {
        if (Math.ceil(+carAmount / 7) <= store.garagePage) {
          nextPageBtn.disabled = true;
        }
      }
      this.handleTitle();
    });
  }

  async handleCreate() {
    document
      .getElementById("create-car")
      ?.addEventListener("submit", async () => {
        event?.preventDefault();
        const nameInput = document.getElementById(
          "create-name"
        ) as HTMLInputElement;

        const name = nameInput.value;
        const colorInput = document.getElementById(
          "create-color"
        ) as HTMLInputElement;
        const color = colorInput.value;

        const tempCar = CreateCarObj(name, color, "");
        const car = {
          name: tempCar.name,
          color: tempCar.color,
        };

        createCar(car);
        const carAmount = await getCarAmount(store.garagePage, store.carsLimit);
        if (carAmount) {
          if (!(+carAmount > store.garagePage * store.carsLimit)) {
            const cars = await getCars(store.garagePage, store.carsLimit);
            const id = cars[cars.length - 1].id;
            const createdCar = new Car(car.name, car.color, id);
            this.element.appendChild(createdCar.element);
          }
        }
        const nextPageBtn = document.getElementById(
          "next-page"
        ) as HTMLButtonElement;
        if (carAmount) {
          if (Math.ceil(+carAmount / 7) >= store.garagePage) {
            nextPageBtn.disabled = false;
          }
        }
        this.handleTitle();
      });
  }
}
