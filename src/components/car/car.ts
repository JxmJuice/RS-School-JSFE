import {
  createCar,
  CreateCarObj,
  deleteCar,
  deleteWinner,
  engineDriveMode,
  getCar,
  getCarAmount,
  getCars,
  getWinner,
  startEngine,
  stopEngine,
  updateCar,
} from "../../api";
import { store } from "../../store";
import { BaseComponent } from "../baseComponent";
import { carHTML, laneModel } from "../constants";
import { CarModel } from "../models/carModel";
import "./lane.scss";

export class Car extends BaseComponent {
  public car: CarModel;

  constructor(name: string, color: string, id: string) {
    super("div", ["lane"]);
    this.car = CreateCarObj(name, color, id);
    this.RenderCar(this.car);
    this.handleStart();
    this.handleCarReset();
    const selectBtn = this.element.querySelector(".select_button");
    selectBtn?.addEventListener("click", () => {
      this.handleEdit(selectBtn as HTMLButtonElement);
    });
    (
      this.element.querySelector(".reset_button") as HTMLButtonElement
    ).disabled = true;
    const removeBTn = this.element.querySelector(".remove_button");
    if (removeBTn) {
      removeBTn.addEventListener("click", async () => {
        this.handleRemove(removeBTn as HTMLButtonElement);
      });
    }
  }

  async handleEdit(el: HTMLElement) {
    const carModel = el.closest(".lane");
    const carId = carModel?.querySelector(".car_model")?.id;
    let car = {
      name: "",
      color: "",
      id: "",
    };
    if (carId) {
      car = await getCar(carId);
    }
    const colorInput = document.getElementById(
      "edit-color"
    ) as HTMLInputElement;
    colorInput.disabled = false;
    colorInput.value = car.color;
    const textInput = document.getElementById("edit-name") as HTMLInputElement;
    textInput.disabled = false;
    textInput.value = car.name;
    const submit = document.getElementById("update") as HTMLInputElement;
    submit.disabled = false;
    this.updateModel(el,car)
  }

  async updateModel(el: HTMLElement, car: CarModel) {
    const carModel = el.closest(".lane")?.querySelector('.car');
    const colorInput = document.getElementById(
      "edit-color"
    ) as HTMLInputElement;
    const textInput = document.getElementById("edit-name") as HTMLInputElement;
    const submit = document.getElementById("update") as HTMLInputElement;
    const form = document.getElementById("edit-car");
    form?.addEventListener("submit",async () => {
      event?.preventDefault();
      await updateCar(car.id, {
        name: textInput.value,
        color: colorInput.value,
        id: car.id,
      });
      console.log(textInput.value)
      if (carModel) {
        carModel.innerHTML = carHTML(textInput.value, car.id, colorInput.value);
      }
      colorInput.disabled = true;
      textInput.disabled = true;
      textInput.value = "";
      submit.disabled = true;
    }, {once: true});
  }

  async handleRemove(el: HTMLButtonElement) {
    const model = el.closest(".lane");
    const carId = model?.querySelector(".car_model")?.id;
    model?.remove();
    const carObj = (await getCars(store.garagePage + 1, store.carsLimit))[0];
    if (carId) {
      await deleteCar(carId);
      await deleteWinner(carId).catch();
    }
    if (carObj != undefined) {
      const createdCar = new Car(carObj.name, carObj.color, carObj.id);
      document.querySelector(".garage")?.appendChild(createdCar.element);
    }
    this.handleTitle();
  }

  async handleTitle() {
    const carAmount = await getCarAmount(store.garagePage, store.carsLimit);
    if (carAmount && +carAmount <= (store.garagePage-1)*store.carsLimit ) {
      (document.getElementById("race") as HTMLButtonElement).disabled = true;
    } 
    const title = document.querySelector(".garage_title");
    if (title != undefined) {
      title.innerHTML = `Garage (${carAmount})`;
    }
  }

  public RenderCar(body: CarModel) {
    this.element.innerHTML = laneModel(this.car.name, this.car.id, body.color);
  }

  async handleStart() {
    const start = this.element.querySelector(".start_button");
    start?.addEventListener("click", async () => {
      (
        this.element.querySelector(".reset_button") as HTMLButtonElement
      ).disabled = false;
      (
        this.element.querySelector(".start_button") as HTMLButtonElement
      ).disabled = true;
      (document.getElementById("race") as HTMLButtonElement).disabled = true;
      const carId = start.closest(".lane")?.querySelector(".car_model")?.id;
      const car = document.getElementById(`${carId}`);
      if (carId != undefined) {
        const result = await startEngine(carId);
        const time = result.distance / result.velocity;
        setTimeout(() => {
          if (
            !car?.classList.contains("stop") &&
            car?.classList.contains("race")
          ) {
            car?.classList.add("stop");
          }
        }, time - 30);
        if (car != undefined) {
          car?.classList.add("race");
          car.style.setProperty("--time", time + "ms");
        }
        if (
          (await engineDriveMode(carId)).success == false &&
          car?.classList.contains("race")
        ) {
          car?.classList.add("stop");
        }
      }
    });
  }

  handleCarReset() {
    let RaceEnabled = true;
    const stop = this.element.querySelector(".reset_button");
    stop?.addEventListener("click", async () => {
      const car = this.element.querySelector(".car_model");
      if (car) {
        await stopEngine(`${car.id}`);
        car.classList.remove("race", "stop");
        setTimeout(() => {
          (
            this.element.querySelector(".start_button") as HTMLButtonElement
          ).disabled = false;
          const startBtns = document.querySelectorAll(".start_button");
          startBtns.forEach((el) => {
            if ((el as HTMLButtonElement).disabled == true) {
              RaceEnabled = false;
            }
          });
          if (RaceEnabled == true) {
            (document.getElementById("race") as HTMLButtonElement).disabled =
              false;
          }
        }, 2000);
        (
          this.element.querySelector(".reset_button") as HTMLButtonElement
        ).disabled = true;
      }
    });
  }
}
