import { Score } from '../../models/scoreModel';
import { PopUp } from '../../shared/popUp/popUp';
import './popUpEndGame.scss';

export class PopUpEndGame extends PopUp {
  private gameResult: Score;

  constructor(gameResult: Score) {
    super();
    this.gameResult = gameResult;
    const minutes: number = Math.floor(gameResult.time / 60);
    const seconds: number = gameResult.time - minutes * 60;
    if (this.element.firstElementChild) {
      this.element.firstElementChild.innerHTML = `
        <div class="end-game__popUp__wrapper">
          <p>Congrats! You found all matches on ${minutes}:${seconds}</p>
          <p>Your score: ${gameResult.score}</p>
          <div class="popUp__ok">OK</div>
        </div>
    `;
    }
  }

  showPopUp() {
    setTimeout(() => this.element.classList.remove('popUp_delay'), 0);
    document.body.appendChild(this.element);
    document.querySelector('.popUp__ok')?.addEventListener('click', (event) => {
      this.closePopUp(event, true);
      window.location.hash = '#BestScore';
    });
  }
}
