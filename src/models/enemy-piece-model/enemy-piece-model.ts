export class EnemyPiece {
    enemyPiece: HTMLElement;

    initialSquare: string;

    constructor(enemyPiece:HTMLElement, initialSquare:string) {
      this.enemyPiece = enemyPiece;
      this.initialSquare = initialSquare;
    }
}
