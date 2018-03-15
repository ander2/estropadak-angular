export class EstropadakNavegationService {
  private _estropadak: string[]
  set estropadak(value: string[]) {
    this._estropadak = value;
  }
  get estropadak() {
    return this._estropadak;
  }

  next(estropadaId): string {
    const ind = this.estropadak.findIndex(e => e === estropadaId);
    if (ind !== this.estropadak.length) {
      return this.estropadak[ind + 1];
    } else {
      return this.estropadak[ind];
    }
  }

  prev(estropadaId): string {
    const ind = this.estropadak.findIndex(e => e === estropadaId);
    if (ind !== 0) {
      return this.estropadak[ind - 1];
    } else {
      return this.estropadak[ind];
    }
  }

}
