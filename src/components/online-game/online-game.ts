import { EnemyPiece } from '../../models/enemy-piece-model/enemy-piece-model';
import { OnlineMove } from '../../models/move-model/move-model';
import { Bishop } from '../bishop/bishop';
import { ChessBoard } from '../chessboard/chessboard';
import { xToLetter } from '../constants';
import { EndgamePopUp } from '../endgamePopUp/endgamePopUp';
import { Header } from '../header/header';
import { King } from '../king/king';
import { Knight } from '../knight/knight';
import { Pawn } from '../pawn/pawn';
import { OnlinePlayer } from '../player-online/player-online';
import { PregamePopUp } from '../pregamePopUp/pregamePopUp';
import { PromotionPopUp } from '../promotion-popUp/promotion-popUp';
import { Queen } from '../queen/queen';
import { Rook } from '../rook/rook';
import { Timer } from '../timer/timer';

export class OnlineGame {
  socket: WebSocket;

  yourPieces: Array<Rook | Knight | Bishop | King | Queen | Pawn>;

  yourColor: string;

  yourName: string;

  enemyColor: string;

  enemyPieces: Array<Rook | Knight | Bishop | King | Queen | Pawn>;

  player1: OnlinePlayer;

  player2: OnlinePlayer;

  lastMovedPiece: Rook | Pawn | Bishop | Knight | King | Queen | null;

  lastMovedEnemyPiece: EnemyPiece | null;

  timer: Timer;

  chessBoard: ChessBoard;

  isYourTurn: boolean;

  isCheck: boolean;

  isMate: boolean;

  isStaleMate: boolean;

  isEnPassant: boolean;

  KSideCastlingEnabled: boolean;

  QSideCastlingEnabled: boolean;

  constructor(player1Name: string) {
    this.socket = new WebSocket('ws://jxm-chess-server.herokuapp.com/:8999');
    this.yourName = player1Name;
    this.yourColor = '';
    this.enemyColor = '';
    this.yourPieces = [];
    this.enemyPieces = [];
    this.handleIncomingMove();
    this.player1 = new OnlinePlayer(player1Name);
    document.querySelector('main')?.appendChild(this.player1.element);
    this.chessBoard = new ChessBoard();
    document.querySelector('main')?.appendChild(this.chessBoard.element);
    this.player2 = new OnlinePlayer('', true);
    document.querySelector('main')?.appendChild(this.player2.element);

    this.timer = new Timer(
      document.querySelector('.header_wrapper') as HTMLElement,
    );

    this.lastMovedPiece = null;
    this.lastMovedEnemyPiece = null;

    this.isEnPassant = false;
    this.isYourTurn = true;
    this.isCheck = false;
    this.isMate = false;
    this.isStaleMate = false;
    this.KSideCastlingEnabled = true;
    this.QSideCastlingEnabled = true;

    this.handleResign();
    this.handleDrawOffer();
  }

  handleDrawOffer() {
    const drawButton = document.querySelector(
      '#draw_button',
    ) as HTMLButtonElement;
    drawButton.onclick = () => {
      drawButton.classList.add('draw_offered');
      this.socket.send('draw offered');
    };
    setTimeout(() => {
      drawButton.onclick = null;
      drawButton.classList.remove('draw_offered');
    }, 10000);
  }

  handleResign() {
    document
      .querySelector('.player_button__resign')
      ?.addEventListener('click', () => {
        const popUp = new EndgamePopUp('You Resigned');
        document.body.appendChild(popUp.element);
        this.socket.send('resigned');
        this.socket.close();
        popUp.element
          .querySelector('.to-lobby')
          ?.addEventListener('click', () => {
            popUp.removePopUp();
            document.querySelector('.player_column')?.remove();
            document.querySelector('.player_column')?.remove();
            document.querySelector('.chessboard')?.remove();
            document.querySelector('.lobby')?.classList.remove('hidden');
            (document.querySelector('header') as HTMLElement).innerHTML = new Header().element.innerHTML;
            popUp.removePopUp();
          });
      });
  }

