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

  whiteKSideCastlingEnabled: boolean;
  whiteQSideCastlingEnabled: boolean;
  blackKSideCastlingEnabled: boolean;
  blackQSideCastlingEnabled: boolean;

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
    this.whiteKSideCastlingEnabled = true;
    this.whiteQSideCastlingEnabled = true;
    this.blackKSideCastlingEnabled = true;
    this.blackQSideCastlingEnabled = true;

    this.handleTurn();
  }

  handleTurn() {
    if (this.isWhiteTurn == true) {
      this.chessBoard.element.classList.remove("turned");
      this.validateWhiteTurn();
    }
    if (this.isWhiteTurn != true) {
      this.chessBoard.element.classList.add("turned");
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
        if (
          (el as HTMLElement).dataset.piece == "black" &&
          (el as HTMLElement).classList.contains("checked")
        ) {
          console.log(el.classList);
          return;
        }
        if (piece.element.parentElement) {
          (el as HTMLElement).dataset.piece = "white";
          piece.element.parentElement.dataset.piece = "";
          this.blackPieces.forEach((piece) => {
            if (piece.element.parentElement == el) {
              return;
            }
            piece.checkLegalMoves();
          });
          (el as HTMLElement).dataset.piece = currentState;
          piece.element.parentElement.dataset.piece = "white";
        }
        if (
          this.whitePieces[15].element.parentElement?.classList.contains(
            "attacked"
          )
        ) {
          el.classList.remove("valid");
          console.log(el);
        }
        if (piece.element.classList.contains("king_white")) {
          if (this.whiteKSideCastlingEnabled == true)
            this.handleKingSideCastling(piece);
          if (this.whiteQSideCastlingEnabled == true)
            this.handleQueenSideCastling(piece);
        }
      } else {
        document
          .querySelectorAll(".attacked")
          .forEach((elem) => elem.classList.remove("attacked"));
        let currentState;
        if (
          (el as HTMLElement).dataset.piece == "" ||
          (el as HTMLElement).dataset.piece == "white"
        ) {
          currentState = (el as HTMLElement).dataset.piece;
          console.log(currentState);
        }
        if (
          (el as HTMLElement).dataset.piece == "white" &&
          (el as HTMLElement).classList.contains("checked")
        ) {
          console.log(el.classList);
          return;
        }
        if (piece.element.parentElement) {
          (el as HTMLElement).dataset.piece = "black";
          piece.element.parentElement.dataset.piece = "";
          this.whitePieces.forEach((piece) => {
            if (piece.element.parentElement == el) {
              return;
            }
            piece.checkLegalMoves();
          });
          (el as HTMLElement).dataset.piece = currentState;
          piece.element.parentElement.dataset.piece = "black";
        }
        if (
          this.blackPieces[15].element.parentElement?.classList.contains(
            "attacked"
          )
        ) {
          el.classList.remove("valid");
          console.log(el);
        }
        if (piece.element.classList.contains("king_black")) {
          if (this.blackKSideCastlingEnabled == true)
            this.handleKingSideCastling(piece);
          if (this.blackQSideCastlingEnabled == true)
            this.handleQueenSideCastling(piece);
        }
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
          if (piece.element.classList.contains("king_white")) {
            console.log(piece);
            if (piece.currentSquare == document.querySelector("#g1")) {
              console.log(piece.currentSquare);
              document.querySelector("#h1")?.firstElementChild?.remove();
              this.whitePieces[0] = new Rook("white", "f1");
            }
            if (piece.currentSquare == document.querySelector("#c1")) {
              console.log(piece.currentSquare);
              document.querySelector("#a1")?.firstElementChild?.remove();
              this.whitePieces[1] = new Rook("white", "d1");
            }
            this.whiteQSideCastlingEnabled = false;
            this.whiteKSideCastlingEnabled = false;
          }
          if (piece.element.classList.contains("rook_white")) {
            if (initialPlace?.id == "h1") {
              this.whiteKSideCastlingEnabled = false;
            }
            if (initialPlace?.id == "a1") {
              this.whiteQSideCastlingEnabled = false;
            }
          }
          this.createCheck();
          this.isWhiteTurn = false;
          this.handleTurn();
          return;
        }
        if (this.isWhiteTurn == false) {
          if (piece.element.classList.contains("king_black")) {
            console.log(piece);
            if (piece.currentSquare == document.querySelector("#g8")) {
              console.log(piece.currentSquare);
              document.querySelector("#h8")?.firstElementChild?.remove();
              this.blackPieces[0] = new Rook("black", "f8");
            }
            if (piece.currentSquare == document.querySelector("#c8")) {
              console.log(piece.currentSquare);
              document.querySelector("#a8")?.firstElementChild?.remove();
              this.blackPieces[1] = new Rook("black", "d8");
            }
            this.blackQSideCastlingEnabled = false;
            this.blackKSideCastlingEnabled = false;
          }
          if (piece.element.classList.contains("rook_black")) {
            if (initialPlace?.id == "h8") {
              this.blackKSideCastlingEnabled = false;
            }
            if (initialPlace?.id == "a8") {
              this.blackQSideCastlingEnabled = false;
            }
          }
          this.createCheck();
          this.isWhiteTurn = true;
          this.handleTurn();
          return;
        }
      }
      this.handleTurn();
    }, 1);
  }

  createCheck() {
    if (this.isWhiteTurn != true) {
      for(let blackPiece of this.blackPieces) {
        document
        .querySelectorAll(".attacked")
        .forEach((square) => square.classList.remove("attacked"));
        blackPiece.checkLegalMoves();
        if (
          this.whitePieces[15].element.parentElement?.classList.contains(
            "attacked"
          )
        ) {
          this.whitePieces[15].element.parentElement?.classList.add("checked");
          blackPiece.element.parentElement?.classList.add("checked");
          this.isCheck = true;
        }
      }
    }

    if (this.isWhiteTurn == true) {
      for(let whitePiece of this.whitePieces) {
        document
        .querySelectorAll(".attacked")
        .forEach((square) => square.classList.remove("attacked"));
        whitePiece.checkLegalMoves();
        if (
          this.blackPieces[15].element.parentElement?.classList.contains(
            "attacked"
          )
        ) {
          this.blackPieces[15].element.parentElement?.classList.add("checked");
          whitePiece.element.parentElement?.classList.add("checked");
          this.isCheck = true;
        }
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
        console.log(1);
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
    if(this.isWhiteTurn == true ) {
      this.blackPieces.forEach(el=>{
        el.checkLegalMoves()
      })
    }
    if(this.isWhiteTurn == false) {
      this.whitePieces.forEach(el=>{
        el.checkLegalMoves()
      })
    }
    piece.validateMove();
    if (piece.element.classList.contains("king_white")) {
      piece.handleMove(event as MouseEvent);
      return;
    }
    if (piece.element.classList.contains("king_black")) {
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
        if (
          (el as HTMLElement).dataset.piece == "black" &&
          (el as HTMLElement).classList.contains("checked") &&
          document.querySelectorAll('.checked').length < 3
        ) {
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
        document
          .querySelectorAll(".attacked")
          .forEach((elem) => elem.classList.remove("attacked"));
        let currentState;
        if (
          (el as HTMLElement).dataset.piece == "" ||
          (el as HTMLElement).dataset.piece == "white"
        ) {
          currentState = (el as HTMLElement).dataset.piece;
          console.log(currentState);
        }
        if (
          (el as HTMLElement).dataset.piece == "white" &&
          (el as HTMLElement).classList.contains("checked") &&
          document.querySelectorAll('.checked').length < 3
        ) {
          return;
        }
        (el as HTMLElement).dataset.piece = "black";
        this.whitePieces.forEach((piece) => {
          piece.checkLegalMoves();
        });
        (el as HTMLElement).dataset.piece = currentState;
        if (
          this.blackPieces[15].element.parentElement?.classList.contains(
            "attacked"
          )
        ) {
          el.classList.remove("valid");
          console.log(el);
        }
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
          this.createCheck();
          this.isWhiteTurn = false;
          this.handleTurn();
          return;
        }
        if (this.isWhiteTurn == false) {
          document
            .querySelectorAll(".checked")
            .forEach((el) => el.classList.remove("checked"));
          this.isCheck = false;
          this.createCheck();
          this.isWhiteTurn = true;
          this.handleTurn();
          return;
        }
      }
      this.handleTurn();
    }, 1);
  }

  handleKingSideCastling(piece: King) {
    if (this.isWhiteTurn == true) {
      const f1 = document.querySelector("#f1");
      const g1 = document.querySelector("#g1");
      if (
        (g1 as HTMLElement).dataset.piece == "" &&
        (f1 as HTMLElement).dataset.piece == "" &&
        this.whiteKSideCastlingEnabled == true
      ) {
        document.querySelectorAll(".attacked").forEach((el) => {
          el.classList.remove("attacked");
        });
        this.blackPieces.forEach((el) => el.checkLegalMoves());
        if (
          g1?.classList.contains("attacked") ||
          f1?.classList.contains("attacked")
        ) {
          return;
        }
        g1?.classList.add("valid");
      }
    }
    if (this.isWhiteTurn != true) {
      const f8 = document.querySelector("#f8");
      const g8 = document.querySelector("#g8");
      if (
        (g8 as HTMLElement).dataset.piece == "" &&
        (f8 as HTMLElement).dataset.piece == "" &&
        this.blackKSideCastlingEnabled == true
      ) {
        document.querySelectorAll(".attacked").forEach((el) => {
          el.classList.remove("attacked");
        });
        this.whitePieces.forEach((el) => el.checkLegalMoves());
        if (
          g8?.classList.contains("attacked") ||
          f8?.classList.contains("attacked")
        ) {
          return;
        }
        g8?.classList.add("valid");
      }
    }
  }

  handleQueenSideCastling(piece: King) {
    if (this.isWhiteTurn == true) {
      const c1 = document.querySelector("#c1");
      const d1 = document.querySelector("#d1");
      const b1 = document.querySelector("#b1");
      if (
        (c1 as HTMLElement).dataset.piece == "" &&
        (d1 as HTMLElement).dataset.piece == "" &&
        (b1 as HTMLElement).dataset.piece == "" &&
        this.whiteQSideCastlingEnabled == true
      ) {
        document.querySelectorAll(".attacked").forEach((el) => {
          el.classList.remove("attacked");
        });
        this.blackPieces.forEach((el) => el.checkLegalMoves());
        if (
          c1?.classList.contains("attacked") ||
          d1?.classList.contains("attacked") ||
          b1?.classList.contains("attacked")
        ) {
          return;
        }
        c1?.classList.add("valid");
      }
    }
    if (this.isWhiteTurn != true) {
      const c8 = document.querySelector("#c8");
      const d8 = document.querySelector("#d8");
      const b8 = document.querySelector("#b8");
      if (
        (c8 as HTMLElement).dataset.piece == "" &&
        (d8 as HTMLElement).dataset.piece == "" &&
        (b8 as HTMLElement).dataset.piece == "" &&
        this.blackQSideCastlingEnabled == true
      ) {
        document.querySelectorAll(".attacked").forEach((el) => {
          el.classList.remove("attacked");
        });
        this.whitePieces.forEach((el) => el.checkLegalMoves());
        if (
          c8?.classList.contains("attacked") ||
          d8?.classList.contains("attacked") ||
          b8?.classList.contains("attacked")
        ) {
          return;
        }
        c8?.classList.add("valid");
      }
    }
  }
}
