import { hash } from 'bcrypt'
import { InvalidEntryError } from './errors/InvalidEntryError'
import { IAccount } from '@modules/Account/dataModels/IAccount'
import { IAccountRepository } from '@modules/Account/repositories/IAccountRepository'
import { PersonAlreadyHasAnAccount } from './errors/PersonAlreadyHasAnAccount'
import isValidEmail from './utils/isValidEmail'
import { validateUUID } from './errors/validateUUID'

type CreateAccountEntry = {
  personId: string
  email: string
  password: string
  balance: number
}

type CreateAccountReturn = PersonAlreadyHasAnAccount | InvalidEntryError | IAccount

export class CreateAccount {
  constructor(private readonly accountRepository: IAccountRepository) {}

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

    const accountExists = await this.accountRepository.findByPersonId(personId)

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

    if (!personId || !validateUUID(personId)) {
      return '"personId" is a non-empty required string uuid'
    }

    if (
      !password ||
      typeof password !== 'string' ||
      password.trim().length < 8
    ) {
      return '"password" is a non-empty required string with at least 8 characters'
    }

    if (
      !balance ||
      typeof balance !== 'number' ||
      balance < 0
    ) {
      return '"balance" is a non-empty required number positive'
    }

    return null
  }
}
