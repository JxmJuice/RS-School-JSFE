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
        carModel.innerHTML = `
      <div class="car_name">${textInput.value}</div>
      <div class="car_model" id='${car.id}'>
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="83.000000px"
          height="50.000000px"
          viewBox="0 0 512.000000 307.000000"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            transform="translate(0.000000,307.000000) scale(0.100000,-0.100000)"
            fill="${colorInput.value}"
            stroke="none"
          >
            <path
              d="M1533 2283 c-7 -2 -13 -15 -13 -29 0 -32 -18 -42 -210 -114 -91 -34
   -237 -93 -325 -132 -88 -38 -185 -74 -215 -79 -146 -24 -182 -29 -277 -35 -94
   -6 -104 -9 -118 -31 -13 -19 -14 -27 -4 -39 9 -11 9 -23 0 -53 -6 -21 -11 -64
   -11 -96 0 -46 -5 -63 -25 -86 -32 -39 -38 -76 -34 -212 4 -113 4 -114 34 -140
   17 -14 36 -36 44 -50 7 -13 28 -32 47 -41 49 -23 196 -45 353 -53 l134 -6 -6
   25 c-9 33 10 143 33 196 29 66 120 155 193 188 54 26 74 29 157 29 86 0 101
   -3 160 -31 157 -76 242 -233 221 -412 l-7 -62 1064 0 c1010 0 1064 1 1057 18
   -19 46 -17 151 4 219 68 221 313 333 524 239 74 -33 160 -117 195 -193 23 -51
   26 -71 27 -162 l0 -103 80 7 c178 14 189 24 194 184 9 283 8 317 -15 348 -33
   45 -80 71 -193 107 -244 78 -592 135 -891 145 l-215 7 -125 76 c-152 92 -403
   227 -486 262 -186 78 -354 100 -729 99 -159 -1 -334 -6 -388 -10 -87 -8 -103
   -6 -128 9 -28 17 -79 22 -106 11z m687 -88 c0 -2 14 -89 30 -191 17 -103 29
   -189 27 -191 -8 -7 -754 17 -817 27 -56 9 -70 16 -102 50 -31 32 -38 47 -38
   80 0 23 5 50 10 61 35 64 305 136 591 158 121 9 299 13 299 6z m389 -27 c68
   -11 154 -29 190 -40 74 -22 198 -86 302 -155 l70 -46 -29 -13 c-31 -13 -47
   -51 -37 -85 6 -19 -1 -19 -317 -17 l-323 3 -62 184 c-34 101 -60 187 -58 191
   7 11 122 1 264 -22z"
            />
            <path
              d="M1178 1497 c-161 -61 -251 -187 -251 -352 0 -147 71 -263 201 -327
   61 -30 74 -33 162 -33 88 0 101 3 162 33 131 64 201 179 201 327 0 145 -67
   257 -195 325 -56 30 -73 34 -153 37 -59 2 -103 -1 -127 -10z m227 -115 c52
   -27 110 -87 130 -136 20 -48 21 -152 2 -199 -20 -48 -82 -114 -131 -140 -32
   -17 -58 -22 -116 -22 -58 0 -84 5 -116 22 -49 26 -111 92 -131 140 -19 47 -18
   151 2 199 27 66 100 131 175 155 41 14 142 3 185 -19z"
            />
            <path
              d="M1208 1353 c-21 -8 -38 -18 -38 -22 0 -4 18 -25 40 -46 l40 -39 0 62
   c0 34 -1 62 -2 61 -2 0 -20 -7 -40 -16z"
            />
            <path
              d="M1330 1308 l0 -63 42 42 c23 23 40 45 37 47 -3 3 -22 12 -42 21 l-37
   15 0 -62z"
            />
            <path
              d="M1084 1235 c-21 -52 -19 -55 41 -55 39 0 55 4 55 13 0 14 -60 77 -73
   77 -5 0 -15 -16 -23 -35z"
            />
            <path
              d="M1432 1237 c-46 -47 -42 -57 23 -57 31 0 55 4 55 10 0 19 -29 80 -38
   80 -4 0 -22 -15 -40 -33z"
            />
            <path
              d="M1280 1220 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0
   -10 -4 -10 -10z"
            />
            <path
              d="M1273 1173 c-18 -7 -16 -50 2 -57 24 -9 45 4 45 29 0 18 -22 40 -33
   34 -1 0 -8 -3 -14 -6z"
            />
            <path
              d="M1202 1151 c2 -7 7 -12 11 -12 12 1 9 15 -3 20 -7 2 -11 -2 -8 -8z"
            />
            <path
              d="M1355 1151 c-6 -11 9 -23 19 -14 9 9 7 23 -3 23 -6 0 -12 -4 -16 -9z"
            />
            <path
              d="M1070 1100 c0 -6 7 -27 15 -47 l15 -37 40 39 c22 22 40 43 40 47 0 4
   -25 8 -55 8 -31 0 -55 -4 -55 -10z"
            />
            <path
              d="M1400 1102 c0 -4 18 -25 40 -47 l40 -39 15 37 c22 54 20 57 -40 57
   -30 0 -55 -4 -55 -8z"
            />
            <path
              d="M1280 1070 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0
   -10 -4 -10 -10z"
            />
            <path
              d="M1196 1001 l-38 -39 30 -16 c54 -28 62 -23 62 39 0 30 -4 55 -8 55
   -4 0 -25 -18 -46 -39z"
            />
            <path
              d="M1330 985 c0 -62 8 -67 62 -39 l30 16 -38 39 c-21 21 -42 39 -46 39
   -4 0 -8 -25 -8 -55z"
            />
            <path
              d="M4029 1491 c-111 -44 -204 -146 -229 -251 -19 -78 -9 -187 23 -252
   34 -69 107 -141 177 -176 49 -24 66 -27 155 -27 89 0 106 3 157 28 74 36 139
   101 175 175 25 51 28 68 28 157 0 87 -3 107 -27 157 -34 73 -103 142 -176 176
   -76 36 -212 42 -283 13z m203 -91 c21 -6 57 -25 80 -43 131 -100 144 -282 28
   -398 -105 -105 -266 -104 -370 1 -106 105 -106 265 0 371 70 70 167 95 262 69z"
            />
            <path
              d="M4055 1348 c-11 -6 -22 -13 -24 -15 -6 -5 71 -83 81 -83 4 0 8 25 8
   55 0 50 -2 55 -22 55 -13 0 -32 -6 -43 -12z"
            />
            <path
              d="M4190 1312 c0 -27 3 -52 7 -56 7 -6 83 62 83 74 0 10 -48 30 -70 30
   -17 0 -20 -7 -20 -48z"
            />
            <path
              d="M3962 1257 c-7 -8 -15 -28 -18 -45 l-6 -32 56 0 c31 0 56 4 56 8 0 4
   -17 25 -38 45 -32 31 -41 36 -50 24z"
            />
            <path
              d="M4297 1232 c-21 -21 -34 -41 -31 -45 4 -4 29 -7 56 -7 41 0 48 3 48
   20 0 22 -20 70 -30 70 -3 0 -23 -17 -43 -38z"
            />
            <path
              d="M4140 1220 c0 -5 7 -10 15 -10 8 0 15 5 15 10 0 6 -7 10 -15 10 -8 0
   -15 -4 -15 -10z"
            />
            <path
              d="M4130 1166 c-27 -33 18 -72 48 -42 13 13 14 20 6 34 -15 23 -38 26
   -54 8z"
            />
            <path
              d="M4070 1145 c0 -8 5 -15 10 -15 6 0 10 7 10 15 0 8 -4 15 -10 15 -5 0
   -10 -7 -10 -15z"
            />
            <path
              d="M4220 1145 c0 -8 5 -15 10 -15 6 0 10 7 10 15 0 8 -4 15 -10 15 -5 0
   -10 -7 -10 -15z"
            />
            <path
              d="M3944 1078 c12 -59 25 -63 68 -21 21 20 38 41 38 45 0 4 -25 8 -56 8
   l-56 0 6 -32z"
            />
            <path
              d="M4260 1102 c0 -10 78 -87 83 -81 13 14 27 51 27 68 0 19 -6 21 -55
   21 -30 0 -55 -4 -55 -8z"
            />
            <path
              d="M4140 1070 c0 -5 7 -10 15 -10 8 0 15 5 15 10 0 6 -7 10 -15 10 -8 0
   -15 -4 -15 -10z"
            />
            <path
              d="M4067 1002 c-42 -43 -38 -56 21 -68 l32 -6 0 56 c0 31 -4 56 -8 56
   -4 0 -25 -17 -45 -38z"
            />
            <path
              d="M4190 984 l0 -56 32 6 c59 12 63 25 21 68 -20 21 -41 38 -45 38 -4 0
   -8 -25 -8 -56z"
            />
          </g>
        </svg>
      </div>
          `;
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
    this.element.innerHTML = `
    <div class='lane-wrapper'>
    <div class="controls">
      <div class="controls_visual">
        <button class="select_button">select</button>
        <button class="remove_button">remove</button>
      </div>
      <div class="controls_engine">
        <button class="start_button">A</button>
        <button class="reset_button">B</button>
      </div>
    </div>
    <div class="car">
      <div class="car_name">${this.car.name}</div>
      <div class="car_model" id='${this.car.id}'>
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="83.000000px"
          height="50.000000px"
          viewBox="0 0 512.000000 307.000000"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            transform="translate(0.000000,307.000000) scale(0.100000,-0.100000)"
            fill="${body.color}"
            stroke="none"
          >
            <path
              d="M1533 2283 c-7 -2 -13 -15 -13 -29 0 -32 -18 -42 -210 -114 -91 -34
   -237 -93 -325 -132 -88 -38 -185 -74 -215 -79 -146 -24 -182 -29 -277 -35 -94
   -6 -104 -9 -118 -31 -13 -19 -14 -27 -4 -39 9 -11 9 -23 0 -53 -6 -21 -11 -64
   -11 -96 0 -46 -5 -63 -25 -86 -32 -39 -38 -76 -34 -212 4 -113 4 -114 34 -140
   17 -14 36 -36 44 -50 7 -13 28 -32 47 -41 49 -23 196 -45 353 -53 l134 -6 -6
   25 c-9 33 10 143 33 196 29 66 120 155 193 188 54 26 74 29 157 29 86 0 101
   -3 160 -31 157 -76 242 -233 221 -412 l-7 -62 1064 0 c1010 0 1064 1 1057 18
   -19 46 -17 151 4 219 68 221 313 333 524 239 74 -33 160 -117 195 -193 23 -51
   26 -71 27 -162 l0 -103 80 7 c178 14 189 24 194 184 9 283 8 317 -15 348 -33
   45 -80 71 -193 107 -244 78 -592 135 -891 145 l-215 7 -125 76 c-152 92 -403
   227 -486 262 -186 78 -354 100 -729 99 -159 -1 -334 -6 -388 -10 -87 -8 -103
   -6 -128 9 -28 17 -79 22 -106 11z m687 -88 c0 -2 14 -89 30 -191 17 -103 29
   -189 27 -191 -8 -7 -754 17 -817 27 -56 9 -70 16 -102 50 -31 32 -38 47 -38
   80 0 23 5 50 10 61 35 64 305 136 591 158 121 9 299 13 299 6z m389 -27 c68
   -11 154 -29 190 -40 74 -22 198 -86 302 -155 l70 -46 -29 -13 c-31 -13 -47
   -51 -37 -85 6 -19 -1 -19 -317 -17 l-323 3 -62 184 c-34 101 -60 187 -58 191
   7 11 122 1 264 -22z"
            />
            <path
              d="M1178 1497 c-161 -61 -251 -187 -251 -352 0 -147 71 -263 201 -327
   61 -30 74 -33 162 -33 88 0 101 3 162 33 131 64 201 179 201 327 0 145 -67
   257 -195 325 -56 30 -73 34 -153 37 -59 2 -103 -1 -127 -10z m227 -115 c52
   -27 110 -87 130 -136 20 -48 21 -152 2 -199 -20 -48 -82 -114 -131 -140 -32
   -17 -58 -22 -116 -22 -58 0 -84 5 -116 22 -49 26 -111 92 -131 140 -19 47 -18
   151 2 199 27 66 100 131 175 155 41 14 142 3 185 -19z"
            />
            <path
              d="M1208 1353 c-21 -8 -38 -18 -38 -22 0 -4 18 -25 40 -46 l40 -39 0 62
   c0 34 -1 62 -2 61 -2 0 -20 -7 -40 -16z"
            />
            <path
              d="M1330 1308 l0 -63 42 42 c23 23 40 45 37 47 -3 3 -22 12 -42 21 l-37
   15 0 -62z"
            />
            <path
              d="M1084 1235 c-21 -52 -19 -55 41 -55 39 0 55 4 55 13 0 14 -60 77 -73
   77 -5 0 -15 -16 -23 -35z"
            />
            <path
              d="M1432 1237 c-46 -47 -42 -57 23 -57 31 0 55 4 55 10 0 19 -29 80 -38
   80 -4 0 -22 -15 -40 -33z"
            />
            <path
              d="M1280 1220 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0
   -10 -4 -10 -10z"
            />
            <path
              d="M1273 1173 c-18 -7 -16 -50 2 -57 24 -9 45 4 45 29 0 18 -22 40 -33
   34 -1 0 -8 -3 -14 -6z"
            />
            <path
              d="M1202 1151 c2 -7 7 -12 11 -12 12 1 9 15 -3 20 -7 2 -11 -2 -8 -8z"
            />
            <path
              d="M1355 1151 c-6 -11 9 -23 19 -14 9 9 7 23 -3 23 -6 0 -12 -4 -16 -9z"
            />
            <path
              d="M1070 1100 c0 -6 7 -27 15 -47 l15 -37 40 39 c22 22 40 43 40 47 0 4
   -25 8 -55 8 -31 0 -55 -4 -55 -10z"
            />
            <path
              d="M1400 1102 c0 -4 18 -25 40 -47 l40 -39 15 37 c22 54 20 57 -40 57
   -30 0 -55 -4 -55 -8z"
            />
            <path
              d="M1280 1070 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0
   -10 -4 -10 -10z"
            />
            <path
              d="M1196 1001 l-38 -39 30 -16 c54 -28 62 -23 62 39 0 30 -4 55 -8 55
   -4 0 -25 -18 -46 -39z"
            />
            <path
              d="M1330 985 c0 -62 8 -67 62 -39 l30 16 -38 39 c-21 21 -42 39 -46 39
   -4 0 -8 -25 -8 -55z"
            />
            <path
              d="M4029 1491 c-111 -44 -204 -146 -229 -251 -19 -78 -9 -187 23 -252
   34 -69 107 -141 177 -176 49 -24 66 -27 155 -27 89 0 106 3 157 28 74 36 139
   101 175 175 25 51 28 68 28 157 0 87 -3 107 -27 157 -34 73 -103 142 -176 176
   -76 36 -212 42 -283 13z m203 -91 c21 -6 57 -25 80 -43 131 -100 144 -282 28
   -398 -105 -105 -266 -104 -370 1 -106 105 -106 265 0 371 70 70 167 95 262 69z"
            />
            <path
              d="M4055 1348 c-11 -6 -22 -13 -24 -15 -6 -5 71 -83 81 -83 4 0 8 25 8
   55 0 50 -2 55 -22 55 -13 0 -32 -6 -43 -12z"
            />
            <path
              d="M4190 1312 c0 -27 3 -52 7 -56 7 -6 83 62 83 74 0 10 -48 30 -70 30
   -17 0 -20 -7 -20 -48z"
            />
            <path
              d="M3962 1257 c-7 -8 -15 -28 -18 -45 l-6 -32 56 0 c31 0 56 4 56 8 0 4
   -17 25 -38 45 -32 31 -41 36 -50 24z"
            />
            <path
              d="M4297 1232 c-21 -21 -34 -41 -31 -45 4 -4 29 -7 56 -7 41 0 48 3 48
   20 0 22 -20 70 -30 70 -3 0 -23 -17 -43 -38z"
            />
            <path
              d="M4140 1220 c0 -5 7 -10 15 -10 8 0 15 5 15 10 0 6 -7 10 -15 10 -8 0
   -15 -4 -15 -10z"
            />
            <path
              d="M4130 1166 c-27 -33 18 -72 48 -42 13 13 14 20 6 34 -15 23 -38 26
   -54 8z"
            />
            <path
              d="M4070 1145 c0 -8 5 -15 10 -15 6 0 10 7 10 15 0 8 -4 15 -10 15 -5 0
   -10 -7 -10 -15z"
            />
            <path
              d="M4220 1145 c0 -8 5 -15 10 -15 6 0 10 7 10 15 0 8 -4 15 -10 15 -5 0
   -10 -7 -10 -15z"
            />
            <path
              d="M3944 1078 c12 -59 25 -63 68 -21 21 20 38 41 38 45 0 4 -25 8 -56 8
   l-56 0 6 -32z"
            />
            <path
              d="M4260 1102 c0 -10 78 -87 83 -81 13 14 27 51 27 68 0 19 -6 21 -55
   21 -30 0 -55 -4 -55 -8z"
            />
            <path
              d="M4140 1070 c0 -5 7 -10 15 -10 8 0 15 5 15 10 0 6 -7 10 -15 10 -8 0
   -15 -4 -15 -10z"
            />
            <path
              d="M4067 1002 c-42 -43 -38 -56 21 -68 l32 -6 0 56 c0 31 -4 56 -8 56
   -4 0 -25 -17 -45 -38z"
            />
            <path
              d="M4190 984 l0 -56 32 6 c59 12 63 25 21 68 -20 21 -41 38 -45 38 -4 0
   -8 -25 -8 -56z"
            />
          </g>
        </svg>
      </div>
    </div>
    <div class='road'></div>
    </div>
        `;
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
