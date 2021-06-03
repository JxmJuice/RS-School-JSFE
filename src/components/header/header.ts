import { BaseComponent } from '../base-component';
import { PopUpRegister } from '../popUp-register/popUpRegister';
import './header.scss';

export class Header extends BaseComponent {
  private popUpRegister: PopUpRegister;

  private isLogin = false;

  constructor() {
    super('header', ['header']);
    this.createHeader();
    this.popUpRegister = new PopUpRegister(this);
    if (this.isLogin) {
      this.HeaderLogin();
    }
    if (window.location.hash === '#Game') {
      window.location.hash = '';
    }
  }

  createHeader() {
    this.element.innerHTML = `
    <div class="header__wrapper">
    <div class="header__logo"></div>
    <nav class="header__nav">
      <ul>
        <li class="header__link nav__link_active" id="aboutGame"><a href="#">About Game</a></li>
        <li class="header__link" id="bestScore"><a href="#BestScore">Best Score</a></li>
        <li class="header__link" id="GameSettings"><a href="#GameSettings">Game Settings</a></li>
      </ul>
    </nav>
    <div class="header__state"> 
      <div class="header__state_logOut">register new player</div>
    </div>
  </div>
  `;
    this.element
      .querySelector('.header__state_logOut')
      ?.addEventListener('click', () => this.openPopUpRegister());
  }

  HeaderLogin(avatar = '') {
    const headerState: HTMLElement | null = this.element.querySelector('.header__state');
    if (headerState) {
      headerState.innerHTML = `
      <div class="header__state_start"><a href="#Game">Start game</a></div>
      <div class="header__state_avatar" style="background-image: url(${avatar || './avatar-register.png'})"></div>
      `;
      headerState.classList.toggle('header__state_logIn');
      this.isLogin = true;
    }
  }

  private openPopUpRegister() {
    this.popUpRegister.showPopUp(this.element);
  }

  HeaderLogOut() {
    const headerState: HTMLElement | null = document.querySelector('.header__state');
    if (headerState) {
      headerState.innerHTML = `
      <div class="header__state_logOut">register new player</div>
      `;
      headerState.classList.toggle('header__state_logIn');
      this.element
        .querySelector('.header__state_logOut')
        ?.addEventListener('click', () => this.openPopUpRegister());
      this.isLogin = false;
    }
  }
}
