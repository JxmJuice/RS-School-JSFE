"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomColor = exports.createMessage = exports.Move = void 0;
class Move {
    constructor(initialSquare, finalSquare, isBroadcast = false) {
        this.initialSquare = initialSquare;
        this.finalSquare = finalSquare;
        this.isBroadcast = isBroadcast;
        this.initialSquare = initialSquare;
        this.finalSquare = finalSquare;
        this.isBroadcast = isBroadcast;
    }
}
exports.Move = Move;
function createMessage(initialSquare, finalSquare, isBroadcast = false) {
    return JSON.stringify(new Move(initialSquare, finalSquare, isBroadcast));
}
exports.createMessage = createMessage;
const getRandomColor = () => {
    const colors = ['white', 'black'];
    const x = Math.floor(Math.random() * 2);
    return colors[x];
};
exports.getRandomColor = getRandomColor;
//# sourceMappingURL=constants.js.map