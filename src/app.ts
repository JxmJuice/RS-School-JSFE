import { BaseComponent } from "./components/base-component";
import { EndgamePopUp } from "./components/endgamePopUp/endgamePopUp";
import { Game } from "./components/game/game";
import { Header } from "./components/header/header";
import { Lobby } from "./components/lobby/lobby";
import { OnlineGame } from "./components/online-game/online-game";
import { storage } from "./components/storage/storage";
import { Timer } from "./components/timer/timer";

export class App extends BaseComponent {
  game: Game | null;

  onlineGame: OnlineGame | null;

  lobby: Lobby;

  header: Header;

  constructor() {
    super("main", ["main"]);
    this.game = null;
    this.onlineGame = null;
    this.lobby = new Lobby();
    this.header = new Header();
    document.body.appendChild(this.header.element);
    this.element.appendChild(this.lobby.element);
    document.body.appendChild(this.element);
    document.getElementById("friend")?.addEventListener("click", () => {
      this.startGame();
    });
    document.getElementById("online")?.addEventListener("click", () => {
      this.startOnlineGame();
    });
    document.querySelectorAll(".player_name__button").forEach((el) => {
      el.addEventListener("click", () => {
        this.handleName();
      });
    });
  }

  startGame() {
    document.querySelector(".lobby")?.classList.add("hidden");
    (document.querySelector(".page-name") as HTMLSpanElement).innerText =
      "vs Friend";
    this.game = new Game(storage.player1Name, storage.player2Name);
    this.handleResign();
    this.handleDraw();
    this.mateToLobby();
    this.staleMateToLobby();
  }

  startOnlineGame() {
    document.querySelector(".lobby")?.classList.add("hidden");
    (document.querySelector(".page-name") as HTMLSpanElement).innerText =
      "Online";
    this.onlineGame = new OnlineGame(storage.player1Name);
    // this.handleResign();
    // this.handleDraw();
    // this.mateToLobby();
    // this.staleMateToLobby();
  }

  handleResign() {
    document.getElementById("resign_white")?.addEventListener("click", () => {
      const popUp = new EndgamePopUp("Black Won");
      document.body.appendChild(popUp.element);
      popUp.element
        .querySelector(".to-lobby")
        ?.addEventListener("click", () => {
          popUp.removePopUp();
          document.querySelector(".player_column")?.remove();
          document.querySelector(".player_column")?.remove();
          document.querySelector(".chessboard")?.remove();
          document.querySelector(".lobby")?.classList.remove("hidden");
          this.header = new Header();
          (document.querySelector("header") as HTMLElement).innerHTML =
            this.header.element.innerHTML;
        });
    });
    document.getElementById("resign_black")?.addEventListener("click", () => {
      const popUp = new EndgamePopUp("White Won");
      document.body.appendChild(popUp.element);
      popUp.element
        .querySelector(".to-lobby")
        ?.addEventListener("click", () => {
          popUp.removePopUp();
          this.header = new Header();
          document.querySelector(".player_column")?.remove();
          document.querySelector(".player_column")?.remove();
          document.querySelector(".chessboard")?.remove();
          document.querySelector(".lobby")?.classList.remove("hidden");
          (document.querySelector("header") as HTMLElement).innerHTML =
            this.header.element.innerHTML;
        });
    });
  }

