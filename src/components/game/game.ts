import { Bishop } from "../bishop/bishop";
import { ChessBoard } from "../chessboard/chessboard";
import { Piece } from "../chessPiece/chessPiece";
import { xToLetter } from "../constants";
import { King } from "../king/king";
import { Knight } from "../knight/knight";
import { Pawn } from "../pawn/pawn";
import { Queen } from "../queen/queen";
import { Rook } from "../rook/rook";

export class Game {
  whitePieces: Array<Rook | Knight | Bishop | King | Queen | Pawn>;

  blackPieces: Array<Rook | Knight | Bishop | King | Queen | Pawn>;

  chessBoard: ChessBoard;

  isWhiteTurn: boolean;

  isCheck: boolean;

  constructor() {
    this.chessBoard = new ChessBoard();
    document.body.appendChild(this.chessBoard.element);
    this.whitePieces = [];
    this.blackPieces = [];
    this.whitePieces[0] = new Rook("white", "h1");
    this.blackPieces[0] = new Rook("black", "h8");
    this.whitePieces[1] = new Rook("white", "a1");
    this.blackPieces[1] = new Rook("black", "a8");
    this.blackPieces[2] = new Bishop("black", "c8");
    this.whitePieces[2] = new Bishop("white", "c1");
    this.blackPieces[3] = new Bishop("black", "f8");
    this.whitePieces[3] = new Bishop("white", "f1");
    this.whitePieces[4] = new Queen("white", "d1");
    this.blackPieces[4] = new Queen("black", "d8");
    this.whitePieces[5] = new Knight("white", "b1");
    this.blackPieces[5] = new Knight("black", "b8");
    this.whitePieces[6] = new Knight("white", "g1");
    this.blackPieces[6] = new Knight("black", "g8");
    for (let i = 7, k = 1; i < 15; i++, k++) {
      const letter = xToLetter(k + "");
      this.whitePieces[i] = new Pawn("white", `${letter}2`);
      this.blackPieces[i] = new Pawn("black", `${letter}7`);
    }
    this.whitePieces[15] = new King("white", "e1");
    this.blackPieces[15] = new King("black", "e8");
    this.isWhiteTurn = true;
    this.isCheck = false;
    this.handleTurn();
  }

  handleTurn() {
    if (this.isWhiteTurn == true) {
      // this.chessBoard.element.classList.remove("turned");
      this.validateWhiteTurn();
    }
    if (this.isWhiteTurn != true) {
      //this.chessBoard.element.classList.add("turned");
      this.validateBlackTurn();
    }
  }

  validateWhiteTurn() {
    if (this.isCheck == true) {
      this.handleCheck();
    } else {
      this.blackPieces.forEach((el) => {
        el.element.onmousedown = null;
        el.element.onmouseup = null;
      });
      this.whitePieces.forEach((piece) => {
        const initialPlace = piece.currentSquare;
        piece.element.onmousedown = () => {
          this.handleMouseDown(piece, event);
        };
        piece.element.onmouseup = () => {
          this.handleMouseUp(piece, initialPlace);
        };
      });
    }
  }

  validateBlackTurn() {
    if (this.isCheck == true) {
      this.handleCheck();
    } else {
      this.whitePieces.forEach((el) => {
        el.element.onmousedown = null;
        el.element.onmouseup = null;
      });
      this.blackPieces.forEach((piece) => {
        const initialPlace = piece.currentSquare;
        piece.element.onmousedown = () => {
          this.handleMouseDown(piece, event);
        };
        piece.element.onmouseup = () => {
          this.handleMouseUp(piece, initialPlace);
        };
      });
    }
  }

  handleMouseDown(
    piece: Rook | Pawn | Bishop | Knight | King | Queen,
    event: Event | undefined
  ) {
    piece.validateMove();
    document.querySelectorAll(".valid").forEach((el) => {
      if (this.isWhiteTurn == true) {
        document
          .querySelectorAll(".attacked")
          .forEach((elem) => elem.classList.remove("attacked"));
        let currentState;
        if (
          (el as HTMLElement).dataset.piece == "" ||
          (el as HTMLElement).dataset.piece == "black"
        ) {
          currentState = (el as HTMLElement).dataset.piece;
          console.log(currentState);
        }
        if ((el as HTMLElement).dataset.piece == "black" && (el as HTMLElement).classList.contains('checked')) {
          console.log(el.classList)
          return;
        }
        if( piece.element.parentElement){
        (el as HTMLElement).dataset.piece = "white";
        piece.element.parentElement.dataset.piece = '';
        this.blackPieces.forEach((piece) => {
          if(piece.element.parentElement == el){
            return;
          }
          piece.checkLegalMoves();
        });
        (el as HTMLElement).dataset.piece = currentState;
        piece.element.parentElement.dataset.piece = 'white';
      }
        if (
          this.whitePieces[15].element.parentElement?.classList.contains(
            "attacked"
          )
        ) {
          el.classList.remove("valid");
          console.log(el);
        }
      } else {
      }
    });
    piece.handleMove(event as MouseEvent);
  }

