import { BaseComponent } from "./components/base-component";
import { Game } from "./components/game/game";
import { Header } from "./components/header/header";
import { Lobby } from "./components/lobby/lobby";
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
    document.getElementById("friend")?.addEventListener("click", () => {
      this.startGame();
    });
  }

  startGame() {
    this.element.innerHTML = "";
    (document.querySelector(".page-name") as HTMLSpanElement).innerText =
      "vs Friend";
    new Game();
  }
}
