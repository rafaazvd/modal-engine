export class PersonEmailAlreadyExists extends Error {
  constructor(email: string) {
    super(`The email ${email} already exists`)
    this.name = 'PersonEmailAlreadyExists'
  }
}
