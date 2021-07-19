export class OnlineMove {
  constructor(
    public initialSquare: string,
    public initialPiece: string,
    public finalSquare: string,
    public finalPiece: string,
    public isBroadcast = true,
  ) {
    this.initialPiece = initialPiece;
    this.initialSquare = initialSquare;
    this.finalPiece = finalPiece;
    this.finalSquare = finalSquare;
    this.isBroadcast = isBroadcast;
  }
}