  handleIncomingMove() {
    const game = this;
    const ws = this.socket;
    this.socket.onmessage = function handleMessage(event) {
      const message = event.data;
      if (message === 'connected') {
        game.socket.send(`name: ${game.yourName}`);
        return;
      }
      if (message === 'white') {
        game.timer.startTimer();
        game.initializePieces('white', 'black');
        document.querySelector('.pop-up')?.remove();
        game.handleTurn();
        return;
      }
      if (message === 'black') {
        game.timer.startTimer();
        game.initializePieces('black', 'white');
        document.querySelector('.pop-up')?.remove();
        game.handleTurn();
        return;
      }
      if (message === 'loading') {
        const popUp = new PregamePopUp();
        document.body.appendChild(popUp.element);
        popUp.element
          .querySelector('.to-lobby-online')
          ?.addEventListener('click', () => {
            ws.close();
            (document.querySelector('header') as HTMLElement).innerHTML = new Header().element.innerHTML;
            popUp.removePopUp();
            document.querySelector('.player_column')?.remove();
            document.querySelector('.player_column')?.remove();
            document.querySelector('.chessboard')?.remove();
            document.querySelector('.lobby')?.classList.remove('hidden');
          });
        return;
      }
      let playerAvatar;
      if (message.split(' ')[0] === 'name:') {
        if (message.split(' ')[1] !== '') {
          playerAvatar = message.split(' ')[1][0];
          if (message.split(' ')[2][0] !== undefined) {
            playerAvatar += message.split(' ')[2][0];
          }
        }
        let playerName = message.split(' ');
        playerName.splice(0, 1);
        playerName = playerName.join(' ');
        (
          game.player2.element.querySelector(
            '.player_column__avatar',
          ) as HTMLElement
        ).innerText = playerAvatar;
        (
          game.player2.element.querySelector(
            '.player_column__name',
          ) as HTMLElement
        ).innerText = playerName;
        return;
      }
      if (message === 'mate') {
        const popUp = new EndgamePopUp('You Won');
        document.body.appendChild(popUp.element);
        game.socket.close();
        popUp.element
          .querySelector('.to-lobby')
          ?.addEventListener('click', () => {
            popUp.removePopUp();
            document.querySelector('.player_column')?.remove();
            document.querySelector('.player_column')?.remove();
            document.querySelector('.chessboard')?.remove();
            document.querySelector('.lobby')?.classList.remove('hidden');
            (document.querySelector('header') as HTMLElement).innerHTML = new Header().element.innerHTML;
            popUp.removePopUp();
          });
        return;
      }
      if (message === 'stalemate') {
        const popUp = new EndgamePopUp('Draw');
        document.body.appendChild(popUp.element);
        game.socket.close();
        popUp.element
          .querySelector('.to-lobby')
          ?.addEventListener('click', () => {
            popUp.removePopUp();
            document.querySelector('.player_column')?.remove();
            document.querySelector('.player_column')?.remove();
            document.querySelector('.chessboard')?.remove();
            document.querySelector('.lobby')?.classList.remove('hidden');
            (document.querySelector('header') as HTMLElement).innerHTML = new Header().element.innerHTML;
            popUp.removePopUp();
          });
        return;
      }
      if (message === 'resigned') {
        const popUp = new EndgamePopUp('Opponent Resigned');
        document.body.appendChild(popUp.element);
        ws.close();
        popUp.element
          .querySelector('.to-lobby')
          ?.addEventListener('click', () => {
            popUp.removePopUp();
            document.querySelector('.player_column')?.remove();
            document.querySelector('.player_column')?.remove();
            document.querySelector('.chessboard')?.remove();
            document.querySelector('.lobby')?.classList.remove('hidden');
            (document.querySelector('header') as HTMLElement).innerHTML = new Header().element.innerHTML;
            popUp.removePopUp();
          });
        return;
      }
      if (message === 'draw offered') {
        const drawButton = document.querySelector(
          '#draw_button',
        ) as HTMLButtonElement;
        drawButton.classList.add('draw_accept');
        drawButton.onclick = () => {
          const popUp = new EndgamePopUp('Draw');
          document.body.appendChild(popUp.element);
          ws.send('draw agreed');
          ws.close();
          popUp.element
            .querySelector('.to-lobby')
            ?.addEventListener('click', () => {
              popUp.removePopUp();
              document.querySelector('.player_column')?.remove();
              document.querySelector('.player_column')?.remove();
              document.querySelector('.chessboard')?.remove();
              document.querySelector('.lobby')?.classList.remove('hidden');
              (document.querySelector('header') as HTMLElement).innerHTML = new Header().element.innerHTML;
              popUp.removePopUp();
            });
        };
        setTimeout(() => {
          drawButton.onclick = () => {
            drawButton.classList.add('draw_offered');
            game.socket.send('draw offered');
          };
          drawButton.classList.remove('draw_accept');
        }, 10000);
        return;
      }
      if (message === 'draw agreed') {
        const popUp = new EndgamePopUp('Draw');
        document.body.appendChild(popUp.element);
        ws.close();
        popUp.element
          .querySelector('.to-lobby')
          ?.addEventListener('click', () => {
            popUp.removePopUp();
            document.querySelector('.player_column')?.remove();
            document.querySelector('.player_column')?.remove();
            document.querySelector('.chessboard')?.remove();
            document.querySelector('.lobby')?.classList.remove('hidden');
            (document.querySelector('header') as HTMLElement).innerHTML = new Header().element.innerHTML;
            popUp.removePopUp();
          });
        return;
      }
      if (message === 'disconnected') {
        const messageElem = document.createElement('div');
        messageElem.textContent = message;
        const popUp = new EndgamePopUp('Opponent left');
        document.body.appendChild(popUp.element);
        popUp.element
          .querySelector('.to-lobby')
          ?.addEventListener('click', () => {
            popUp.removePopUp();
            document.querySelector('.player_column')?.remove();
            document.querySelector('.player_column')?.remove();
            document.querySelector('.chessboard')?.remove();
            document.querySelector('.lobby')?.classList.remove('hidden');
            (document.querySelector('header') as HTMLElement).innerHTML = new Header().element.innerHTML;
            popUp.removePopUp();
          });
        return;
      }

      const move = JSON.parse(message) as OnlineMove;
      const initialSquare = document.querySelector(
        `#${move.initialSquare}`,
      ) as HTMLElement;
      const piece = initialSquare.firstElementChild as HTMLElement;
      initialSquare.innerHTML = '';
      initialSquare.dataset.piece = '';
      const finalSquare = document.querySelector(
        `#${move.finalSquare}`,
      ) as HTMLElement;
      finalSquare.innerHTML = '';
      game.isYourTurn = true;
      game.lastMovedEnemyPiece = new EnemyPiece(piece, move.initialSquare);
      game.handleEnemyMove(
        move.initialPiece,
        move.finalPiece,
        move.initialSquare,
        finalSquare,
        piece,
      );
    };
  }

