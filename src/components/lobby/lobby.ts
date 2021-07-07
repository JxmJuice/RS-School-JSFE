import { BaseComponent } from "../base-component";
import { storage } from "../storage/storage";
import "./lobby.scss";

export class Lobby extends BaseComponent {
  constructor() {
    super("div", ["lobby"]);
    this.renderLobby();
  }

  renderLobby() {
    console.log(1);
    let player1Avatar = storage.player1Name[0];
    console.log(storage.player1Name.split(" ")[1]);
    if (
      storage.player1Name.split(" ")[1] != undefined &&
      storage.player1Name.split(" ")[1] != ""
    ) {
      player1Avatar += storage.player1Name.split(" ")[1][0];
    }
    let player2Avatar = storage.player2Name[0];
    if (
      storage.player2Name.split(" ")[1] != undefined &&
      storage.player2Name.split(" ")[1] != ""
    ) {
      player2Avatar += storage.player2Name.split(" ")[1][0];
    }
    if (player1Avatar == undefined) player1Avatar = "";
    if (player2Avatar == undefined) player2Avatar = "";
    this.element.innerHTML = `
      <div class="wrapper">
        <div class="player">
          <div class="player_avatar">${player1Avatar}</div>
          <input type='text' class="player_name" id='player1_name' value='${storage.player1Name}'></input>
        </div>
        <div class="game-buttons">
          <button class="main_button" disabled>Play Online</button>
          <button class="main_button" id='friend'>Play With Friend</button>
          <button class="main_button" disabled>Play With Computer</button>
          <button class="main_button" disabled>Replays</button>
        </div>
        <div class="player">
          <div class="player_avatar">${player2Avatar}</div>
          <input type='text' class="player_name" id='player2_name' value='${storage.player2Name}'></input>
        </div>
      </div>`;
    this.element
      .querySelector("#player1_name")
      ?.addEventListener("input", () => {
        storage.player1Name = (
          this.element.querySelector("#player1_name") as HTMLInputElement
        ).value;
      });
    this.element
      .querySelector("#player2_name")
      ?.addEventListener("input", () => {
        storage.player2Name = (
          this.element.querySelector("#player2_name") as HTMLInputElement
        ).value;
      });
  }
}
