export function createMessage(initialSquare: string,  finalSquare:string,isBroadcast = false,): string {
     return JSON.stringify(new Move(initialSquare, finalSquare,isBroadcast));
}

export class Move {
    constructor(
        public initialSquare: string,
        public finalSquare: string,
        public isBroadcast = false
    ) { }
}

export const getRandomColor = () => {
    const colors = ['white', 'black']
   const x = (Math.floor(Math.random() * 2));
   return colors[x];
}