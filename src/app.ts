import { BaseComponent } from "./components/baseComponent";
import { Garage } from "./components/garage/garage";

export class App extends BaseComponent{

    private Garage?: Garage;

    constructor(){
        super('main',['main']);
        this.Garage = new Garage();
        this.element.appendChild(this.Garage.element);
        document.body.appendChild(this.element);
    }
}