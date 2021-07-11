"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Move = void 0;
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const app = express();
//initialize a simple http server
const server = http.createServer(app);
//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });
// function createMessage(initialSquare: string, isBroadcast = false, finalSquare:string): string {
//     return JSON.stringify(new Move(initialSquare, isBroadcast, finalSquare));
// }
class Move {
    constructor(initialSquare, isBroadcast = false, finalSquare) {
        this.initialSquare = initialSquare;
        this.isBroadcast = isBroadcast;
        this.finalSquare = finalSquare;
    }
}
exports.Move = Move;
wss.on('connection', (ws) => {
    const extWs = ws;
    extWs.isAlive = true;
    ws.on('pong', () => {
        extWs.isAlive = true;
    });
    //connection is up, let's add a simple simple event
    ws.on('message', (msg) => {
        const message = JSON.parse(msg);
        setTimeout(() => {
            if (message.isBroadcast) {
                //send back the message to the other clients
                wss.clients
                    .forEach(client => {
                    if (client != ws) {
                        client.send(msg);
                    }
                });
            }
            ws.send(msg);
        }, 1000);
    });
    //send immediatly a feedback to the incoming connection    
    ws.send('Connected to server');
    ws.on('error', (err) => {
        console.warn(`Client disconnected - reason: ${err}`);
    });
});
setInterval(() => {
    wss.clients.forEach((ws) => {
        const extWs = ws;
        if (!extWs.isAlive)
            return ws.terminate();
        extWs.isAlive = false;
        ws.ping(null, undefined);
    });
}, 10000);
//start our server
server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});
//# sourceMappingURL=server.js.map