import { PopUp } from '../../shared/popUp/popUp';
import './endgamePopUp.scss';

export class EndgamePopUp extends PopUp {
  constructor(result: string) {
    super();
    this.element.firstElementChild?.classList.add('endgamePopUp');
    this.renderPopUp(result);
  }

  renderPopUp(result: string) {
    (this.element.firstElementChild as HTMLElement).innerHTML = `
        <span class='game_result'>${result}</span>
        <button class='to-lobby'>To Lobby</button>
        `;
  }
}
