class Wallet {
  constructor() {
    this.balance = 0;
    this.unspents = [];
  }

  balance() {
    return this.balance;
  }

  updateBalance(amt) {
    this.balance = this.balance + amt;
    return Number(this.balance);
  }

  getUnspents() {
      return this.unspents;
  }

  addUnspent(txid) {
      this.unspents.push(txid);
      return this.unspents;
  }
}