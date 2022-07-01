import { hash } from 'bcrypt'
import { InvalidEntryError } from './errors/InvalidEntryError'
import { IPerson } from '@modules/Person/dataModels/IPerson'
import { IPersonRepository } from '@modules/Person/repositories/IPersonRepository'
import { PersonCpfAlreadyExists } from './errors/PersonCpfAlreadyExists'
import { PersonEmailAlreadyExists } from './errors/PersonEmailAlreadyExists'
import isValidEmail from './utils/isValidEmail'
import isValidCPF from './utils/isValidCPF'

type CreatePersonEntry = {
  name: string
  cpf: string
  email: string
  birthDate: string
  files?: any
  password: string
}

type CreatePersonReturn = PersonCpfAlreadyExists | InvalidEntryError | PersonEmailAlreadyExists | IPerson

export class CreatePerson {
  constructor(private readonly personRepository: IPersonRepository) {}

  async run({
    name,
    cpf,
    email,
    birthDate,
    password,
  }: CreatePersonEntry): Promise<CreatePersonReturn> {
    const invalidEntry = this.validate({
      name,
      cpf,
      email,
      birthDate,
      password,
    })

    if (invalidEntry) {
      return new InvalidEntryError(invalidEntry)
    }

    const personExists = await this.personRepository.findOneByEmail(email)

    if (personExists) {
      return new PersonEmailAlreadyExists(email)
    }

    const passwordHashed = await hash(password, 10)
    console.log({
      name: name.trim(),
      cpf: cpf.trim(),
      email: email.trim(),
      birthDate: birthDate.trim(),
      password: passwordHashed,
    })
    const person = await this.personRepository.save({
      name: name.trim(),
      cpf: cpf.trim(),
      email: email.trim(),
      birthDate: birthDate.trim(),
      password: passwordHashed,
    })

    console.log({person})

    return person
  }

  private validate({
    name,
    cpf,
    email,
    birthDate,
    password,
  }: CreatePersonEntry): string | null {
    if (
      !name ||
      typeof name !== 'string' ||
      name.trim().length < 1 ||
      name.trim().length > 200
    ) {
      return '"name" is a non-empty required string of up to 200 characters'
    }

    if (
      !birthDate ||
      typeof birthDate !== 'string' ||
      birthDate.trim().length < 1
    ) {
      return '"birthDate" is a non-empty required string'
    }

    if (email === undefined || !isValidEmail(email)) {
      throw new InvalidEntryError(
        '"email" is a non-empty required string of a valid e-mail'
      )
    }

    if (
      !password ||
      typeof password !== 'string' ||
      password.trim().length < 8
    ) {
      return '"password" is a non-empty required string with at least 8 characters'
    }

    if (cpf) {
      if (!isValidCPF(cpf)) {
        throw new InvalidEntryError(
          '"cpf" is a non-empty string with a valid cpf with only numbers'
        )
      }
    }


    return null
  }
}
