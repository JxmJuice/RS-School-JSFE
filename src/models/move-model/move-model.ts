export class OnlineMove {
  constructor(
    public initialSquare: string,
    public initialPiece: string,
    public finalSquare: string,
    public finalPiece: string,
    public isBroadcast = true
  ) {}
}
