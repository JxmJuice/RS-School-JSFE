import { PopUp } from '../../shared/popUp/popUp';
import './pregamePopUp.scss';

export class PregamePopUp extends PopUp {
  constructor() {
    super();
    this.element.firstElementChild?.classList.add('pregamePopUp');
    this.renderPopUp();
  }

  renderPopUp() {
    (this.element.firstElementChild as HTMLElement).innerHTML = `
        <div class='loader'>
        <div class='loader_body'>
            <div class="circle circle-1"></div>
            <div class="circle circle-2"></div>
            <div class="circle circle-3"></div>
            <div class="circle circle-4"></div>
            <div class="circle circle-5"></div></div>
        <div class='loader_text'>Waiting for the opponent</div>
        </div>
        <button class='to-lobby-online'>To Lobby</button>
        `;
  }
}
