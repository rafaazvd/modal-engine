export class PersonAlreadyHasAnAccount extends Error {
  constructor() {
    super('the person already has an account')
    this.name = 'PersonAlreadyHasAnAccount'
  }
}
