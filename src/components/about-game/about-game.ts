import { BaseComponent } from '../base-component';
import './about-game.scss';

export class AboutGame extends BaseComponent {
  constructor() {
    super('section', ['about-game']);
    this.element.innerHTML = `
    <h3 class="about-game__title">About Game</h3>
    <div class="about-game__columns">
    <div class="about-game__column_1">
        <div class="about-game__block_1">
        <div class="about-game__inner">
          <div class="about-game__number">1</div>
          <p class="about-game__text">Register new player in game</p>
        </div>
      </div>
      
      <div class="about-game__block_2">
        <div class="about-game__inner">
          <div class="about-game__number">2</div>
          <p class="about-game__text">Configure your game settings</p>
        </div>
      </div>



      <div class="about-game__block_3">
        <div class="about-game__inner">
          <div class="about-game__number">3</div>
          <p class="about-game__text">Start you new game! Remember card positions and match it before times up.</p>
        </div>
      </div>
      </div> 
      <div class="about-game__column_2">
      <div class="about-game__image_1"></div>
      <div class="about-game__image_2"></div>
      <div class="about-game__image_3"></div>
      </div>
      </div>
    `;
  }

  showPage(element: HTMLElement) {
    element.insertAdjacentElement('afterbegin', this.element);
  }
}
