import { BaseComponent } from '../base-component';
import './timer.scss';

export class Timer extends BaseComponent {
  private minutes = 0;

  private seconds = 0;

  private amountTick = 0;

  private runTimer = true;

  private timeOutFunc?: NodeJS.Timeout;

  constructor(elem: HTMLElement) {
    super('div', ['timer']);
    this.element.innerHTML = `
      <div class="timer__inner">00:00</div>
    `;
    elem.appendChild(this.element);
    this.runTimer = true;
    this.amountTick = 0;
  }

  startTimer() {
    if (this.runTimer) this.timeOutFunc = setInterval(() => this.updateValue(), 1000);
  }

  stopTimer(): number {
    this.runTimer = false;
    if (this.timeOutFunc) clearTimeout(this.timeOutFunc);
    if (this.element.firstElementChild) this.element.firstElementChild.textContent = '00:00';
    return this.amountTick;
  }

  private updateValue() {
    this.amountTick++;
    this.minutes = Math.floor(this.amountTick / 60);
    this.seconds = this.amountTick - this.minutes * 60;
    if (this.element.firstElementChild) {
      if (this.minutes < 10 && this.seconds < 10) this.element.firstElementChild.textContent = `0${this.minutes}:0${this.seconds}`;
      else if (this.minutes < 10) this.element.firstElementChild.textContent = `0${this.minutes}:${this.seconds}`;
      else if (this.seconds < 10) this.element.firstElementChild.textContent = `${this.minutes}:0${this.seconds}`;
      else this.element.firstElementChild.textContent = `${this.minutes}:${this.seconds}`;
    }
  }
}
