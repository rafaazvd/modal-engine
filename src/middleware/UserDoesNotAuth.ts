export default class UserDoesNotAuth extends Error {
  constructor() {
    super('Usuário nao autenticado')
    this.name = 'UserDoesNotAuth'
  }
}