  handleEnemyMove(
    initialPiece: string,
    finalPiece: string,
    initialSquare: string,
    finalSquare: HTMLElement,
    piece: HTMLElement,
  ) {
    if (initialPiece === finalPiece) {
      finalSquare.appendChild(piece);
      finalSquare.dataset.piece = this.enemyColor;
      if (
        this.yourColor === 'white'
        && this.lastMovedPiece?.element.classList.contains('pawn')
        && this.lastMovedEnemyPiece?.enemyPiece.classList.contains('pawn')
        && this.lastMovedPiece.startPosition?.dataset.y === '2'
        && this.lastMovedPiece.currentSquare?.dataset.y === '4'
        && xToLetter(this.lastMovedPiece?.startPosition?.dataset.x as string)
          === finalSquare.id.split('')[0]
        && finalSquare.id.split('')[1] === '3'
      ) {
        (
          this.lastMovedPiece.element.parentElement as HTMLElement
        ).dataset.piece = '';
        this.lastMovedPiece?.element.remove();
      }
      if (
        this.yourColor === 'black'
        && this.lastMovedPiece?.element.classList.contains('pawn')
        && this.lastMovedEnemyPiece?.enemyPiece.classList.contains('pawn')
        && this.lastMovedPiece.startPosition?.dataset.y === '7'
        && this.lastMovedPiece.currentSquare?.dataset.y === '5'
        && xToLetter(this.lastMovedPiece?.startPosition?.dataset.x as string)
          === finalSquare.id.split('')[0]
        && finalSquare.id.split('')[1] === '6'
      ) {
        (
          this.lastMovedPiece.element.parentElement as HTMLElement
        ).dataset.piece = '';
        this.lastMovedPiece?.element.remove();
      }
    } else if (initialPiece === 'pawn') {
      if (finalPiece === 'queen') {
        const queen = new Queen(this.enemyColor, finalSquare.id);
        this.enemyPieces.push(queen);
      }
      if (finalPiece === 'rook') {
        this.enemyPieces.push(new Rook(this.enemyColor, finalSquare.id));
      }
      if (finalPiece === 'knight') {
        this.enemyPieces.push(new Knight(this.enemyColor, finalSquare.id));
      }
      if (finalPiece === 'bishop') {
        this.enemyPieces.push(new Bishop(this.enemyColor, finalSquare.id));
      }
    }
    document.querySelectorAll('.checked').forEach((el) => {
      el.classList.remove('checked');
    });
    this.handleEnemyCheck();
    this.handleEnemyCastling(finalPiece, initialSquare, finalSquare.id);
    this.renderEnemyMove(initialPiece, initialSquare, finalSquare.id);
    this.handleTurn();
  }

  handleEnemyCastling(
    finalPiece: string,
    initialSquare: string,
    finalSquare: string,
  ) {
    if (finalPiece === 'king' && initialSquare === 'e1' && finalSquare === 'g1') {
      document.querySelector('#h1')?.firstElementChild?.remove();
      (document.querySelector('#h1') as HTMLElement).dataset.piece = '';
      this.enemyPieces[0] = new Rook(this.enemyColor, 'f1');
    }
    if (finalPiece === 'king' && initialSquare === 'e1' && finalSquare === 'c1') {
      document.querySelector('#a1')?.firstElementChild?.remove();
      (document.querySelector('#a1') as HTMLElement).dataset.piece = '';
      this.enemyPieces[0] = new Rook(this.enemyColor, 'd1');
    }
    if (finalPiece === 'king' && initialSquare === 'e8' && finalSquare === 'g8') {
      document.querySelector('#h8')?.firstElementChild?.remove();
      (document.querySelector('#h8') as HTMLElement).dataset.piece = '';
      this.enemyPieces[0] = new Rook(this.enemyColor, 'f8');
    }
    if (finalPiece === 'king' && initialSquare === 'e8' && finalSquare === 'c8') {
      document.querySelector('#a8')?.firstElementChild?.remove();
      (document.querySelector('#a8') as HTMLElement).dataset.piece = '';
      this.enemyPieces[0] = new Rook(this.enemyColor, 'd8');
    }
  }

