import { BaseComponent } from "./components/base-component";
import { EndgamePopUp } from "./components/endgamePopUp/endgamePopUp";
import { Game } from "./components/game/game";
import { Header } from "./components/header/header";
import { Lobby } from "./components/lobby/lobby";
import { storage } from "./components/storage/storage";
import { Timer } from "./components/timer/timer";

export class App extends BaseComponent {
  //game: Game;

  lobby: Lobby;

  header: Header;

  constructor() {
    super("main", ["main"]);
    this.lobby = new Lobby();
    this.header = new Header();
    //this.game = new Game();
    document.body.appendChild(this.header.element);
    this.element.appendChild(this.lobby.element);
    document.body.appendChild(this.element);
    console.log(document.querySelector("#friend"));
    this.element
      .querySelector("#player1_name")
      ?.addEventListener("change", () => {
        storage.player1Name = (
          this.element.querySelector("#player1_name") as HTMLInputElement
        ).value;
        this.lobby.renderLobby();
        this.startGame();
      });
    this.element
      .querySelector("#player2_name")
      ?.addEventListener("change", () => {
        storage.player2Name = (
          this.element.querySelector("#player2_name") as HTMLInputElement
        ).value;
        this.lobby.renderLobby();
        this.startGame();
      });
    document.getElementById("friend")?.addEventListener("click", () => {
      this.startGame();
    });
  }

  startGame() {
    this.element.innerHTML = "";
    (document.querySelector(".page-name") as HTMLSpanElement).innerText =
      "vs Friend";
    new Game(storage.player1Name, storage.player2Name);
    this.handleResign();
    this.handleDraw();
  }

  handleResign() {
    document.getElementById("resign_white")?.addEventListener("click", () => {
      const popUp = new EndgamePopUp("Black Won");
      document.body.appendChild(popUp.element);
      popUp.element
        .querySelector(".to-lobby")
        ?.addEventListener("click", () => {
          popUp.removePopUp();
          (document.querySelector("main") as HTMLElement).innerHTML = "";
          this.lobby = new Lobby();
          this.header = new Header();
          (document.querySelector("main") as HTMLElement).appendChild(
            this.lobby.element
          );
          document.getElementById("friend")?.addEventListener("click", () => {
            this.startGame();
          });
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
          (document.querySelector("main") as HTMLElement).innerHTML = "";
          this.lobby = new Lobby();
          this.header = new Header();
          (document.querySelector("main") as HTMLElement).appendChild(
            this.lobby.element
          );
          document.getElementById("friend")?.addEventListener("click", () => {
            this.startGame();
          });
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
      (document.querySelector("main") as HTMLElement).innerHTML = "";
      this.lobby = new Lobby();
      this.header = new Header();
      (document.querySelector("main") as HTMLElement).appendChild(
        this.lobby.element
      );
      document.getElementById("friend")?.addEventListener("click", () => {
        this.startGame();
      });
      (document.querySelector("header") as HTMLElement).innerHTML =
        this.header.element.innerHTML;
    });
  }
}
