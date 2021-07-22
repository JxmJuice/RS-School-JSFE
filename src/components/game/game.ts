import { Bishop } from '../bishop/bishop';
import { ChessBoard } from '../chessboard/chessboard';
import { xToLetter } from '../constants';
import { King } from '../king/king';
import { Knight } from '../knight/knight';
import { Pawn } from '../pawn/pawn';
import { Player } from '../player/player';
import { PromotionPopUp } from '../promotion-popUp/promotion-popUp';
import { Queen } from '../queen/queen';
import { Rook } from '../rook/rook';
import { Timer } from '../timer/timer';

export class Game {
  whitePieces: Array<Rook | Knight | Bishop | King | Queen | Pawn>;

  blackPieces: Array<Rook | Knight | Bishop | King | Queen | Pawn>;

  player1: Player;

  player2: Player;

  lastMovedPiece: Rook | Pawn | Bishop | Knight | King | Queen | null;

  timer: Timer;

  chessBoard: ChessBoard;

  isWhiteTurn: boolean;

  isCheck: boolean;

  isMate: boolean;

  isStaleMate: boolean;

  isEnPassant: boolean;

  whiteKSideCastlingEnabled: boolean;

  whiteQSideCastlingEnabled: boolean;

  blackKSideCastlingEnabled: boolean;

  blackQSideCastlingEnabled: boolean;

  constructor(player1Name: string, player2Name: string) {
    this.player1 = new Player(player1Name, 'white');
    document.querySelector('main')?.appendChild(this.player1.element);
    this.chessBoard = new ChessBoard();
    document.querySelector('main')?.appendChild(this.chessBoard.element);
    this.player2 = new Player(player2Name, 'black');
    document.querySelector('main')?.appendChild(this.player2.element);
    this.whitePieces = [];
    this.blackPieces = [];
    this.whitePieces[0] = new Rook('white', 'h1');
    this.blackPieces[0] = new Rook('black', 'h8');
    this.whitePieces[1] = new Rook('white', 'a1');
    this.blackPieces[1] = new Rook('black', 'a8');
    this.blackPieces[2] = new Bishop('black', 'c8');
    this.whitePieces[2] = new Bishop('white', 'c1');
    this.blackPieces[3] = new Bishop('black', 'f8');
    this.whitePieces[3] = new Bishop('white', 'f1');
    this.whitePieces[4] = new Queen('white', 'd1');
    this.blackPieces[4] = new Queen('black', 'd8');
    this.whitePieces[5] = new Knight('white', 'b1');
    this.blackPieces[5] = new Knight('black', 'b8');
    this.whitePieces[6] = new Knight('white', 'g1');
    this.blackPieces[6] = new Knight('black', 'g8');
    for (let i = 7, k = 1; i < 15; i++, k++) {
      const letter = xToLetter(`${k}`);
      this.whitePieces[i] = new Pawn('white', `${letter}2`);
      this.blackPieces[i] = new Pawn('black', `${letter}7`);
    }
    this.whitePieces[15] = new King('white', 'e1');
    this.blackPieces[15] = new King('black', 'e8');
    this.timer = new Timer(
      document.querySelector('.header_wrapper') as HTMLElement,
    );
    this.timer.startTimer();

    this.lastMovedPiece = null;

    this.isEnPassant = false;
    this.isWhiteTurn = true;
    this.isCheck = false;
    this.isMate = false;
    this.isStaleMate = false;
    this.whiteKSideCastlingEnabled = true;
    this.whiteQSideCastlingEnabled = true;
    this.blackKSideCastlingEnabled = true;
    this.blackQSideCastlingEnabled = true;

    this.handleTurn();
  }

  handleTurn() {
    if (this.isWhiteTurn === true) {
      // this.chessBoard.element.classList.remove("turned");
      this.player1.element
        .querySelector('.player_column__avatar')
        ?.classList.add('player_turn');
      this.player2.element
        .querySelector('.player_column__avatar')
        ?.classList.remove('player_turn');
      this.validateWhiteTurn();
    }
    if (this.isWhiteTurn !== true) {
      this.player2.element
        .querySelector('.player_column__avatar')
        ?.classList.add('player_turn');
      this.player1.element
        .querySelector('.player_column__avatar')
        ?.classList.remove('player_turn');
      // this.chessBoard.element.classList.add("turned");
      this.validateBlackTurn();
    }
  }

