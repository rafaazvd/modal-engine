export class AccountDoesNotExist extends Error {
  constructor() {
    super(`The account does not exist`)
    this.name = 'AccountDoesNotExist'
  }
}
