export class PersonDoesNotExist extends Error {
  constructor(id: string) {
    super(`The person does not exist`)
    this.name = 'PersonDoesNotExist'
  }
}
