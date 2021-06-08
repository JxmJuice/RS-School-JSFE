import { createCar, getCarAmount, getCars, GetRandomColor, GetRandomName } from "../../api";
import { store } from "../../store";
import { BaseComponent } from "../baseComponent";
import { Car } from "../car/car";
import "./garage.scss";
import { CarModel } from "../models/carModel";

export class Garage extends BaseComponent {
  constructor() {
    let temp;
    super("div", ["garage"]);
    this.element.innerHTML = `
    <nav class="nav">
      <button class="nav_btn">
        to garage
      </button>
      <button class="nav_btn">
        to winners
      </button>
    </nav>
      <div class="garage">
    <h1 class="garage_title">Garage (4)</h1>
    <div class="garage_forms">
    <form id="create-car">
        <input type="text"  class="car-name-input">
        <input type="color" class="car-color-input">
        <input type="submit" value="Create" class="submit-btn">
    </form>
    <form id="edit-car" class="disabled">
      <input type="text" class="car-name-input">
      <input type="color" class="car-color-input">
      <input type="submit" value="Update" class="submit-btn">
  </form> 
</div>
<nav class="garage_nav">
  <button class="garage_nav__btn" id="race">race</button>
  <button class="garage_nav__btn" id="reset">reset</button>
  <button class="garage_nav__btn" id="generate">generate cars</button>
</nav>
        `;
    this.renderGarage();
  }

  async renderGarage() {
    const carAmount = await getCarAmount(store.page,store.carsLimit);
    const carList:CarModel[] = await getCars(store.page,store.carsLimit);
    carList.forEach(element => {
      new Car(element.name, element.color);
    });
  }

  private GetPromiseResult(req:any) {
    req.then((result:string)=>{return result})
  }
}
