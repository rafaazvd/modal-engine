export class PersonCpfAlreadyExists extends Error {
  constructor(cpfCnpj: string) {
    super(`The cpf/Cnpj ${cpfCnpj} already exists`)
    this.name = 'PersonCpfAlreadyExists'
  }
}
