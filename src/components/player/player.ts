import { BaseComponent } from "../base-component";
import { EndgamePopUp } from "../endgamePopUp/endgamePopUp";
import { Move } from "../move/move";
import './player.scss'

export class Player extends BaseComponent{

    constructor(playerName: string, color: string){
        super('div',['player_column']);
        this.renderPlayer(playerName, color);
    }

    renderPlayer(playerName: string, color: string) {
        let playerAvatar = playerName.split(' ')[0][0];
        if(playerName.split(' ')[1][0]!=undefined){
            playerAvatar +=playerName.split(' ')[1][0]
        }
        this.element.innerHTML = `
        <div class="player_column__avatar">${playerAvatar}</div>
        <div class="player_column__name">${playerName}</div>
        <div class="player_column__buttons">
        <button class="player_button__resign" id='resign_${color}'></button>
        <button class="player_button__draw" id='draw_${color}'>&half;</button>  
        </div>
        <div class="player_column__moves"></div>
        `
    }

    createMove(piece:string,startSquare:string,endSquare:string,time:string) {
        this.element.lastElementChild?.appendChild((new Move(piece,startSquare,endSquare,time)).element)
    }

    
}