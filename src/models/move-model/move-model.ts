export class OnlineMove {
  constructor(
    public initialSquare: string,
    public finalSquare: string,
    public isBroadcast = true
  ) {}
}
