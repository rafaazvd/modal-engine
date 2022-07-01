export class InsufficientFunds extends Error {
  constructor() {
    super('insufficient funds')
    this.name = 'InsufficientFunds'
  }
}
