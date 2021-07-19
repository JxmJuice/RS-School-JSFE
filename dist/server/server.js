"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const constants_1 = require("./constants");
const gameHandler_1 = require("./gameHandler");
const app = express();
const users = [];
// initialize a simple http server
const server = http.createServer(app);
// initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });
wss.on('connection', (ws) => {
    const extWs = ws;
    extWs.isInGame = false;
    extWs.isAlive = true;
    users.push(extWs);
    for (const user of users) {
        if (user.isInGame === false && user !== extWs) {
            user.isInGame = true;
            extWs.isInGame = true;
            user.send('connected');
            extWs.send('connected');
            const player1Color = constants_1.getRandomColor();
            let player2Color;
            if (player1Color === 'white') {
                player2Color = 'black';
            }
            if (player1Color === 'black') {
                player2Color = 'white';
            }
            console.log(player1Color);
            console.log(player2Color);
            user.send(player1Color);
            extWs.send(player2Color);
            new gameHandler_1.GameHandler(extWs, user);
            return;
        }
    }
    extWs.send('loading');
    extWs.on('close', () => {
        users.pop();
    });
    ws.on('pong', () => {
        extWs.isAlive = true;
    });
    ws.on('error', (err) => {
        console.warn(`Client disconnected - reason: ${err}`);
    });
});
server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${server.address().port}`);
});
//# sourceMappingURL=server.js.map