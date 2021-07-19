import { Piece } from '../chessPiece/chessPiece';
import { xToLetter } from '../constants';

export class Pawn extends Piece {
  currentSquare: HTMLElement | null;

  name: string;

  constructor(color: string, square: string) {
    super('pawn', color);
    this.name = 'pawn';
    if (this.pieceColor === 'white') {
      this.element.classList.add('pawn_white');
    }
    if (this.pieceColor === 'black') {
      this.element.classList.add('pawn_black');
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
      if (this.pieceColor === 'white') {
        if (y === '2') {
          if (
            document.getElementById(`${xToLetter(x)}${+y + 2}`)?.dataset
              .piece === ''
          ) {
            document
              .getElementById(`${xToLetter(x)}${+y + 2}`)
              ?.classList.add('valid');
          }
        }
        if (
          document.getElementById(`${xToLetter(x)}${+y + 1}`)?.dataset.piece
          === ''
        ) {
          document
            .getElementById(`${xToLetter(x)}${+y + 1}`)
            ?.classList.add('valid');
        }
        if (
          document.getElementById(`${xToLetter(`${+x + 1}`)}${+y + 1}`)?.dataset
            .piece !== ''
          && document.getElementById(`${xToLetter(`${+x + 1}`)}${+y + 1}`)?.dataset
            .piece !== this.pieceColor
        ) {
          document
            .getElementById(`${xToLetter(`${+x + 1}`)}${+y + 1}`)
            ?.classList.add('valid');
        }
        if (
          document.getElementById(`${xToLetter(`${+x - 1}`)}${+y + 1}`)?.dataset
            .piece !== ''
          && document.getElementById(`${xToLetter(`${+x - 1}`)}${+y + 1}`)?.dataset
            .piece !== this.pieceColor
        ) {
          document
            .getElementById(`${xToLetter(`${+x - 1}`)}${+y + 1}`)
            ?.classList.add('valid');
        }
      }
      if (this.pieceColor === 'black') {
        if (y === '7') {
          if (
            document.getElementById(`${xToLetter(x)}${+y - 2}`)?.dataset
              .piece === ''
          ) {
            document
              .getElementById(`${xToLetter(x)}${+y - 2}`)
              ?.classList.add('valid');
          }
        }
        if (
          document.getElementById(`${xToLetter(x)}${+y - 1}`)?.dataset.piece
          === ''
        ) {
          document
            .getElementById(`${xToLetter(x)}${+y - 1}`)
            ?.classList.add('valid');
        }
        if (
          document.getElementById(`${xToLetter(`${+x + 1}`)}${+y - 1}`)?.dataset
            .piece !== ''
          && document.getElementById(`${xToLetter(`${+x + 1}`)}${+y - 1}`)?.dataset
            .piece !== this.pieceColor
        ) {
          document
            .getElementById(`${xToLetter(`${+x + 1}`)}${+y - 1}`)
            ?.classList.add('valid');
        }
        if (
          document.getElementById(`${xToLetter(`${+x - 1}`)}${+y - 1}`)?.dataset
            .piece !== ''
          && document.getElementById(`${xToLetter(`${+x - 1}`)}${+y - 1}`)?.dataset
            .piece !== this.pieceColor
        ) {
          document
            .getElementById(`${xToLetter(`${+x - 1}`)}${+y - 1}`)
            ?.classList.add('valid');
        }
      }
    }
  }

  checkLegalMoves() {
    const square = this.element.parentElement;
    const x = square?.dataset.x;
    const y = square?.dataset.y;
    if (x && y) {
      if (this.pieceColor === 'white') {
        document
          .getElementById(`${xToLetter(`${+x + 1}`)}${+y + 1}`)
          ?.classList.add('attacked');
        document
          .getElementById(`${xToLetter(`${+x - 1}`)}${+y + 1}`)
          ?.classList.add('attacked');
      }
      if (this.pieceColor === 'black') {
        document
          .getElementById(`${xToLetter(`${+x + 1}`)}${+y - 1}`)
          ?.classList.add('attacked');

        document
          .getElementById(`${xToLetter(`${+x - 1}`)}${+y - 1}`)
          ?.classList.add('attacked');
      }
    }
  }
}
