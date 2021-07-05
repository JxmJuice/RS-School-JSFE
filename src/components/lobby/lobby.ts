import { BaseComponent } from "../base-component";
import './lobby.scss'

export class Lobby extends BaseComponent {
  constructor() {
    super('div',['lobby']);
    this.renderLobby()
  }

  renderLobby() {
    this.element.innerHTML = `
      <div class="wrapper">
        <div class="player">
          <div class="player_avatar">P1</div>
          <div class="player_name">Player 1</div>
        </div>
        <div class="game-buttons">
          <button class="main_button">Play Online</button>
          <button class="main_button" id='friend'>Play With Friend</button>
          <button class="main_button">Play With Computer</button>
          <button class="main_button">Replays</button>
        </div>
        <div class="player">
          <div class="player_avatar">P2</div>
          <div class="player_name">Player 2</div>
        </div>
      </div>`;
  }
}
