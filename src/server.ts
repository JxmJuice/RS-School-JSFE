import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import { getRandomColor } from './constants';
import { GameHandler } from './gameHandler';

export interface ExtWebSocket extends WebSocket {
    isAlive: boolean;
    isInGame: boolean;
}

const app = express();

let users = <ExtWebSocket[]>[];

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws: WebSocket) => {

    const extWs = ws as ExtWebSocket;
    extWs.isInGame = false;
    extWs.isAlive = true;
    users.push(extWs);
    for(let user of users){
        if(user.isInGame == false && user != extWs){
            user.isInGame = true;
            extWs.isInGame = true;
            user.send('connected');
            extWs.send('connected');
            const player1Color = getRandomColor();
            let player2Color;
            if(player1Color == 'white'){
                player2Color = 'black';
            }
            if (player1Color == 'black'){
                player2Color = 'white'; 
            }
            console.log(player1Color);
            console.log(player2Color);
            user.send(player1Color);
            extWs.send(player2Color);
            new GameHandler(extWs, user); 
        return;
        }
    }
    extWs.send('loading');
    extWs.on('close',()=>{
        users.pop();
    }) 

    ws.on('pong', () => {
        extWs.isAlive = true;
    });

    ws.on('error', (err) => {
        console.warn(`Client disconnected - reason: ${err}`);
    })
});

server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${(server.address() as WebSocket.AddressInfo).port}`);
});