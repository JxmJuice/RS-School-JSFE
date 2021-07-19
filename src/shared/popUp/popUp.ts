import { BaseComponent } from '../../components/base-component';
import './popUp.scss';

export class PopUp extends BaseComponent {
  constructor() {
    super('div', ['pop-up']);
    const popUpBody = document.createElement('div');
    popUpBody.classList.add('pop-up_body');
    this.element.appendChild(popUpBody);
  }

  public removePopUp() {
    this.element.remove();
  }
}
