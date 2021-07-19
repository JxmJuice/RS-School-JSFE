import { Piece } from '../chessPiece/chessPiece';
import { xToLetter } from '../constants';

export class Bishop extends Piece {
  currentSquare: HTMLElement | null;

  name:string;

  constructor(color: string, square: string) {
    super('bishop', color);
    this.name = 'bishop';
    if (this.pieceColor === 'white') {
      this.element.classList.add('bishop_white');
    }
    if (this.pieceColor === 'black') {
      this.element.classList.add('bishop_black');
    }
    this.currentSquare = document.getElementById(square);
    this.currentSquare?.appendChild(this.element);
    if (this.currentSquare) {
      this.currentSquare.dataset.piece = this.pieceColor;
    }
  }

  validateMove() {
    const square = this.element.parentElement;
    const x = square?.dataset.x;
    const y = square?.dataset.y;
    if (x && y) {
      for (let i = +x - 1, j = +y + 1; i > 0; i--, j++) {
        const letter = xToLetter(`${i}`);
        if (
          document.getElementById(`${letter}${j}`)?.dataset.piece
          === this.pieceColor
        ) {
          break;
        }
        document.getElementById(`${letter}${j}`)?.classList.add('valid');
        if (
          document.getElementById(`${letter}${j}`)?.dataset.piece
            !== this.pieceColor
          && document.getElementById(`${letter}${j}`)?.dataset.piece !== ''
        ) {
          break;
        }
      }
      for (let i = +x + 1, j = +y - 1; i < 9; i++, j--) {
        const letter = xToLetter(`${i}`);
        if (
          document.getElementById(`${letter}${j}`)?.dataset.piece
          === this.pieceColor
        ) {
          break;
        }
        document.getElementById(`${letter}${j}`)?.classList.add('valid');
        if (
          document.getElementById(`${letter}${j}`)?.dataset.piece
            !== this.pieceColor
          && document.getElementById(`${letter}${j}`)?.dataset.piece !== ''
        ) {
          break;
        }
      }
    }

    if (y && x) {
      for (let i = +x + 1, j = +y + 1; i < 9; i++, j++) {
        const letter = xToLetter(`${i}`);
        if (
          document.getElementById(`${letter}${j}`)?.dataset.piece
          === this.pieceColor
        ) {
          break;
        }
        document.getElementById(`${letter}${j}`)?.classList.add('valid');
        if (
          document.getElementById(`${letter}${j}`)?.dataset.piece
            !== this.pieceColor
          && document.getElementById(`${letter}${j}`)?.dataset.piece !== ''
        ) {
          break;
        }
      }
      for (let i = +x - 1, j = +y - 1; i < 9; i--, j--) {
        const letter = xToLetter(`${i}`);
        if (
          document.getElementById(`${letter}${j}`)?.dataset.piece
          === this.pieceColor
        ) {
          break;
        }
        document.getElementById(`${letter}${j}`)?.classList.add('valid');
        if (
          document.getElementById(`${letter}${j}`)?.dataset.piece
            !== this.pieceColor
          && document.getElementById(`${letter}${j}`)?.dataset.piece !== ''
        ) {
          break;
        }
      }
    }
  }

  checkLegalMoves() {
    let enemyColor;
    if (this.pieceColor === 'white') {
      enemyColor = 'black';
    } else {
      enemyColor = 'white';
    }
    const square = this.element.parentElement;
    const x = square?.dataset.x;
    const y = square?.dataset.y;
    if (x && y) {
      for (let i = +x - 1, j = +y + 1; i > 0; i--, j++) {
        const letter = xToLetter(`${i}`);
        document.getElementById(`${letter}${j}`)?.classList.add('attacked');
        if (
          document.getElementById(`${letter}${j}`)?.dataset.piece !== ''
          && !document
            .getElementById(`${letter}${j}`)
            ?.firstElementChild?.classList.contains(`king_${enemyColor}`)
        ) {
          break;
        }
      }
      for (let i = +x + 1, j = +y - 1; i < 9; i++, j--) {
        const letter = xToLetter(`${i}`);
        document.getElementById(`${letter}${j}`)?.classList.add('attacked');
        if (
          document.getElementById(`${letter}${j}`)?.dataset.piece !== ''
          && !document
            .getElementById(`${letter}${j}`)
            ?.firstElementChild?.classList.contains(`king_${enemyColor}`)
        ) {
          break;
        }
      }
    }

    if (y && x) {
      for (let i = +x + 1, j = +y + 1; i < 9; i++, j++) {
        const letter = xToLetter(`${i}`);
        document.getElementById(`${letter}${j}`)?.classList.add('attacked');
        if (
          document.getElementById(`${letter}${j}`)?.dataset.piece !== ''
          && !document
            .getElementById(`${letter}${j}`)
            ?.firstElementChild?.classList.contains(`king_${enemyColor}`)
        ) {
          break;
        }
      }
      for (let i = +x - 1, j = +y - 1; i < 9; i--, j--) {
        const letter = xToLetter(`${i}`);
        document.getElementById(`${letter}${j}`)?.classList.add('attacked');
        if (
          document.getElementById(`${letter}${j}`)?.dataset.piece !== ''
          && !document
            .getElementById(`${letter}${j}`)
            ?.firstElementChild?.classList.contains(`king_${enemyColor}`)
        ) {
          break;
        }
      }
    }
  }
}
