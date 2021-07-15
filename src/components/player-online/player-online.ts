import { BaseComponent } from "../base-component";
import { EndgamePopUp } from "../endgamePopUp/endgamePopUp";
import { Move } from "../move/move";
import "./player-online.scss";

export class OnlinePlayer extends BaseComponent {
  constructor(playerName: string, isEnemy = false) {
    super("div", ["player_column"]);
    this.renderPlayer(playerName, isEnemy);
  }

  renderPlayer(playerName: string, isEnemy: boolean) {
    if (isEnemy === true) {
        this.element.innerHTML = `
        <div class="player_column__avatar"></div>
        <div class="player_column__name"></div>
        <div class="player_column__buttons">
        <button class="player_button__resign" disabled></button>
        <button class="player_button__draw" disabled>&half;</button>  
        </div>
        <div class="player_column__moves"></div>
        `;
    }
    let playerAvatar;
    if (playerName != "") {
      playerAvatar = playerName.split(" ")[0][0];
      if (playerName.split(" ")[1][0] != undefined) {
        playerAvatar += playerName.split(" ")[1][0];
      }
    } else {
      playerAvatar = "P2";
    }
    this.element.innerHTML = `
        <div class="player_column__avatar">${playerAvatar}</div>
        <div class="player_column__name">${playerName}</div>
        <div class="player_column__buttons">
        <button class="player_button__resign" id='resign_button'></button>
        <button class="player_button__draw" id='draw_button'>&half;</button>  
        </div>
        <div class="player_column__moves"></div>
        `;
  }

  createMove(
    piece: string,
    startSquare: string,
    endSquare: string,
    time: string
  ) {
    this.element.lastElementChild?.appendChild(
      new Move(piece, startSquare, endSquare, time).element
    );
  }
}
