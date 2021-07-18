"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameHandler = void 0;
class GameHandler {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.handleMoves(this.player1, this.player2);
    }
    handleMoves(player1, player2) {
        player1.on('close', () => {
            this.player2.send('disconnected');
        });
        player1.on('message', (msg) => {
            this.player2.send(msg);
        });
        player2.on('close', () => {
            this.player1.send('disconnected');
        });
        player2.on('message', (msg) => {
            this.player1.send(msg);
        });
    }
}
exports.GameHandler = GameHandler;
//# sourceMappingURL=gameHandler.js.map