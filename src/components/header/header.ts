import { BaseComponent } from '../base-component';
import './header.scss';

export class Header extends BaseComponent {
  constructor() {
    super('header', ['header']);
    this.renderHeader();
  }

  renderHeader() {
    this.element.innerHTML = `
        <div class="header_wrapper">
        <div class="header_logo">
          <img src="./images/logo.svg" class="header_logo__image" />
          <div class="header_logo__text">Chess</div>
        </div>
      <span class="page-name">Lobby</span>
    </div>`;
  }
}