  handleMouseUp(
    piece: Rook | Pawn | Bishop | Knight | King | Queen,
    initialPlace: HTMLElement | null
  ) {
    setTimeout(() => {
      document.querySelectorAll(".valid").forEach((el) => {
        el.classList.remove("valid");
      });
      if (piece.currentSquare) piece.currentSquare.dataset.piece = "";
      piece.currentSquare = piece.element.parentElement;
      if (piece.currentSquare) {
        piece.currentSquare.dataset.piece = piece.pieceColor;
      }
      if (piece.currentSquare != initialPlace) {
        if (this.isWhiteTurn == true) {
          this.createCheck(piece);
          this.isWhiteTurn = false;
          this.handleTurn();
          return;
        }
        if (this.isWhiteTurn == false) {
          this.createCheck(piece);
          this.isWhiteTurn = true;
          this.handleTurn();
          return;
        }
      }
      this.handleTurn();
    }, 1);
  }

  createCheck(piece: Rook | Pawn | Bishop | Knight | King | Queen) {
    document
      .querySelectorAll(".attacked")
      .forEach((square) => square.classList.remove("attacked"));
    if (this.isWhiteTurn != true) {
      this.blackPieces.forEach((blackPiece) => {
        blackPiece.checkLegalMoves();
      });
      if (
        this.whitePieces[15].element.parentElement?.classList.contains(
          "attacked"
        )
      ) {
        this.whitePieces[15].element.parentElement?.classList.add("checked");
        piece.element.parentElement?.classList.add("checked");
        this.isCheck = true;
      }
    }

    if (this.isWhiteTurn == true) {
      this.whitePieces.forEach((whitePiece) => {
        whitePiece.checkLegalMoves();
      });
      if (
        this.blackPieces[15].element.parentElement?.classList.contains(
          "attacked"
        )
      ) {
        this.blackPieces[15].element.parentElement?.classList.add("checked");
        piece.element.parentElement?.classList.add("checked");
        this.isCheck = true;
      }
    }
  }

  handleCheck() {
    if (this.isWhiteTurn == true) {
      this.blackPieces.forEach((el) => {
        el.element.onmousedown = null;
        el.element.onmouseup = null;
      });
      this.whitePieces.forEach((piece) => {
          const initialPlace = piece.currentSquare;
          console.log(1)
          piece.element.onmousedown = () => {
            this.handleCheckMouseDown(piece, event);
          };
          piece.element.onmouseup = () => {
            this.handleCheckMouseUp(piece, initialPlace);
          };
      });
    } else if (this.isWhiteTurn == false) {
      this.whitePieces.forEach((el) => {
        el.element.onmousedown = null;
        el.element.onmouseup = null;
      });
      this.blackPieces.forEach((piece) => {
          const initialPlace = piece.currentSquare;
          piece.element.onmousedown = () => {
            this.handleCheckMouseDown(piece, event);
          };
          piece.element.onmouseup = () => {
            this.handleCheckMouseUp(piece, initialPlace);
          };
      });
    }
  }

  handleCheckMouseDown(
    piece: Rook | Pawn | Bishop | Knight | King | Queen,
    event: Event | undefined
  ) {
    piece.validateMove();
    if(piece.element.classList.contains('king_white')){
      piece.handleMove(event as MouseEvent);
      return;
    }
    if(piece.element.classList.contains('king_black')){
      piece.handleMove(event as MouseEvent);
      return;
    }
    document.querySelectorAll(".valid").forEach((el) => {
      if (this.isWhiteTurn == true) {
        document
          .querySelectorAll(".attacked")
          .forEach((elem) => elem.classList.remove("attacked"));
        let currentState;
        if (
          (el as HTMLElement).dataset.piece == "" ||
          (el as HTMLElement).dataset.piece == "black"
        ) {
          currentState = (el as HTMLElement).dataset.piece;
          console.log(currentState);
        }
        if ((el as HTMLElement).dataset.piece == "black" && (el as HTMLElement).classList.contains('checked')) {
          return;
        }
        (el as HTMLElement).dataset.piece = "white";
        this.blackPieces.forEach((piece) => {
          piece.checkLegalMoves();
        });
        (el as HTMLElement).dataset.piece = currentState;
        if (
          this.whitePieces[15].element.parentElement?.classList.contains(
            "attacked"
          )
        ) {
          el.classList.remove("valid");
          console.log(el);
        }
      } else {
      }
    });
    piece.handleMove(event as MouseEvent);
  }

  handleCheckMouseUp(
    piece: Rook | Pawn | Bishop | Knight | King | Queen,
    initialPlace: HTMLElement | null
  ) {
    setTimeout(() => {
      document.querySelectorAll(".square").forEach((el) => {
        el.classList.remove("valid");
        if (piece.currentSquare) piece.currentSquare.dataset.piece = "";
        piece.currentSquare = piece.element.parentElement;
        if (piece.currentSquare) {
          piece.currentSquare.dataset.piece = piece.pieceColor;
        }
      });
      if (piece.currentSquare != initialPlace) {
        if (this.isWhiteTurn == true) {
          document
            .querySelectorAll(".checked")
            .forEach((el) => el.classList.remove("checked"));
          this.isCheck = false;
          this.createCheck(piece);
          this.isWhiteTurn = false;
          this.handleTurn();
          return;
        }
        if (this.isWhiteTurn == false) {
          document
            .querySelectorAll(".checked")
            .forEach((el) => el.classList.remove("checked"));
          this.isCheck = false;
          this.createCheck(piece);
          this.isWhiteTurn = true;
          this.handleTurn();
          return;
        }
      }
      this.handleTurn();
    }, 1);
  }

  handleKing(piece: King) {}
}
