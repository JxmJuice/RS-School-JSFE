import { BaseComponent } from '../../components/base-component';
import './popUp.scss';

export class PopUp extends BaseComponent {
  constructor() {
    super('div', ['popUp', 'popUp_delay']);
    const popUpBody = document.createElement('div');
    popUpBody.classList.add('popUp__body');
    this.element.appendChild(popUpBody);
    this.element.addEventListener('mousedown', (event) => this.closePopUp(event));
  }

  async closePopUp(event: Event, isButton = false) {
    if (isButton) {
      await this.removePopUp();
      this.element.remove();
      return;
    }
    if (!(<Element>event.target).closest('.popUp__body')) {
      await this.removePopUp();
    }
  }

  private removePopUp() {
    return new Promise((res) => {
      this.element.removeEventListener('click', (event) => this.closePopUp(event));
      document.querySelector('.popUp')?.classList.add('popUp_delay');
      document.querySelector('.popUp')?.addEventListener('transitionend', res);
    });
  }
}
