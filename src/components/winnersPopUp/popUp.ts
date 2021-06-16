import { BaseComponent } from '../baseComponent';
import './popUp.scss';

export class PopUp extends BaseComponent {
  constructor(name:string,time:number) {
    super('div', ['popUp', 'popUp_delay']);
    const popUpBody = document.createElement('div');

    popUpBody.classList.add('popUp__body');
    popUpBody.innerHTML = `
    ${name} won the race in ${time/1000} seconds!
    `
    this.element.appendChild(popUpBody);
    this.element.addEventListener('click', (event) => this.closePopUp(event));
  }

  async closePopUp(event: Event, isButton = false) {
    if (isButton) {
      await this.removePopUp();
      return;
    }
    if ((<Element>event.target).closest('.popUp')) {
      await this.removePopUp();
    }
  }

  private removePopUp() {
    return new Promise(() => {
      this.element.remove();
    });
  }
}
