import { BaseComponent } from "./components/baseComponent";
import { Garage } from "./components/garage/garage";
import './app.scss'
import { Winners } from "./components/winnersPage/winners";
import { store } from "./store";

export class App extends BaseComponent{

    private Garage?: Garage;

    private Winners: Winners;

    constructor(){
        super('main',['main']);
        this.element.innerHTML = `
        <nav class="nav">
        <button class="nav_btn" id = "garage_btn">
          to garage
        </button>
        <button class="nav_btn" id ="winners_btn">
          to winners
        </button>
      </nav>`
        this.Garage = new Garage();
        this.Winners = new Winners();
        this.element.appendChild(this.Winners.element);
        this.element.appendChild(this.Garage.element);
        document.body.appendChild(this.element);
        this.handleButtons();
    }

    handleButtons() {
        const toGarageBtn = document.getElementById('garage_btn') as HTMLButtonElement
        const toWinnersBtn = document.getElementById('winners_btn') as HTMLButtonElement
        toGarageBtn.disabled = true;
        toWinnersBtn.addEventListener('click', ()=>{
            toGarageBtn.disabled = false;
            toWinnersBtn.disabled = true;
            this.Winners.handleWinners(store.sortOrder);
            this.Garage?.element.classList.add('hidden')
            this.Winners.element.classList.remove('hidden');
        }) 
        toGarageBtn.addEventListener('click', ()=>{
            toGarageBtn.disabled = true;
            toWinnersBtn.disabled = false;
            this.Garage?.element.classList.remove('hidden')
            this.Winners.element.classList.add('hidden')
        }) 
    }
}