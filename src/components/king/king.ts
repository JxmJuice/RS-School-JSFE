import { Piece } from "../chessPiece/chessPiece";
import { xToLetter } from "../constants";

export class King extends Piece {
  currentSquare: HTMLElement | null;

  name: string;

  constructor(color: string, square: string) {
    super("king", color);
    this.name = 'king';
    if (this.pieceColor == "white") {
      this.element.classList.add("king_white");
    }
    if (this.pieceColor == "black") {
      this.element.classList.add("king_black");
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
      if (
        document.getElementById(`${xToLetter(+x + 1 + "")}${+y + 1}`)?.dataset
          .piece != this.pieceColor &&
        !document
          .getElementById(`${xToLetter(+x + 1 + "")}${+y + 1}`)
          ?.classList.contains("attacked")
      ) {
        document
          .getElementById(`${xToLetter(+x + 1 + "")}${+y + 1}`)
          ?.classList.add("valid");
      }
      if (
        document.getElementById(`${xToLetter(+x + 1 + "")}${+y - 1}`)?.dataset
          .piece != this.pieceColor &&
        !document
          .getElementById(`${xToLetter(+x + 1 + "")}${+y - 1}`)
          ?.classList.contains("attacked")
      ) {
        document
          .getElementById(`${xToLetter(+x + 1 + "")}${+y - 1}`)
          ?.classList.add("valid");
      }
      if (
        document.getElementById(`${xToLetter(+x + 1 + "")}${+y}`)?.dataset
          .piece != this.pieceColor &&
        !document
          .getElementById(`${xToLetter(+x + 1 + "")}${y}`)
          ?.classList.contains("attacked")
      ) {
        document
          .getElementById(`${xToLetter(+x + 1 + "")}${+y}`)
          ?.classList.add("valid");
      }
      if (
        document.getElementById(`${xToLetter(x)}${+y + 1}`)?.dataset.piece !=
          this.pieceColor &&
        !document
          .getElementById(`${xToLetter(x)}${+y + 1}`)
          ?.classList.contains("attacked")
      ) {
        document
          .getElementById(`${xToLetter(x)}${+y + 1}`)
          ?.classList.add("valid");
      }
      if (
        document.getElementById(`${xToLetter(x)}${+y - 1}`)?.dataset.piece !=
          this.pieceColor &&
        !document
          .getElementById(`${xToLetter(x)}${+y - 1}`)
          ?.classList.contains("attacked")
      ) {
        document
          .getElementById(`${xToLetter(x)}${+y - 1}`)
          ?.classList.add("valid");
      }
      if (
        document.getElementById(`${xToLetter(+x - 1 + "")}${+y + 1}`)?.dataset
          .piece != this.pieceColor &&
        !document
          .getElementById(`${xToLetter(+x - 1 + "")}${+y + 1}`)
          ?.classList.contains("attacked")
      ) {
        document
          .getElementById(`${xToLetter(+x - 1 + "")}${+y + 1}`)
          ?.classList.add("valid");
      }
      if (
        document.getElementById(`${xToLetter(+x - 1 + "")}${y}`)?.dataset
          .piece != this.pieceColor &&
        !document
          .getElementById(`${xToLetter(+x - 1 + "")}${y}`)
          ?.classList.contains("attacked")
      ) {
        document
          .getElementById(`${xToLetter(+x - 1 + "")}${y}`)
          ?.classList.add("valid");
      }
      if (
        document.getElementById(`${xToLetter(+x - 1 + "")}${+y - 1}`)?.dataset
          .piece != this.pieceColor &&
        !document
          .getElementById(`${xToLetter(+x - 1 + "")}${+y - 1}`)
          ?.classList.contains("attacked")
      ) {
        document
          .getElementById(`${xToLetter(+x - 1 + "")}${+y - 1}`)
          ?.classList.add("valid");
      }
    }
  }

  checkLegalMoves() {
    const square = this.element.parentElement;
    const x = square?.dataset.x;
    const y = square?.dataset.y;
    if (x && y) {
      document
        .getElementById(`${xToLetter(+x + 1 + "")}${+y + 1}`)
        ?.classList.add("attacked");

      document
        .getElementById(`${xToLetter(+x + 1 + "")}${+y - 1}`)
        ?.classList.add("attacked");

      document
        .getElementById(`${xToLetter(+x + 1 + "")}${+y}`)
        ?.classList.add("attacked");

      document
        .getElementById(`${xToLetter(x)}${+y + 1}`)
        ?.classList.add("attacked");

      document
        .getElementById(`${xToLetter(x)}${+y - 1}`)
        ?.classList.add("attacked");

      document
        .getElementById(`${xToLetter(+x - 1 + "")}${+y + 1}`)
        ?.classList.add("attacked");

      document
        .getElementById(`${xToLetter(+x - 1 + "")}${y}`)
        ?.classList.add("attacked");

      document
        .getElementById(`${xToLetter(+x - 1 + "")}${+y - 1}`)
        ?.classList.add("attacked");
    }
  }
}
