import { hash } from 'bcrypt'
import { InvalidEntryError } from './errors/InvalidEntryError'
import { IAccount } from '@modules/Account/dataModels/IAccount'
import { IAccountRepository } from '@modules/Account/repositories/IAccountRepository'
import { IPersonRepository } from '@modules/Person/repositories/IPersonRepository'
import { PersonAlreadyHasAnAccount } from './errors/PersonAlreadyHasAnAccount'
import { PersonDoesNotExist } from './errors/PersonDoesNotExist'
import isValidEmail from './utils/isValidEmail'

type CreateAccountEntry = {
  personId: string
  email: string
  password: string
  balance?: number
}

type CreateAccountReturn = PersonAlreadyHasAnAccount | InvalidEntryError | IAccount

export class CreateAccount {
  constructor(
    private readonly accountRepository: IAccountRepository,
    private readonly personRepository: IPersonRepository,
    ) {}

  async run({
    email,
    password,
    balance,
    personId,
  }: CreateAccountEntry): Promise<CreateAccountReturn> {
    const invalidEntry = this.validate({
      email,
      password,
      balance,
      personId,
    })

    if (invalidEntry) {
      return new InvalidEntryError(invalidEntry)
    }

    const personExists = await this.personRepository.findOneById(personId)
    if (!personExists) {
      return new PersonDoesNotExist(personId)
    }
    const accountExists = await this.accountRepository.findByPersonId(personId)
    const accountEmailExists = await this.accountRepository.findOneByEmail(email)
    if (accountEmailExists) {
      return new PersonAlreadyHasAnAccount()
    }
    if (accountExists) {
      return new PersonAlreadyHasAnAccount()
    }

    const passwordHashed = await hash(password, 10)

    const account = await this.accountRepository.save({
      personId,
      balance,
      email: email.trim(),
      password: passwordHashed,
    })

    return account
  }

  private validate({
    email,
    password,
    balance,
    personId,
  }: CreateAccountEntry): string | null {
    if (email === undefined || !isValidEmail(email)) {
      throw new InvalidEntryError(
        '"email" is a non-empty required string of a valid e-mail'
      )
    }

    if (!personId || typeof personId !== 'string') {
      return '"personId" is a non-empty required string'
    }

    if (
      !password ||
      typeof password !== 'string' ||
      password.trim().length < 8
    ) {
      return '"password" is a non-empty required string with at least 8 characters'
    }

    if (
      balance &&
      (typeof balance !== 'number' ||
      balance < 0)
    ) {
      return '"balance" is a non-empty number positive'
    }

    return null
  }
}
