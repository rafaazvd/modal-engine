import jwt from 'jsonwebtoken'
import { compare} from 'bcrypt'
import { PersonDoesNotExist } from './errors/PersonDoesNotExist'
import { InvalidEntryError } from '../createPerson/errors/InvalidEntryError'
import { IPersonRepository } from '@modules/Person/repositories/IPersonRepository'
import { PasswordDoesNotMatch } from './errors/PasswordDoesNotMatch'
import isValidEmail from '../createPerson/utils/isValidEmail'

type AuthPersonEntry = {
  email: string
  password: string
}

type AuthPersonReturn = InvalidEntryError | any | null

export class AuthPerson {
  constructor(private readonly personRepository: IPersonRepository) {}

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

    const personExists = await this.personRepository.findOneByEmail(email)

    if (!personExists) {
      return new PersonDoesNotExist(email)
    }
    const passwordsMatch = await compare(password, personExists.password)

    if (!passwordsMatch) {
      return new PasswordDoesNotMatch()
    }

    const userJwt = jwt.sign(
      {
        id: personExists.id,
        email: personExists.email,
      },
      process.env.JWT_KEY!
    )

    return {
      id: personExists.id,
      name: personExists.name,
      cpf: personExists.cpf,
      birthDate: personExists.birthDate,
      email: personExists.email,
      createdAt: personExists.createdAt,
      documentMedia: personExists?.documentMedia,
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
