export class PasswordDoesNotMatch extends Error {
  constructor() {
    super(`The password does not match`)
    this.name = 'PasswordDoesNotMatch'
  }
}
