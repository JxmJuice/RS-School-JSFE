import { CardsField } from '../cards-field/cards-field';
import { Card } from '../card/card';
import { delay } from '../../shared/delay';
import { Timer } from '../timer/timer';
import { PopUpEndGame } from '../popUp-end-game/popUpEndGame';
import { Score } from '../../models/scoreModel';
import database from '../../shared/database';

const FLIP_DELAY = 500;
const TIME_OUT = 7000;

export class Game {
  private cardsField: CardsField;

  private activeCard?: Card;

  private isAnimation = false;

  private timer: Timer;

  private matches = 0;

  private totalMatches = 0;

  private amountCard = 4;

  private rootElement: HTMLElement;

  constructor(element: HTMLElement, timer: Timer, amountCard = 4) {
    this.cardsField = new CardsField();
    this.timer = timer;
    element.appendChild(this.cardsField.element);
    this.rootElement = element;
  }

  async newGame(images: string[]) {
    this.cardsField.clear();

    const validAmountImages = images
      .sort(() => Math.random() - 0.5)
      .slice(0, this.amountCard * 2);

    const cards: Card[] = validAmountImages
      .concat(validAmountImages)
      .map((url) => new Card(url))
      .sort(() => Math.random() - 0.5);

    cards.forEach((card) => {
      card.element.addEventListener('click', () => {
        this.cardHandler(card);
      });
    });

    this.cardsField.addCards(cards);
    setTimeout(() => this.timer.startTimer(), TIME_OUT);
  }

  endGame() {
    const time: number = this.timer.stopTimer();
    const score: number = (this.matches - (this.matches - this.totalMatches)) * 100 - time * 10;

    const gameResult: Score = {
      time: time || 1,
      score,
    };
    const popUpEnd = new PopUpEndGame(gameResult);
    if (database.user) {
      console.log(database.user);
      database.user.score = gameResult.score;
      database.updateInfo(database.user);
    }
    popUpEnd.showPopUp();
  }

  private async cardHandler(card: Card) {
    this.matches++;
    if (this.isAnimation) return;

    this.isAnimation = true;
    await card.flipToTop();
    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }

    if (this.activeCard.image !== card.image) {
      await delay(FLIP_DELAY / 5);
      this.activeCard.showWrong();
      card.showWrong();
      await delay(FLIP_DELAY / 2);
      await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);
      this.activeCard.showClear();
      card.showClear();
    } else {
      this.totalMatches++;
      await delay(FLIP_DELAY / 5);
      this.activeCard.showRight();
      card.showRight();
      await delay(FLIP_DELAY / 2);
      this.activeCard.showClear();
      card.showClear();
      if (this.totalMatches === this.amountCard * 2) {
        this.endGame();
      }
    }
    this.activeCard = undefined;
    this.isAnimation = false;
  }
}