  handleEnemyCheck() {
    this.enemyPieces.forEach((piece) => {
      piece.checkLegalMoves();
      if (
        this.yourPieces[15].element.parentElement?.classList.contains(
          'attacked',
        )
      ) {
        piece.element.parentElement?.classList.add('checked');
        this.yourPieces[15].element.parentElement.classList.add('checked');
        document
          .querySelectorAll('.attacked')
          .forEach((el) => el.classList.remove('attacked'));
        this.isCheck = true;
      }
    });
  }

  initializePieces(yourColor: string, enemyColor: string) {
    this.yourColor = yourColor;
    this.enemyColor = enemyColor;
    if (yourColor === 'white') {
      this.yourPieces[0] = new Rook('white', 'h1');
      this.enemyPieces[0] = new Rook('black', 'h8');
      this.yourPieces[1] = new Rook('white', 'a1');
      this.enemyPieces[1] = new Rook('black', 'a8');
      this.enemyPieces[2] = new Bishop('black', 'c8');
      this.yourPieces[2] = new Bishop('white', 'c1');
      this.enemyPieces[3] = new Bishop('black', 'f8');
      this.yourPieces[3] = new Bishop('white', 'f1');
      this.yourPieces[4] = new Queen('white', 'd1');
      this.enemyPieces[4] = new Queen('black', 'd8');
      this.yourPieces[5] = new Knight('white', 'b1');
      this.enemyPieces[5] = new Knight('black', 'b8');
      this.yourPieces[6] = new Knight('white', 'g1');
      this.enemyPieces[6] = new Knight('black', 'g8');
      for (let i = 7, k = 1; i < 15; i++, k++) {
        const letter = xToLetter(`${k}`);
        this.yourPieces[i] = new Pawn('white', `${letter}2`);
        this.enemyPieces[i] = new Pawn('black', `${letter}7`);
      }
      this.yourPieces[15] = new King('white', 'e1');
      this.enemyPieces[15] = new King('black', 'e8');
    }
    if (yourColor === 'black') {
      this.chessBoard.element.classList.add('turned');
      this.isYourTurn = false;
      this.enemyPieces[0] = new Rook('white', 'h1');
      this.yourPieces[0] = new Rook('black', 'h8');
      this.enemyPieces[1] = new Rook('white', 'a1');
      this.yourPieces[1] = new Rook('black', 'a8');
      this.yourPieces[2] = new Bishop('black', 'c8');
      this.enemyPieces[2] = new Bishop('white', 'c1');
      this.yourPieces[3] = new Bishop('black', 'f8');
      this.enemyPieces[3] = new Bishop('white', 'f1');
      this.enemyPieces[4] = new Queen('white', 'd1');
      this.yourPieces[4] = new Queen('black', 'd8');
      this.enemyPieces[5] = new Knight('white', 'b1');
      this.yourPieces[5] = new Knight('black', 'b8');
      this.enemyPieces[6] = new Knight('white', 'g1');
      this.yourPieces[6] = new Knight('black', 'g8');
      for (let i = 7, k = 1; i < 15; i++, k++) {
        const letter = xToLetter(`${k}`);
        this.enemyPieces[i] = new Pawn('white', `${letter}2`);
        this.yourPieces[i] = new Pawn('black', `${letter}7`);
      }
      this.enemyPieces[15] = new King('white', 'e1');
      this.yourPieces[15] = new King('black', 'e8');
    }
  }

  handleTurn() {
    if (this.isYourTurn === true) {
      this.player1.element
        .querySelector('.player_column__avatar')
        ?.classList.add('player_turn');
      this.player2.element
        .querySelector('.player_column__avatar')
        ?.classList.remove('player_turn');
      this.validateYourTurn();
    }
    if (this.isYourTurn === false) {
      this.yourPieces.forEach((piece) => {
        piece.element.onmousedown = null;
        piece.element.onmouseup = null;
      });
    }
  }

