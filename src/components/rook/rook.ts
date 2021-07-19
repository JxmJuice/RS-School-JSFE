import { Piece } from '../chessPiece/chessPiece';
import { xToLetter } from '../constants';

export class Rook extends Piece {
  currentSquare: HTMLElement | null;

  name: string;

  constructor(color: string, square: string) {
    super('rook', color);
    this.name = 'rook';
    if (this.pieceColor === 'white') {
      this.element.classList.add('rook_white');
    }
    if (this.pieceColor === 'black') {
      this.element.classList.add('rook_black');
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
    if (x) {
      for (let i = +x + 1; i < 9; i++) {
        const letter = xToLetter(`${i}`);
        if (
          document.getElementById(`${letter}${y}`)?.dataset.piece
          === this.pieceColor
        ) {
          break;
        }
        document.getElementById(`${letter}${y}`)?.classList.add('valid');
        if (
          document.getElementById(`${letter}${y}`)?.dataset.piece
            !== this.pieceColor
          && document.getElementById(`${letter}${y}`)?.dataset.piece !== ''
        ) {
          break;
        }
      }
      for (let i = +x - 1; i > 0; i--) {
        const letter = xToLetter(`${i}`);
        if (
          document.getElementById(`${letter}${y}`)?.dataset.piece
          === this.pieceColor
        ) {
          break;
        }
        document.getElementById(`${letter}${y}`)?.classList.add('valid');
        if (
          document.getElementById(`${letter}${y}`)?.dataset.piece
            !== this.pieceColor
          && document.getElementById(`${letter}${y}`)?.dataset.piece !== ''
        ) {
          break;
        }
      }
    }
    if (y) {
      for (let i = +y + 1; i < 9; i++) {
        const letter = xToLetter(`${x}`);
        if (
          document.getElementById(`${letter}${i}`)?.dataset.piece
          === this.pieceColor
        ) {
          break;
        }
        document.getElementById(`${letter}${i}`)?.classList.add('valid');
        if (
          document.getElementById(`${letter}${i}`)?.dataset.piece
            !== this.pieceColor
          && document.getElementById(`${letter}${i}`)?.dataset.piece !== ''
        ) {
          break;
        }
      }
      for (let i = +y - 1; i < 9; i--) {
        const letter = xToLetter(`${x}`);
        if (
          document.getElementById(`${letter}${i}`)?.dataset.piece
          === this.pieceColor
        ) {
          break;
        }
        document.getElementById(`${letter}${i}`)?.classList.add('valid');
        if (
          document.getElementById(`${letter}${i}`)?.dataset.piece
            !== this.pieceColor
          && document.getElementById(`${letter}${i}`)?.dataset.piece !== ''
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
    if (x) {
      for (let i = +x + 1; i < 9; i++) {
        const letter = xToLetter(`${i}`);
        document.getElementById(`${letter}${y}`)?.classList.add('attacked');
        if (
          document.getElementById(`${letter}${y}`)?.dataset.piece !== ''
          && !document
            .getElementById(`${letter}${y}`)
            ?.firstElementChild?.classList.contains(`king_${enemyColor}`)
        ) {
          break;
        }
      }
      for (let i = +x - 1; i > 0; i--) {
        const letter = xToLetter(`${i}`);
        document.getElementById(`${letter}${y}`)?.classList.add('attacked');
        if (
          document.getElementById(`${letter}${y}`)?.dataset.piece !== ''
          && !document
            .getElementById(`${letter}${y}`)
            ?.firstElementChild?.classList.contains(`king_${enemyColor}`)
        ) {
          break;
        }
      }
    }
    if (y) {
      for (let i = +y + 1; i < 9; i++) {
        const letter = xToLetter(`${x}`);
        document.getElementById(`${letter}${i}`)?.classList.add('attacked');
        if (
          document.getElementById(`${letter}${i}`)?.dataset.piece !== ''
          && !document
            .getElementById(`${letter}${i}`)
            ?.firstElementChild?.classList.contains(`king_${enemyColor}`)
        ) {
          break;
        }
      }
      for (let i = +y - 1; i < 9; i--) {
        const letter = xToLetter(`${x}`);
        document.getElementById(`${letter}${i}`)?.classList.add('attacked');
        if (
          document.getElementById(`${letter}${i}`)?.dataset.piece !== ''
          && !document
            .getElementById(`${letter}${i}`)
            ?.firstElementChild?.classList.contains(`king_${enemyColor}`)
        ) {
          break;
        }
      }
    }
  }
}
