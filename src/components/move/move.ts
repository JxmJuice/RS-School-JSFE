import { BaseComponent } from "../base-component";
import './move.scss'

export class Move extends BaseComponent {
    constructor(piece:string,startSquare:string,endSquare:string,time:string){
        super('div',['move']);
        this.renderMove(piece, startSquare,endSquare, time);
    }

    renderMove(piece:string,startSquare:string,endSquare:string,time:string){
        this.element.innerHTML = `
            <div class="move_piece">${piece}</div>
            <div class="move_squares">${startSquare}-${endSquare}</div>
            <div class="move_time">${time}</div>
        `
    }
}