  validateYourTurn() {
    if (this.isCheck === true) {
      this.handleMate();
      if (this.isMate === false) {
        this.handleCheck();
      } else {
        this.timer.stopTimer();
      }
    } else {
      this.handleStaleMate();
      document
        .querySelectorAll('.valid')
        .forEach((el) => el.classList.remove('valid'));
      this.yourPieces.forEach((piece) => {
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
    if (piece.element.classList.contains('king')) {
      this.enemyPieces.forEach((el) => el.checkLegalMoves());
      piece.validateMove();
      if (this.KSideCastlingEnabled === true) this.handleKingSideCastling();
      if (this.QSideCastlingEnabled === true) { this.handleQueenSideCastling(); }
      piece.handleMove(event as MouseEvent);
      return;
    }
    piece.validateMove();
    if (piece.element.classList.contains('pawn')) {
      this.handleEnPassant(piece);
    }
    document.querySelectorAll('.valid').forEach((el) => {
      if (this.isYourTurn === true) {
        document
          .querySelectorAll('.attacked')
          .forEach((elem) => elem.classList.remove('attacked'));
        let currentState;
        if (
          (el as HTMLElement).dataset.piece === ''
          || (el as HTMLElement).dataset.piece === this.enemyColor
        ) {
          currentState = (el as HTMLElement).dataset.piece;
        }
        if (piece.element.parentElement) {
          (el as HTMLElement).dataset.piece = this.yourColor;
          piece.element.parentElement.dataset.piece = '';
          this.enemyPieces.forEach((enemyPiece) => {
            if (enemyPiece.element.parentElement === el) {
              return;
            }
            enemyPiece.checkLegalMoves();
          });
          (el as HTMLElement).dataset.piece = currentState;
          piece.element.parentElement.dataset.piece = this.yourColor;
        }
        if (
          this.yourPieces[15].element.parentElement?.classList.contains(
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
        if (this.isYourTurn === true) {
          if (
            piece.element.classList.contains('king')
            && (this.QSideCastlingEnabled || this.KSideCastlingEnabled)
          ) {
            if (this.yourColor === 'black') {
              if (piece.currentSquare === document.querySelector('#g8')) {
                document.querySelector('#h8')?.firstElementChild?.remove();
                (document.querySelector('#h8') as HTMLElement).dataset.piece = '';
                this.yourPieces[0] = new Rook('black', 'f8');
              }
              if (piece.currentSquare === document.querySelector('#c8')) {
                document.querySelector('#a8')?.firstElementChild?.remove();
                (document.querySelector('#a8') as HTMLElement).dataset.piece = '';
                this.yourPieces[1] = new Rook('black', 'd8');
              }
              this.QSideCastlingEnabled = false;
              this.KSideCastlingEnabled = false;
            }
            if (this.yourColor === 'white') {
              if (piece.currentSquare === document.querySelector('#g1')) {
                document.querySelector('#h1')?.firstElementChild?.remove();
                (document.querySelector('#h1') as HTMLElement).dataset.piece = '';
                this.yourPieces[0] = new Rook('white', 'f1');
              }
              if (piece.currentSquare === document.querySelector('#c1')) {
                document.querySelector('#a1')?.firstElementChild?.remove();
                (document.querySelector('#a1') as HTMLElement).dataset.piece = '';
                this.yourPieces[1] = new Rook('white', 'd1');
              }
              this.QSideCastlingEnabled = false;
              this.KSideCastlingEnabled = false;
            }
          }
          if (piece.element.classList.contains('rook')) {
            if (initialPlace?.id === 'h1') {
              this.KSideCastlingEnabled = false;
            }
            if (initialPlace?.id === 'a1') {
              this.QSideCastlingEnabled = false;
            }
            if (initialPlace?.id === 'h8') {
              this.KSideCastlingEnabled = false;
            }
            if (initialPlace?.id === 'a8') {
              this.QSideCastlingEnabled = false;
            }
          }
          if (this.isEnPassant === true) {
            const x = piece.currentSquare?.dataset.x;
            const y = piece.currentSquare?.dataset.y;
            let pawnSquare;
            if (x && y && this.yourColor === 'white') {
              pawnSquare = document.querySelector(
                `#${xToLetter(x)}${+y - 1}`,
              ) as HTMLElement;
            }
            if (x && y && this.yourColor === 'black') {
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
          if (
            piece.name === 'pawn'
            && (piece.currentSquare?.dataset.y === '8'
              || piece.currentSquare?.dataset.y === '1')
          ) {
            this.handlePromotion(piece, initialPlace as HTMLElement);
            return;
          }
          this.renderMove(piece, initialPlace as HTMLElement);
          this.lastMovedPiece = piece;
          this.createCheck();
          this.isYourTurn = false;
          this.handleTurn();
          this.socket.send(
            JSON.stringify(
              new OnlineMove(
                (initialPlace as HTMLElement).id,
                piece.name,
                (piece.currentSquare as HTMLElement).id,
                piece.name,
              ),
            ),
          );
          return;
        }
      }
      this.handleTurn();
    }, 10);
  }

  createCheck() {
    if (this.isYourTurn !== true) {
      for (const enemyPiece of this.enemyPieces) {
        document
          .querySelectorAll('.attacked')
          .forEach((square) => square.classList.remove('attacked'));
        enemyPiece.checkLegalMoves();
        if (
          this.yourPieces[15].element.parentElement?.classList.contains(
            'attacked',
          )
        ) {
          this.yourPieces[15].element.parentElement?.classList.add('checked');
          enemyPiece.element.parentElement?.classList.add('checked');
          this.isCheck = true;
        }
      }
    }

    if (this.isYourTurn === true) {
      for (const yourPiece of this.yourPieces) {
        document
          .querySelectorAll('.attacked')
          .forEach((square) => square.classList.remove('attacked'));
        yourPiece.checkLegalMoves();
        if (
          this.enemyPieces[15].element.parentElement?.classList.contains(
            'attacked',
          )
        ) {
          this.enemyPieces[15].element.parentElement?.classList.add('checked');
          yourPiece.element.parentElement?.classList.add('checked');
          this.isCheck = true;
        }
      }
    }
  }

  handleCheck() {
    document
      .querySelectorAll('.valid')
      .forEach((el) => el.classList.remove('valid'));
    if (this.isYourTurn === true) {
      this.enemyPieces.forEach((enemyPiece) => {
        enemyPiece.element.onmousedown = null;
        enemyPiece.element.onmouseup = null;
      });
      this.yourPieces.forEach((piece) => {
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
    if (this.isYourTurn === true) {
      this.enemyPieces.forEach((el) => {
        el.checkLegalMoves();
      });
    }
    piece.validateMove();
    if (piece.element.classList.contains('king')) {
      piece.handleMove(event as MouseEvent);
      return;
    }
    document.querySelectorAll('.valid').forEach((el) => {
      if (this.isYourTurn === true) {
        document
          .querySelectorAll('.attacked')
          .forEach((elem) => elem.classList.remove('attacked'));
        let currentState;
        if (
          (el as HTMLElement).dataset.piece === ''
          || (el as HTMLElement).dataset.piece === this.enemyColor
        ) {
          currentState = (el as HTMLElement).dataset.piece;
        }
        if (
          (el as HTMLElement).dataset.piece === this.enemyColor
          && (el as HTMLElement).classList.contains('checked')
          && document.querySelectorAll('.checked').length < 3
        ) {
          return;
        }
        (el as HTMLElement).dataset.piece = this.yourColor;
        this.enemyPieces.forEach((piece) => {
          piece.checkLegalMoves();
        });
        (el as HTMLElement).dataset.piece = currentState;
        if (
          this.yourPieces[15].element.parentElement?.classList.contains(
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
        if (this.isYourTurn === true) {
          document
            .querySelectorAll('.checked')
            .forEach((el) => el.classList.remove('checked'));
          if (this.isEnPassant === true) {
            const x = piece.currentSquare?.dataset.x;
            const y = piece.currentSquare?.dataset.y;
            let pawnSquare;
            if (x && y && this.yourColor === 'white') {
              pawnSquare = document.querySelector(
                `#${xToLetter(x)}${+y - 1}`,
              ) as HTMLElement;
            }
            if (x && y && this.yourColor === 'black') {
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
          this.handlePromotion(piece, initialPlace as HTMLElement);
          this.isCheck = false;
          this.createCheck();
          this.isYourTurn = false;
          this.socket.send(
            JSON.stringify(
              new OnlineMove(
                (initialPlace as HTMLElement).id,
                piece.name,
                (piece.currentSquare as HTMLElement).id,
                piece.name,
              ),
            ),
          );
          this.handleTurn();
          return;
        }
      }
      this.handleTurn();
    }, 1);
  }

  handleKingSideCastling() {
    if (this.isYourTurn === true && this.yourColor === 'white') {
      const f1 = document.querySelector('#f1');
      const g1 = document.querySelector('#g1');
      if (
        (g1 as HTMLElement).dataset.piece === ''
        && (f1 as HTMLElement).dataset.piece === ''
        && this.KSideCastlingEnabled === true
      ) {
        document.querySelectorAll('.attacked').forEach((el) => {
          el.classList.remove('attacked');
        });
        this.enemyPieces.forEach((el) => el.checkLegalMoves());
        if (
          g1?.classList.contains('attacked')
          || f1?.classList.contains('attacked')
        ) {
          return;
        }
        g1?.classList.add('valid');
      }
    }
    if (this.isYourTurn === true && this.yourColor === 'black') {
      const f8 = document.querySelector('#f8');
      const g8 = document.querySelector('#g8');
      if (
        (g8 as HTMLElement).dataset.piece === ''
        && (f8 as HTMLElement).dataset.piece === ''
        && this.KSideCastlingEnabled === true
      ) {
        document.querySelectorAll('.attacked').forEach((el) => {
          el.classList.remove('attacked');
        });
        this.enemyPieces.forEach((el) => el.checkLegalMoves());
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
    if (this.isYourTurn === true && this.yourColor === 'white') {
      const c1 = document.querySelector('#c1');
      const d1 = document.querySelector('#d1');
      const b1 = document.querySelector('#b1');
      if (
        (c1 as HTMLElement).dataset.piece === ''
        && (d1 as HTMLElement).dataset.piece === ''
        && (b1 as HTMLElement).dataset.piece === ''
        && this.QSideCastlingEnabled === true
      ) {
        document.querySelectorAll('.attacked').forEach((el) => {
          el.classList.remove('attacked');
        });
        this.enemyPieces.forEach((el) => el.checkLegalMoves());
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
    if (this.isYourTurn === true && this.yourColor === 'black') {
      const c8 = document.querySelector('#c8');
      const d8 = document.querySelector('#d8');
      const b8 = document.querySelector('#b8');
      if (
        (c8 as HTMLElement).dataset.piece === ''
        && (d8 as HTMLElement).dataset.piece === ''
        && (b8 as HTMLElement).dataset.piece === ''
        && this.QSideCastlingEnabled === true
      ) {
        document.querySelectorAll('.attacked').forEach((el) => {
          el.classList.remove('attacked');
        });
        this.enemyPieces.forEach((el) => el.checkLegalMoves());
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
    if (this.isYourTurn === true) {
      this.yourPieces.forEach((el) => {
        el.validateMove();
        document.querySelectorAll('.valid').forEach((el) => {
          document
            .querySelectorAll('.attacked')
            .forEach((elem) => elem.classList.remove('attacked'));
          let currentState;
          if (
            (el as HTMLElement).dataset.piece === ''
            || (el as HTMLElement).dataset.piece === this.enemyColor
          ) {
            currentState = (el as HTMLElement).dataset.piece;
          }
          if (
            (el as HTMLElement).dataset.piece === this.enemyColor
            && (el as HTMLElement).classList.contains('checked')
            && document.querySelectorAll('.checked').length < 3
          ) {
            return;
          }
          (el as HTMLElement).dataset.piece = this.yourColor;
          this.enemyPieces.forEach((piece) => {
            piece.checkLegalMoves();
          });
          (el as HTMLElement).dataset.piece = currentState;
          if (
            this.yourPieces[15].element.parentElement?.classList.contains(
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
      this.enemyPieces.forEach((el) => el.checkLegalMoves());
      this.yourPieces[15].validateMove();
      if (document.querySelectorAll('.valid').length === 0) {
        this.socket.send('mate');
        const popUp = new EndgamePopUp('You Lost');
        document.body.appendChild(popUp.element);
        this.socket.close();
        popUp.element
          .querySelector('.to-lobby')
          ?.addEventListener('click', () => {
            popUp.removePopUp();
            document.querySelector('.player_column')?.remove();
            document.querySelector('.player_column')?.remove();
            document.querySelector('.chessboard')?.remove();
            document.querySelector('.lobby')?.classList.remove('hidden');
            (document.querySelector('header') as HTMLElement).innerHTML = new Header().element.innerHTML;
            popUp.removePopUp();
          });
        this.isMate = true;
      }
    }
  }

  handleStaleMate() {
    if (this.isYourTurn === true) {
      this.yourPieces.forEach((el) => {
        if (el.element.classList.contains('king')) {
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
            || (el as HTMLElement).dataset.piece === this.enemyColor
          ) {
            currentState = (el as HTMLElement).dataset.piece;
          }
          (el as HTMLElement).dataset.piece = this.yourColor;
          this.enemyPieces.forEach((piece) => {
            piece.checkLegalMoves();
          });
          (el as HTMLElement).dataset.piece = currentState;
          if (
            this.yourPieces[15].element.parentElement?.classList.contains(
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
      this.enemyPieces.forEach((el) => el.checkLegalMoves());
      this.yourPieces[15].validateMove();
      if (document.querySelectorAll('.valid').length === 0) {
        this.isStaleMate = true;
      }
    }
  }

  handleEnPassant(piece: Pawn) {
    if (this.isYourTurn === true && this.yourColor === 'white') {
      const x = this.lastMovedEnemyPiece?.enemyPiece.parentElement?.dataset.x;
      const y = this.lastMovedEnemyPiece?.enemyPiece.parentElement?.dataset.y;
      if (
        x
        && y
        && piece.element.parentElement?.dataset.x
        && (+x === +piece.element.parentElement.dataset.x - 1
          || +x === +piece.element.parentElement.dataset.x + 1)
        && y === piece.element.parentElement.dataset.y
        && this.lastMovedEnemyPiece?.initialSquare.split('')[1] === '7'
        && y === '5'
        && this.lastMovedEnemyPiece?.enemyPiece.classList.contains('pawn_black')
      ) {
        document
          .querySelector(`#${xToLetter(x)}${+y + 1}`)
          ?.classList.add('valid');
        this.isEnPassant = true;
      }
    }

    if (this.isYourTurn === true && this.yourColor === 'black') {
      const x = this.lastMovedEnemyPiece?.enemyPiece.parentElement?.dataset.x;
      const y = this.lastMovedEnemyPiece?.enemyPiece.parentElement?.dataset.y;
      if (
        x
        && y
        && piece.element.parentElement?.dataset.x
        && (+x === +piece.element.parentElement.dataset.x - 1
          || +x === +piece.element.parentElement.dataset.x + 1)
        && y === piece.element.parentElement.dataset.y
        && this.lastMovedEnemyPiece?.initialSquare.split('')[1] === '2'
        && y === '4'
        && this.lastMovedEnemyPiece?.enemyPiece.classList.contains('pawn_white')
      ) {
        document
          .querySelector(`#${xToLetter(x)}${+y - 1}`)
          ?.classList.add('valid');
        this.isEnPassant = true;
      }
    }
  }

  handlePromotion(piece: Pawn, initialSquare: HTMLElement) {
    if (
      this.isYourTurn === true
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
                this.yourPieces.push(new Queen('white', square.id));
                this.socket.send(
                  JSON.stringify(
                    new OnlineMove(
                      initialSquare.id,
                      'pawn',
                      (piece.currentSquare as HTMLElement).id,
                      'queen',
                    ),
                  ),
                );
              } else if (
                (event.target as HTMLButtonElement).dataset.piece === 'rook'
              ) {
                this.yourPieces.push(new Rook('white', square.id));
                this.socket.send(
                  JSON.stringify(
                    new OnlineMove(
                      initialSquare.id,
                      'pawn',
                      (piece.currentSquare as HTMLElement).id,
                      'rook',
                    ),
                  ),
                );
              } else if (
                (event.target as HTMLButtonElement).dataset.piece === 'knight'
              ) {
                this.yourPieces.push(new Knight('white', square.id));
                this.socket.send(
                  JSON.stringify(
                    new OnlineMove(
                      initialSquare.id,
                      'pawn',
                      (piece.currentSquare as HTMLElement).id,
                      'knight',
                    ),
                  ),
                );
              } else if (
                (event.target as HTMLButtonElement).dataset.piece === 'bishop'
              ) {
                this.yourPieces.push(new Bishop('white', square.id));
                this.socket.send(
                  JSON.stringify(
                    new OnlineMove(
                      initialSquare.id,
                      'pawn',
                      (piece.currentSquare as HTMLElement).id,
                      'bishop',
                    ),
                  ),
                );
              }
            }
            this.isYourTurn = true;
            this.createCheck();
            this.isYourTurn = false;
            this.handleMate();
            popUp.removePopUp();
          });
        });
    }
    if (
      this.isYourTurn === true
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
                this.yourPieces.push(new Queen('black', square.id));
                this.socket.send(
                  JSON.stringify(
                    new OnlineMove(
                      initialSquare.id,
                      'pawn',
                      (piece.currentSquare as HTMLElement).id,
                      'queen',
                    ),
                  ),
                );
              } else if (
                (event.target as HTMLButtonElement).dataset.piece === 'rook'
              ) {
                this.yourPieces.push(new Rook('black', square.id));
                this.socket.send(
                  JSON.stringify(
                    new OnlineMove(
                      initialSquare.id,
                      'pawn',
                      (piece.currentSquare as HTMLElement).id,
                      'rook',
                    ),
                  ),
                );
              } else if (
                (event.target as HTMLButtonElement).dataset.piece === 'knight'
              ) {
                this.yourPieces.push(new Knight('black', square.id));
                this.socket.send(
                  JSON.stringify(
                    new OnlineMove(
                      initialSquare.id,
                      'pawn',
                      (piece.currentSquare as HTMLElement).id,
                      'knight',
                    ),
                  ),
                );
              } else if (
                (event.target as HTMLButtonElement).dataset.piece === 'bishop'
              ) {
                this.yourPieces.push(new Bishop('black', square.id));
                this.socket.send(
                  JSON.stringify(
                    new OnlineMove(
                      initialSquare.id,
                      'pawn',
                      (piece.currentSquare as HTMLElement).id,
                      'bishop',
                    ),
                  ),
                );
              }
            }
            this.isYourTurn = false;
            this.createCheck();
            this.isYourTurn = true;
            this.handleMate();
            popUp.removePopUp();
          });
        });
    }
  }

  renderEnemyMove(piece: string, initialSquare: string, finalSquare: string) {
    if (piece === 'rook') {
      this.player2.createMove(
        'R',
        initialSquare,
        finalSquare,
        this.timer.element.innerText,
      );
    }
    if (piece === 'queen') {
      this.player2.createMove(
        'Q',
        initialSquare,
        finalSquare,
        this.timer.element.innerText,
      );
    }
    if (piece === 'pawn') {
      this.player2.createMove(
        '',
        initialSquare,
        finalSquare,
        this.timer.element.innerText,
      );
    }
    if (piece === 'king') {
      this.player2.createMove(
        'K',
        initialSquare,
        finalSquare,
        this.timer.element.innerText,
      );
    }
    if (piece === 'knight') {
      this.player2.createMove(
        'N',
        initialSquare,
        finalSquare,
        this.timer.element.innerText,
      );
    }
    if (piece === 'bishop') {
      this.player2.createMove(
        'B',
        initialSquare,
        finalSquare,
        this.timer.element.innerText,
      );
    }
  }

  renderMove(
    piece: Rook | Pawn | Bishop | Knight | King | Queen,
    initialPlace: HTMLElement,
  ) {
    if (this.isYourTurn === true) {
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
    }
  }
}
