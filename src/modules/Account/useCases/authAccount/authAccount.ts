import jwt from 'jsonwebtoken'
import { compare} from 'bcrypt'
import { PersonDoesNotExist } from './errors/PersonDoesNotExist'
import { InvalidEntryError } from '../createAccount/errors/InvalidEntryError'
import { IAccountRepository } from '@modules/Account/repositories/IAccountRepository'
import { PasswordDoesNotMatch } from './errors/PasswordDoesNotMatch'
import isValidEmail from '../createAccount/utils/isValidEmail'

type AuthPersonEntry = {
  email: string
  password: string
}

type AuthPersonReturn = InvalidEntryError | any | null

export class AuthAccount {
  constructor(private readonly accountRepository: IAccountRepository) {}

  async run({
    email,
    password,
  }: AuthPersonEntry): Promise<AuthPersonReturn> {
    const invalidEntry = this.validate({
      email,
      password,
    })

    if (invalidEntry) {
      return new InvalidEntryError(invalidEntry)
    }

    const personExists = await this.accountRepository.findOneByEmail(email)

    if (!personExists) {
      return new PersonDoesNotExist(email)
    }
    const passwordsMatch = await compare(password, personExists.password)

    if (!passwordsMatch) {
      return new PasswordDoesNotMatch()
    }

    const userJwt = jwt.sign(
      {
        email: personExists.email,
      },
      process.env.JWT_KEY!
    )

    delete personExists.password

    return {
      ...personExists,
      accessToken: userJwt,
    }
  }

  private validate({
    email,
    password,
  }: AuthPersonEntry): string | null {

    if (!email && !isValidEmail(email)) {
      throw new InvalidEntryError(
        '"email" is a non-empty required string of a valid e-mail'
      )
    }

    if (
      !password &&
      (typeof password !== 'string' ||
      password.trim().length < 8)
    ) {
      return '"password" is a non-empty required string with at least 8 characters'
    }


    return null
  }
}
