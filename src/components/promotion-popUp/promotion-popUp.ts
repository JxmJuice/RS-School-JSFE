import { PopUp } from '../../shared/popUp/popUp';
import './promotion-popUp.scss';

export class PromotionPopUp extends PopUp {
  constructor(color: string) {
    super();
    const body = this.element.querySelector('.pop-up_body');
    if (body) {
      body.innerHTML = `
        <button class = 'promote_queen__${color}' data-piece = 'queen'></button>
        <button class = 'promote_rook__${color}' data-piece = 'rook'></button>
        <button class = 'promote_knight__${color}' data-piece = 'knight'></button>
        <button class = 'promote_bishop__${color}' data-piece = 'bishop'></button>
        `;
    }
  }
}