  handleDraw() {
    const drawBlack = document.getElementById(
      "draw_black"
    ) as HTMLButtonElement;
    const drawWhite = document.getElementById(
      "draw_white"
    ) as HTMLButtonElement;

    drawBlack?.addEventListener("click", () => {
      drawBlack.classList.add("draw_offered");
      drawWhite.classList.add("draw_accept");
      drawBlack.disabled = true;
      setTimeout(() => {
        drawBlack.classList.remove("draw_offered");
        drawWhite.classList.remove("draw_accept");
        drawBlack.disabled = false;
        drawWhite.onclick = null;
      }, 10000);
      drawWhite.onclick = () => this.acceptDraw();
    });

    drawWhite?.addEventListener("click", () => {
      drawWhite.classList.add("draw_offered");
      drawBlack.classList.add("draw_accept");
      drawWhite.disabled = true;
      setTimeout(() => {
        drawWhite.classList.remove("draw_offered");
        drawBlack.classList.remove("draw_accept");
        drawBlack.onclick = null;
        drawWhite.disabled = false;
      }, 10000);
      drawBlack.onclick = () => this.acceptDraw();
    });
  }

  acceptDraw() {
    const popUp = new EndgamePopUp("Draw");
    document.body.appendChild(popUp.element);
    popUp.element.querySelector(".to-lobby")?.addEventListener("click", () => {
      popUp.removePopUp();
      document.querySelector(".player_column")?.remove();
      document.querySelector(".player_column")?.remove();
      document.querySelector(".chessboard")?.remove();
      document.querySelector(".lobby")?.classList.remove("hidden");
      this.header = new Header();
      (document.querySelector("header") as HTMLElement).innerHTML =
        this.header.element.innerHTML;
    });
  }

  handleName() {
    this.lobby.renderLobby();
    document.querySelectorAll(".player_name__button").forEach((el) => {
      el.addEventListener("click", () => {
        this.handleName();
      });
    });
    document.getElementById("friend")?.addEventListener("click", () => {
      this.startGame();
    });
    document.getElementById("online")?.addEventListener("click", () => {
      this.startOnlineGame();
    });
  }

  mateToLobby() {
    document.addEventListener("mouseup", () => {
      setTimeout(() => {
        if (this.game?.isMate == true && this.game.isWhiteTurn == true) {
          const popUp = new EndgamePopUp("Black Won");
          document.body.appendChild(popUp.element);
          popUp.element
            .querySelector(".to-lobby")
            ?.addEventListener("click", () => {
              popUp.removePopUp();
              document.querySelector(".player_column")?.remove();
              document.querySelector(".player_column")?.remove();
              document.querySelector(".chessboard")?.remove();
              document.querySelector(".lobby")?.classList.remove("hidden");
              this.header = new Header();
              (document.querySelector("header") as HTMLElement).innerHTML =
                this.header.element.innerHTML;
            });
          this.game.isMate = false;
        }
        if (this.game?.isMate == true && this.game.isWhiteTurn != true) {
          const popUp = new EndgamePopUp("White Won");
          document.body.appendChild(popUp.element);
          popUp.element
            .querySelector(".to-lobby")
            ?.addEventListener("click", () => {
              popUp.removePopUp();
              document.querySelector(".player_column")?.remove();
              document.querySelector(".player_column")?.remove();
              document.querySelector(".chessboard")?.remove();
              document.querySelector(".lobby")?.classList.remove("hidden");
              this.header = new Header();
              (document.querySelector("header") as HTMLElement).innerHTML =
                this.header.element.innerHTML;
            });
          this.game.isStaleMate = false;
        }
      }, 1000);
    });
  }

  staleMateToLobby() {
    document.addEventListener("mouseup", () => {
      setTimeout(() => {
        if (this.game?.isStaleMate == true) {
          const popUp = new EndgamePopUp("Draw");
          document.body.appendChild(popUp.element);
          popUp.element
            .querySelector(".to-lobby")
            ?.addEventListener("click", () => {
              popUp.removePopUp();
              document.querySelector(".player_column")?.remove();
              document.querySelector(".player_column")?.remove();
              document.querySelector(".chessboard")?.remove();
              document.querySelector(".lobby")?.classList.remove("hidden");
              this.header = new Header();
              (document.querySelector("header") as HTMLElement).innerHTML =
                this.header.element.innerHTML;
            });
          this.game.isStaleMate = false;
        }
      }, 1000);
    });
  }
}
