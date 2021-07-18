import { ExtWebSocket } from "./server";

export class GameHandler {
    player1:ExtWebSocket;
    player2:ExtWebSocket

    constructor(player1:ExtWebSocket, player2:ExtWebSocket){
        this.player1 = player1;
        this.player2 = player2;
        this.handleMoves(this.player1, this.player2)
    }

    handleMoves(player1: ExtWebSocket, player2: ExtWebSocket){
        player1.on('close',()=>{
            this.player2.send('disconnected');
        })
         player1.on('message', (msg: string) => {
             this.player2.send(msg)

    });

    player2.on('close',()=>{
        this.player1.send('disconnected');
    })
    player2.on('message', (msg: string) => {
             this.player1.send(msg)
    });
    }
}