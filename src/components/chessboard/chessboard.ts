import { BaseComponent } from "../base-component";
import { chessBoardHTML } from "../constants";
import './chessboard.scss'

export class ChessBoard extends BaseComponent {
    constructor() {
        super('div',['chessboard']);
        this.element.innerHTML = chessBoardHTML;
    }
}