  validateWhiteTurn() {
    if (this.isCheck === true) {
      this.handleMate();
      if (this.isMate === false) {
        this.handleCheck();
      } else {
        this.timer.stopTimer();
      }
    } else {
      this.blackPieces.forEach((el) => {
        el.element.onmousedown = null;
        el.element.onmouseup = null;
      });
      this.handleStaleMate();
      document
        .querySelectorAll('.valid')
        .forEach((el) => el.classList.remove('valid'));
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
    if (this.isCheck === true) {
      this.handleMate();
      this.handleCheck();
      if (this.isMate === false) {
        this.handleCheck();
      } else {
        this.timer.stopTimer();
      }
    } else {
      this.whitePieces.forEach((el) => {
        el.element.onmousedown = null;
        el.element.onmouseup = null;
      });
      this.handleStaleMate();
      document
        .querySelectorAll('.valid')
        .forEach((el) => el.classList.remove('valid'));
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
    event: Event | undefined,
  ) {
    document.querySelectorAll('.valid').forEach(el=>el.classList.remove('valid'));
    if (piece.element.classList.contains('king_white')) {
      this.blackPieces.forEach((el) => el.checkLegalMoves());
      piece.validateMove();
      if (this.whiteKSideCastlingEnabled === true) { this.handleKingSideCastling(); }
      if (this.whiteQSideCastlingEnabled === true) { this.handleQueenSideCastling(); }
      piece.handleMove(event as MouseEvent);
      return;
    }
    if (piece.element.classList.contains('king_black')) {
      this.whitePieces.forEach((el) => el.checkLegalMoves());
      piece.validateMove();
      if (this.blackKSideCastlingEnabled === true) { this.handleKingSideCastling(); }
      if (this.blackQSideCastlingEnabled === true) { this.handleQueenSideCastling(); }
      piece.handleMove(event as MouseEvent);
      return;
    }
    piece.validateMove();
    if (piece.element.classList.contains('pawn_white')) {
      this.handleEnPassant(piece);
    }
    if (piece.element.classList.contains('pawn_black')) {
      this.handleEnPassant(piece);
    }
    document.querySelectorAll('.valid').forEach((el) => {
      if (this.isWhiteTurn === true) {
        document
          .querySelectorAll('.attacked')
          .forEach((elem) => elem.classList.remove('attacked'));
        let currentState;
        if (
          (el as HTMLElement).dataset.piece === ''
          || (el as HTMLElement).dataset.piece === 'black'
        ) {
          currentState = (el as HTMLElement).dataset.piece;
        }
        if (piece.element.parentElement) {
          (el as HTMLElement).dataset.piece = 'white';
          piece.element.parentElement.dataset.piece = '';
          this.blackPieces.forEach((blackPiece) => {
            if (blackPiece.element.parentElement === el) {
              return;
            }
            blackPiece.checkLegalMoves();
          });
          (el as HTMLElement).dataset.piece = currentState;
          piece.element.parentElement.dataset.piece = 'white';
        }
        if (
          this.whitePieces[15].element.parentElement?.classList.contains(
            'attacked',
          )
        ) {
          el.classList.remove('valid');
        }
      } else {
        document
          .querySelectorAll('.attacked')
          .forEach((elem) => elem.classList.remove('attacked'));
        let currentState;
        if (
          (el as HTMLElement).dataset.piece === ''
          || (el as HTMLElement).dataset.piece === 'white'
        ) {
          currentState = (el as HTMLElement).dataset.piece;
        }
        if (piece.element.parentElement) {
          (el as HTMLElement).dataset.piece = 'black';
          piece.element.parentElement.dataset.piece = '';
          this.whitePieces.forEach((piece) => {
            if (piece.element.parentElement === el) {
              return;
            }
            piece.checkLegalMoves();
          });
          (el as HTMLElement).dataset.piece = currentState;
          piece.element.parentElement.dataset.piece = 'black';
        }
        if (
          this.blackPieces[15].element.parentElement?.classList.contains(
            'attacked',
          )
        ) {
          el.classList.remove('valid');
        }
      }
    });
    piece.handleMove(event as MouseEvent);
  }

  handleMouseUp(
    piece: Rook | Pawn | Bishop | Knight | King | Queen,
    initialPlace: HTMLElement | null,
  ) {
    setTimeout(() => {
      document.querySelectorAll('.valid').forEach((el) => {
        el.classList.remove('valid');
      });
      if (piece.currentSquare) piece.currentSquare.dataset.piece = '';
      piece.currentSquare = piece.element.parentElement;
      if (piece.currentSquare) {
        piece.currentSquare.dataset.piece = piece.pieceColor;
      }
      if (piece.currentSquare !== initialPlace) {
        if (this.isWhiteTurn === true) {
          if (
            piece.element.classList.contains('king_white')
            && (this.whiteQSideCastlingEnabled || this.whiteKSideCastlingEnabled)
          ) {
            if (piece.currentSquare === document.querySelector('#g1')) {
              document.querySelector('#h1')?.firstElementChild?.remove();
              (document.querySelector('#h1') as HTMLElement).dataset.piece = '';
              this.whitePieces[0] = new Rook('white', 'f1');
            }
            if (piece.currentSquare === document.querySelector('#c1')) {
              document.querySelector('#a1')?.firstElementChild?.remove();
              (document.querySelector('#a1') as HTMLElement).dataset.piece = '';
              this.whitePieces[1] = new Rook('white', 'd1');
            }
            this.whiteQSideCastlingEnabled = false;
            this.whiteKSideCastlingEnabled = false;
          }
          if (piece.element.classList.contains('rook_white')) {
            if (initialPlace?.id === 'h1') {
              this.whiteKSideCastlingEnabled = false;
            }
            if (initialPlace?.id === 'a1') {
              this.whiteQSideCastlingEnabled = false;
            }
          }
          if (this.isEnPassant === true) {
            const x = piece.currentSquare?.dataset.x;
            const y = piece.currentSquare?.dataset.y;
            let pawnSquare;
            if (x && y) {
              pawnSquare = document.querySelector(
                `#${xToLetter(x)}${+y - 1}`,
              ) as HTMLElement;
            }
            if (pawnSquare) {
              pawnSquare.innerHTML = '';
              pawnSquare.dataset.piece = '';
            }
            this.isEnPassant = false;
          }
          this.renderMove(piece, initialPlace as HTMLElement);
          this.lastMovedPiece = piece;
          this.handlePromotion(piece);
          this.createCheck();
          this.isWhiteTurn = false;
          this.handleTurn();
          return;
        }
        if (this.isWhiteTurn === false) {
          if (
            piece.element.classList.contains('king_black')
            && (this.blackKSideCastlingEnabled || this.blackQSideCastlingEnabled)
          ) {
            if (piece.currentSquare === document.querySelector('#g8')) {
              document.querySelector('#h8')?.firstElementChild?.remove();
              (document.querySelector('#h8') as HTMLElement).dataset.piece = '';
              this.blackPieces[0] = new Rook('black', 'f8');
            }
            if (piece.currentSquare === document.querySelector('#c8')) {
              document.querySelector('#a8')?.firstElementChild?.remove();
              (document.querySelector('#a8') as HTMLElement).dataset.piece = '';
              this.blackPieces[1] = new Rook('black', 'd8');
            }
            this.blackQSideCastlingEnabled = false;
            this.blackKSideCastlingEnabled = false;
          }
          if (piece.element.classList.contains('rook_black')) {
            if (initialPlace?.id === 'h8') {
              this.blackKSideCastlingEnabled = false;
            }
            if (initialPlace?.id === 'a8') {
              this.blackQSideCastlingEnabled = false;
            }
          }
          if (this.isEnPassant === true) {
            const x = piece.currentSquare?.dataset.x;
            const y = piece.currentSquare?.dataset.y;
            let pawnSquare;
            if (x && y) {
              pawnSquare = document.querySelector(
                `#${xToLetter(x)}${+y + 1}`,
              ) as HTMLElement;
            }
            if (pawnSquare) {
              pawnSquare.innerHTML = '';
              pawnSquare.dataset.piece = '';
            }
            this.isEnPassant = false;
          }
          this.renderMove(piece, initialPlace as HTMLElement);
          this.lastMovedPiece = piece;
          this.handlePromotion(piece);
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
    if (this.isWhiteTurn !== true) {
      for (const blackPiece of this.blackPieces) {
        document
          .querySelectorAll('.attacked')
          .forEach((square) => square.classList.remove('attacked'));
        blackPiece.checkLegalMoves();
        if (
          this.whitePieces[15].element.parentElement?.classList.contains(
            'attacked',
          )
        ) {
          this.whitePieces[15].element.parentElement?.classList.add('checked');
          blackPiece.element.parentElement?.classList.add('checked');
          this.isCheck = true;
        }
      }
    }

    if (this.isWhiteTurn === true) {
      for (const whitePiece of this.whitePieces) {
        document
          .querySelectorAll('.attacked')
          .forEach((square) => square.classList.remove('attacked'));
        whitePiece.checkLegalMoves();
        if (
          this.blackPieces[15].element.parentElement?.classList.contains(
            'attacked',
          )
        ) {
          this.blackPieces[15].element.parentElement?.classList.add('checked');
          whitePiece.element.parentElement?.classList.add('checked');
          this.isCheck = true;
        }
      }
    }
  }

  handleCheck() {
    document
      .querySelectorAll('.valid')
      .forEach((el) => el.classList.remove('valid'));
    if (this.isWhiteTurn === true) {
      this.blackPieces.forEach((el) => {
        el.element.onmousedown = null;
        el.element.onmouseup = null;
      });
      this.whitePieces.forEach((piece) => {
        const initialPlace = piece.currentSquare;
        piece.element.onmousedown = () => {
          this.handleCheckMouseDown(piece, event);
        };
        piece.element.onmouseup = () => {
          this.handleCheckMouseUp(piece, initialPlace);
        };
      });
    } else if (this.isWhiteTurn === false) {
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
    event: Event | undefined,
  ) {
    if (this.isWhiteTurn === true) {
      this.blackPieces.forEach((el) => {
        el.checkLegalMoves();
      });
    }
    if (this.isWhiteTurn === false) {
      this.whitePieces.forEach((el) => {
        el.checkLegalMoves();
      });
    }
    piece.validateMove();
    if (piece.element.classList.contains('king_white')) {
      piece.handleMove(event as MouseEvent);
      return;
    }
    if (piece.element.classList.contains('king_black')) {
      piece.handleMove(event as MouseEvent);
      return;
    }
    document.querySelectorAll('.valid').forEach((el) => {
      if (this.isWhiteTurn === true) {
        document
          .querySelectorAll('.attacked')
          .forEach((elem) => elem.classList.remove('attacked'));
        let currentState;
        if (
          (el as HTMLElement).dataset.piece === ''
          || (el as HTMLElement).dataset.piece === 'black'
        ) {
          currentState = (el as HTMLElement).dataset.piece;
        }
        if (
          (el as HTMLElement).dataset.piece === 'black'
          && (el as HTMLElement).classList.contains('checked')
          && document.querySelectorAll('.checked').length < 3
        ) {
          return;
        }
        (el as HTMLElement).dataset.piece = 'white';
        this.blackPieces.forEach((piece) => {
          piece.checkLegalMoves();
        });
        (el as HTMLElement).dataset.piece = currentState;
        if (
          this.whitePieces[15].element.parentElement?.classList.contains(
            'attacked',
          )
        ) {
          el.classList.remove('valid');
        }
      } else {
        document
          .querySelectorAll('.attacked')
          .forEach((elem) => elem.classList.remove('attacked'));
        let currentState;
        if (
          (el as HTMLElement).dataset.piece === ''
          || (el as HTMLElement).dataset.piece === 'white'
        ) {
          currentState = (el as HTMLElement).dataset.piece;
        }
        if (
          (el as HTMLElement).dataset.piece === 'white'
          && (el as HTMLElement).classList.contains('checked')
          && document.querySelectorAll('.checked').length < 3
        ) {
          return;
        }
        (el as HTMLElement).dataset.piece = 'black';
        this.whitePieces.forEach((piece) => {
          piece.checkLegalMoves();
        });
        (el as HTMLElement).dataset.piece = currentState;
        if (
          this.blackPieces[15].element.parentElement?.classList.contains(
            'attacked',
          )
        ) {
          el.classList.remove('valid');
        }
      }
    });
    piece.handleMove(event as MouseEvent);
  }

  handleCheckMouseUp(
    piece: Rook | Pawn | Bishop | Knight | King | Queen,
    initialPlace: HTMLElement | null,
  ) {
    setTimeout(() => {
      document.querySelectorAll('.square').forEach((el) => {
        el.classList.remove('valid');
        if (piece.currentSquare) piece.currentSquare.dataset.piece = '';
        piece.currentSquare = piece.element.parentElement;
        if (piece.currentSquare) {
          piece.currentSquare.dataset.piece = piece.pieceColor;
        }
      });
      if (piece.currentSquare !== initialPlace) {
        if (this.isWhiteTurn === true) {
          document
            .querySelectorAll('.checked')
            .forEach((el) => el.classList.remove('checked'));
          if (this.isEnPassant === true) {
            const x = piece.currentSquare?.dataset.x;
            const y = piece.currentSquare?.dataset.y;
            let pawnSquare;
            if (x && y) {
              pawnSquare = document.querySelector(
                `#${xToLetter(x)}${+y - 1}`,
              ) as HTMLElement;
            }
            if (pawnSquare) {
              pawnSquare.innerHTML = '';
              pawnSquare.dataset.piece = '';
            }
            this.isEnPassant = false;
          }
          this.lastMovedPiece = piece;
          this.handlePromotion(piece);
          this.isCheck = false;
          this.createCheck();
          this.isWhiteTurn = false;
          this.handleTurn();
          return;
        }
        if (this.isWhiteTurn === false) {
          document
            .querySelectorAll('.checked')
            .forEach((el) => el.classList.remove('checked'));
          if (this.isEnPassant === true) {
            const x = piece.currentSquare?.dataset.x;
            const y = piece.currentSquare?.dataset.y;
            let pawnSquare;
            if (x && y) {
              pawnSquare = document.querySelector(
                `#${xToLetter(x)}${+y + 1}`,
              ) as HTMLElement;
            }
            if (pawnSquare) {
              pawnSquare.innerHTML = '';
              pawnSquare.dataset.piece = '';
            }
            this.isEnPassant = false;
          }
          this.lastMovedPiece = piece;
          this.handlePromotion(piece);
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

  handleKingSideCastling() {
    if (this.isWhiteTurn === true) {
      const f1 = document.querySelector('#f1');
      const g1 = document.querySelector('#g1');
      if (
        (g1 as HTMLElement).dataset.piece === ''
        && (f1 as HTMLElement).dataset.piece === ''
        && this.whiteKSideCastlingEnabled === true
      ) {
        document.querySelectorAll('.attacked').forEach((el) => {
          el.classList.remove('attacked');
        });
        this.blackPieces.forEach((el) => el.checkLegalMoves());
        if (
          g1?.classList.contains('attacked')
          || f1?.classList.contains('attacked')
        ) {
          return;
        }
        g1?.classList.add('valid');
      }
    }
    if (this.isWhiteTurn !== true) {
      const f8 = document.querySelector('#f8');
      const g8 = document.querySelector('#g8');
      if (
        (g8 as HTMLElement).dataset.piece === ''
        && (f8 as HTMLElement).dataset.piece === ''
        && this.blackKSideCastlingEnabled === true
      ) {
        document.querySelectorAll('.attacked').forEach((el) => {
          el.classList.remove('attacked');
        });
        this.whitePieces.forEach((el) => el.checkLegalMoves());
        if (
          g8?.classList.contains('attacked')
          || f8?.classList.contains('attacked')
        ) {
          return;
        }
        g8?.classList.add('valid');
      }
    }
  }

  handleQueenSideCastling() {
    if (this.isWhiteTurn === true) {
      const c1 = document.querySelector('#c1');
      const d1 = document.querySelector('#d1');
      const b1 = document.querySelector('#b1');
      if (
        (c1 as HTMLElement).dataset.piece === ''
        && (d1 as HTMLElement).dataset.piece === ''
        && (b1 as HTMLElement).dataset.piece === ''
        && this.whiteQSideCastlingEnabled === true
      ) {
        document.querySelectorAll('.attacked').forEach((el) => {
          el.classList.remove('attacked');
        });
        this.blackPieces.forEach((el) => el.checkLegalMoves());
        if (
          c1?.classList.contains('attacked')
          || d1?.classList.contains('attacked')
          || b1?.classList.contains('attacked')
        ) {
          return;
        }
        c1?.classList.add('valid');
      }
    }
    if (this.isWhiteTurn !== true) {
      const c8 = document.querySelector('#c8');
      const d8 = document.querySelector('#d8');
      const b8 = document.querySelector('#b8');
      if (
        (c8 as HTMLElement).dataset.piece === ''
        && (d8 as HTMLElement).dataset.piece === ''
        && (b8 as HTMLElement).dataset.piece === ''
        && this.blackQSideCastlingEnabled === true
      ) {
        document.querySelectorAll('.attacked').forEach((el) => {
          el.classList.remove('attacked');
        });
        this.whitePieces.forEach((el) => el.checkLegalMoves());
        if (
          c8?.classList.contains('attacked')
          || d8?.classList.contains('attacked')
          || b8?.classList.contains('attacked')
        ) {
          return;
        }
        c8?.classList.add('valid');
      }
    }
  }

  handleMate() {
    if (this.isWhiteTurn === true) {
      this.whitePieces.forEach((el) => {
        el.validateMove();
        document.querySelectorAll('.valid').forEach((el) => {
          document
            .querySelectorAll('.attacked')
            .forEach((elem) => elem.classList.remove('attacked'));
          let currentState;
          if (
            (el as HTMLElement).dataset.piece === ''
            || (el as HTMLElement).dataset.piece === 'black'
          ) {
            currentState = (el as HTMLElement).dataset.piece;
          }
          if (
            (el as HTMLElement).dataset.piece === 'black'
            && (el as HTMLElement).classList.contains('checked')
            && document.querySelectorAll('.checked').length < 3
          ) {
            return;
          }
          (el as HTMLElement).dataset.piece = 'white';
          this.blackPieces.forEach((piece) => {
            piece.checkLegalMoves();
          });
          (el as HTMLElement).dataset.piece = currentState;
          if (
            this.whitePieces[15].element.parentElement?.classList.contains(
              'attacked',
            )
          ) {
            el.classList.remove('valid');
          }
        });
      });
      document
        .querySelectorAll('.attacked')
        .forEach((el) => el.classList.remove('.attacked'));
      this.blackPieces.forEach((el) => el.checkLegalMoves());
      this.whitePieces[15].validateMove();
      if (document.querySelectorAll('.valid').length === 0) {
        this.isMate = true;
      }
    }
    if (this.isWhiteTurn === false) {
      this.blackPieces.forEach((el) => {
        el.validateMove();
        document.querySelectorAll('.valid').forEach((el) => {
          document
            .querySelectorAll('.attacked')
            .forEach((elem) => elem.classList.remove('attacked'));
          let currentState;
          if (
            (el as HTMLElement).dataset.piece === ''
            || (el as HTMLElement).dataset.piece === 'white'
          ) {
            currentState = (el as HTMLElement).dataset.piece;
          }
          if (
            (el as HTMLElement).dataset.piece === 'white'
            && (el as HTMLElement).classList.contains('checked')
            && document.querySelectorAll('.checked').length < 3
          ) {
            return;
          }
          (el as HTMLElement).dataset.piece = 'black';
          this.whitePieces.forEach((piece) => {
            piece.checkLegalMoves();
          });
          (el as HTMLElement).dataset.piece = currentState;
          if (
            this.blackPieces[15].element.parentElement?.classList.contains(
              'attacked',
            )
          ) {
            el.classList.remove('valid');
          }
        });
      });
      document
        .querySelectorAll('.attacked')
        .forEach((el) => el.classList.remove('.attacked'));
      this.whitePieces.forEach((el) => el.checkLegalMoves());
      this.blackPieces[15].validateMove();
      if (document.querySelectorAll('.valid').length === 0) {
        this.isMate = true;
      }
    }
  }

  handleStaleMate() {
    if (this.isWhiteTurn === true) {
      this.whitePieces.forEach((el) => {
        if (el.element.classList.contains('king_white')) {
          return;
        }
        el.validateMove();
        document.querySelectorAll('.valid').forEach((el) => {
          document
            .querySelectorAll('.attacked')
            .forEach((elem) => elem.classList.remove('attacked'));
          let currentState;
          if (
            (el as HTMLElement).dataset.piece === ''
            || (el as HTMLElement).dataset.piece === 'black'
          ) {
            currentState = (el as HTMLElement).dataset.piece;
          }
          (el as HTMLElement).dataset.piece = 'white';
          this.blackPieces.forEach((piece) => {
            piece.checkLegalMoves();
          });
          (el as HTMLElement).dataset.piece = currentState;
          if (
            this.whitePieces[15].element.parentElement?.classList.contains(
              'attacked',
            )
          ) {
            el.classList.remove('valid');
          }
        });
      });
      document
        .querySelectorAll('.attacked')
        .forEach((el) => el.classList.remove('.attacked'));
      this.blackPieces.forEach((el) => el.checkLegalMoves());
      this.whitePieces[15].validateMove();
      if (document.querySelectorAll('.valid').length === 0) {
        this.isStaleMate = true;
      }
    }
    if (this.isWhiteTurn === false) {
      this.blackPieces.forEach((el) => {
        if (el.element.classList.contains('king_black')) {
          return;
        }
        el.validateMove();
        document.querySelectorAll('.valid').forEach((el) => {
          document
            .querySelectorAll('.attacked')
            .forEach((elem) => elem.classList.remove('attacked'));
          let currentState;
          if (
            (el as HTMLElement).dataset.piece === ''
            || (el as HTMLElement).dataset.piece === 'white'
          ) {
            currentState = (el as HTMLElement).dataset.piece;
          }
          (el as HTMLElement).dataset.piece = 'black';
          this.whitePieces.forEach((piece) => {
            piece.checkLegalMoves();
          });
          (el as HTMLElement).dataset.piece = currentState;
          if (
            this.blackPieces[15].element.parentElement?.classList.contains(
              'attacked',
            )
          ) {
            el.classList.remove('valid');
          }
        });
      });
      document
        .querySelectorAll('.attacked')
        .forEach((el) => el.classList.remove('.attacked'));
      this.whitePieces.forEach((el) => el.checkLegalMoves());
      this.blackPieces[15].validateMove();
      if (document.querySelectorAll('.valid').length === 0) {
        this.isStaleMate = true;
      }
    }
  }

  handleEnPassant(piece: Pawn) {
    if (this.isWhiteTurn === true) {
      const x = this.lastMovedPiece?.element.parentElement?.dataset.x;
      const y = this.lastMovedPiece?.element.parentElement?.dataset.y;
      if (
        x
        && y
        && piece.element.parentElement?.dataset.x
        && this.lastMovedPiece?.startPosition?.dataset.y === '7'
        && (+x === +piece.element.parentElement.dataset.x - 1
          || +x === +piece.element.parentElement.dataset.x + 1)
        && y === piece.element.parentElement.dataset.y
        && y === '5'
        && this.lastMovedPiece?.element.classList.contains('pawn_black')
      ) {
        document
          .querySelector(`#${xToLetter(x)}${+y + 1}`)
          ?.classList.add('valid');
        this.isEnPassant = true;
      }
    }

    if (this.isWhiteTurn === false) {
      const x = this.lastMovedPiece?.element.parentElement?.dataset.x;
      const y = this.lastMovedPiece?.element.parentElement?.dataset.y;
      if (
        x
        && y
        && piece.element.parentElement?.dataset.x
        && this.lastMovedPiece?.startPosition?.dataset.y === '2'
        && (+x === +piece.element.parentElement.dataset.x - 1
          || +x === +piece.element.parentElement.dataset.x + 1)
        && y === piece.element.parentElement.dataset.y
        && this.lastMovedPiece?.element.classList.contains('pawn_white')
      ) {
        document
          .querySelector(`#${xToLetter(x)}${+y - 1}`)
          ?.classList.add('valid');
        this.isEnPassant = true;
      }
    }
  }

  handlePromotion(piece: Pawn) {
    if (
      this.isWhiteTurn === true
      && piece.currentSquare?.dataset.y === '8'
      && piece.element.classList.contains('pawn_white')
    ) {
      const promotionSquare = piece.currentSquare;
      promotionSquare.innerHTML = '';
      const popUp = new PromotionPopUp('white');
      document.body.appendChild(popUp.element);
      document
        .querySelector('.pop-up')
        ?.querySelectorAll('button')
        .forEach((button) => {
          button.addEventListener('click', (event) => {
            const square = piece.currentSquare;
            if (square) {
              square.innerHTML = '';
              if (
                (event.target as HTMLButtonElement).dataset.piece === 'queen'
              ) {
                this.whitePieces.push(new Queen('white', square.id));
              } else if (
                (event.target as HTMLButtonElement).dataset.piece === 'rook'
              ) {
                this.whitePieces.push(new Rook('white', square.id));
              } else if (
                (event.target as HTMLButtonElement).dataset.piece === 'knight'
              ) {
                this.whitePieces.push(new Knight('white', square.id));
              } else if (
                (event.target as HTMLButtonElement).dataset.piece === 'bishop'
              ) {
                this.whitePieces.push(new Bishop('white', square.id));
              }
            }
            this.isWhiteTurn = true;
            this.createCheck();
            this.isWhiteTurn = false;
            this.handleMate();
            popUp.removePopUp();
          });
        });
    }
    if (
      this.isWhiteTurn === false
      && piece.currentSquare?.dataset.y === '1'
      && piece.element.classList.contains('pawn_black')
    ) {
      const promotionSquare = piece.currentSquare;
      promotionSquare.innerHTML = '';
      const popUp = new PromotionPopUp('black');
      document.body.appendChild(popUp.element);
      document
        .querySelector('.pop-up')
        ?.querySelectorAll('button')
        .forEach((button) => {
          button.addEventListener('click', (event) => {
            const square = piece.currentSquare;
            if (square) {
              square.innerHTML = '';
              if (
                (event.target as HTMLButtonElement).dataset.piece === 'queen'
              ) {
                this.blackPieces.push(new Queen('black', square.id));
              } else if (
                (event.target as HTMLButtonElement).dataset.piece === 'rook'
              ) {
                this.blackPieces.push(new Rook('black', square.id));
              } else if (
                (event.target as HTMLButtonElement).dataset.piece === 'knight'
              ) {
                this.blackPieces.push(new Knight('black', square.id));
              } else if (
                (event.target as HTMLButtonElement).dataset.piece === 'bishop'
              ) {
                this.blackPieces.push(new Bishop('black', square.id));
              }
            }
            this.isWhiteTurn = false;
            this.createCheck();
            this.isWhiteTurn = true;
            this.handleMate();
            popUp.removePopUp();
          });
        });
    }
  }

  renderMove(
    piece: Rook | Pawn | Bishop | Knight | King | Queen,
    initialPlace: HTMLElement,
  ) {
    if (this.isWhiteTurn === true) {
      if (piece.element.classList.contains('rook')) {
        this.player1.createMove(
          'R',
          initialPlace.id,
          (piece.currentSquare as HTMLElement).id,
          this.timer.element.innerText,
        );
      }
      if (piece.element.classList.contains('queen')) {
        this.player1.createMove(
          'Q',
          initialPlace.id,
          (piece.currentSquare as HTMLElement).id,
          this.timer.element.innerText,
        );
      }
      if (piece.element.classList.contains('pawn')) {
        this.player1.createMove(
          '',
          initialPlace.id,
          (piece.currentSquare as HTMLElement).id,
          this.timer.element.innerText,
        );
      }
      if (piece.element.classList.contains('king')) {
        this.player1.createMove(
          'K',
          initialPlace.id,
          (piece.currentSquare as HTMLElement).id,
          this.timer.element.innerText,
        );
      }
      if (piece.element.classList.contains('knight')) {
        this.player1.createMove(
          'N',
          initialPlace.id,
          (piece.currentSquare as HTMLElement).id,
          this.timer.element.innerText,
        );
      }
      if (piece.element.classList.contains('bishop')) {
        this.player1.createMove(
          'B',
          initialPlace.id,
          (piece.currentSquare as HTMLElement).id,
          this.timer.element.innerText,
        );
      }
    } else {
      if (piece.element.classList.contains('rook')) {
        this.player2.createMove(
          'R',
          initialPlace.id,
          (piece.currentSquare as HTMLElement).id,
          this.timer.element.innerText,
        );
      }
      if (piece.element.classList.contains('queen')) {
        this.player2.createMove(
          'Q',
          initialPlace.id,
          (piece.currentSquare as HTMLElement).id,
          this.timer.element.innerText,
        );
      }
      if (piece.element.classList.contains('pawn')) {
        this.player2.createMove(
          '',
          initialPlace.id,
          (piece.currentSquare as HTMLElement).id,
          this.timer.element.innerText,
        );
      }
      if (piece.element.classList.contains('king')) {
        this.player2.createMove(
          'K',
          initialPlace.id,
          (piece.currentSquare as HTMLElement).id,
          this.timer.element.innerText,
        );
      }
      if (piece.element.classList.contains('knight')) {
        this.player2.createMove(
          'N',
          initialPlace.id,
          (piece.currentSquare as HTMLElement).id,
          this.timer.element.innerText,
        );
      }
      if (piece.element.classList.contains('bishop')) {
        this.player2.createMove(
          'B',
          initialPlace.id,
          (piece.currentSquare as HTMLElement).id,
          this.timer.element.innerText,
        );
      }
    }
  }
}
