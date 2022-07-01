export class OriginAccountDoesNotExist extends Error {
  constructor() {
    super('Origin account does not exist')
    this.name = 'OriginAccountDoesNotExist'
  }
}
