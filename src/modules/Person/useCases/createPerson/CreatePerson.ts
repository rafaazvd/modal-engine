import { hash } from 'bcrypt'
import { InvalidEntryError } from './errors/InvalidEntryError'
import { IPerson } from '@modules/Person/dataModels/IPerson'
import { IPersonRepository } from '@modules/Person/repositories/IPersonRepository'
import { PersonCpfAlreadyExists } from './errors/PersonCpfAlreadyExists'
import isValidCPF from './utils/isValidCPF'

type CreatePersonEntry = {
  name: string
  cpf: string
  birthDate: string
  files?: any
}

type CreatePersonReturn = PersonCpfAlreadyExists | InvalidEntryError | IPerson

export class CreatePerson {
  constructor(private readonly personRepository: IPersonRepository) {}

  async run({
    name,
    cpf,
    birthDate,
  }: CreatePersonEntry): Promise<CreatePersonReturn> {
    const invalidEntry = this.validate({
      name,
      cpf,
      birthDate,
    })

    if (invalidEntry) {
      return new InvalidEntryError(invalidEntry)
    }

    const personExists = await this.personRepository.findOneByCpf(cpf)

    if (personExists) {
      return new PersonCpfAlreadyExists(cpf)
    }

    const person = await this.personRepository.save({
      name: name.trim(),
      cpf: cpf.trim(),
      birthDate: birthDate.trim(),
    })

    console.log({person})

    return person
  }

  private validate({
    name,
    cpf,
    birthDate,
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
