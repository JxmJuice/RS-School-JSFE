import './app.scss';
import { Game } from './components/game/game';
import { BaseComponent } from './components/base-component';
import { ImageCategory } from './models/imageCategoryModel';
import { Timer } from './components/timer/timer';
import { Header } from './components/header/header';
import { Router } from './components/router/Router';
import { AboutGame } from './components/about-game/about-game';
import { BestScore } from './components/bestscore/bestscore';

export class App extends BaseComponent {
  private game?: Game;

  private timer?: Timer;

  private header: Header;

  private router: Router;

  private images: string[] = [];

  private aboutGame?: AboutGame;

  private bestScore?: BestScore;

  constructor() {
    super('main', ['main']);
    this.header = new Header();
    document.body.appendChild(this.element);
    document.body.appendChild(this.header.element);
    this.aboutGame = new AboutGame();
    this.router = new Router({
      mode: 'hash',
      root: '/',
    });
    this.startApp();
    if (!window.location.hash) this.startAboutGame();
  }

  startApp() {
    this.router.add('//', () => this.startAboutGame());
    this.router.add('/BestScore/', () => this.startBestScore());
    // this.router.add('/GameSettings/', () => { });
    this.router.add('/Game/', () => this.startGame(0));
    this.router.checkAfterReloadPage();
  }

  private async startGame(num = 0) {
    this.element.innerHTML = '';
    this.timer = new Timer(this.element);
    this.game = new Game(this.element, this.timer);

    await this.GameCategory(num);
    document.body.appendChild(this.element);
    this.game.newGame(this.images);
  }

  private async GameCategory(num: number) {
    const res = await fetch('./images.json');
    const categories: ImageCategory[] = await res.json();
    const cat = categories[num];
    this.images = cat.images.map((name) => `${cat.category}/${name}`);
  }

  private startBestScore() {
    this.element.innerHTML = '';
    this.bestScore = new BestScore();
    this.bestScore.createPage();
  }

  private startAboutGame() {
    this.element.innerHTML = '';
    document.body.appendChild(this.element);
    if (this.aboutGame) this.aboutGame?.showPage(this.element);
  }
}
