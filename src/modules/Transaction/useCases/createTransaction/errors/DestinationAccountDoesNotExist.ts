export class DestinationAccountDoesNotExist extends Error {
  constructor() {
    super('destination account does not exist')
    this.name = 'DestinationAccountDoesNotExist'
  }
}
