import './card.scss';
import { BaseComponent } from '../base-component';

export class Card extends BaseComponent {
  image: string;

  constructor(image: string) {
    super('div', ['card-container']);
    this.image = image;
    this.element.innerHTML = `
      <div class="card">
        <div class="card__front"></div>
        <div style="background-image: url('images/${image}')" class="card__back"><div class="card__state"></div></div>
      </div>
    `;
  }

  flipToBack() {
    return this.flip(true);
  }

  flipToTop() {
    return this.flip(false);
  }

  showWrong() {
    this.element.classList.add('wrong');
  }

  showRight() {
    this.element.classList.add('right');
  }

  showClear() {
    this.element.classList.remove('wrong');
    this.element.classList.remove('right');
  }

  private flip(isFront = false): Promise<void> {
    return new Promise((resolve) => {
      this.element.classList.toggle('flipped', !isFront);
      this.element.addEventListener('transitionend', () => resolve(), {
        once: true,
      });
    });
  }
}
