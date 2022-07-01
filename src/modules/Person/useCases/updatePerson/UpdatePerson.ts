import fs from 'fs'
import path from 'path'
import { hash } from 'bcrypt'
import { v4 as uuid } from 'uuid'
import { InvalidEntryError } from './errors/InvalidEntryError'
import { IPerson } from '@modules/Person/dataModels/IPerson'
import { IPersonRepository } from '@modules/Person/repositories/IPersonRepository'
import { uploadImageToStorage } from '@infra/services/firebaseUploadImage'
import { PersonCpfAlreadyExists } from './errors/PersonCpfAlreadyExists'
import { PersonDoesNotExist } from './errors/PersonDoesNotExist'
import isValidEmail from './utils/isValidEmail'
import removeUndefinedPropsFromAnObject from './utils/removeUndefinedValuesFromAnObject'

type UpdatePersonEntry = {
  id: string
  name?: string
  email?: string
  birthDate?: string
  files?: any
  password?: string
}

type UpdatePersonReturn = PersonCpfAlreadyExists | InvalidEntryError | PersonDoesNotExist | IPerson | null

export class UpdatePerson {
  constructor(private readonly personRepository: IPersonRepository) {}

  async run({
    id,
    name,
    email,
    birthDate,
    files,
    password,
  }: UpdatePersonEntry): Promise<UpdatePersonReturn> {
    const invalidEntry = this.validate({
      id,
      name,
      email,
      birthDate,
      password,
    })

    if (invalidEntry) {
      return new InvalidEntryError(invalidEntry)
    }

    const personExists = await this.personRepository.findOneById(id)

    if (!personExists) {
      return new PersonDoesNotExist(id)
    }
    let passwordHashed
    let urlDoc
    if (password) {
      passwordHashed = await hash(password, 10)
    }
    if (files.toBuffer) {
      console.log('entry')
      const token = uuid()
      const dirPath = path.join(__dirname, '../../../../../docs')
      const buffer = await files.toBuffer('image/png')
      fs.writeFileSync(`${dirPath}/${token}-doc.png`, buffer)
      urlDoc = await uploadImageToStorage(`${dirPath}/${token}-doc.png`, 'rg', `${token}-doc.png`)
      console.log({urlDoc})
      fs.unlinkSync(`${dirPath}/${token}-doc.png`)
    }

    const personValuesToUpdate = removeUndefinedPropsFromAnObject({
      name: name ? name.trim(): undefined,
      email: email ? email.trim(): undefined,
      birthDate: birthDate ? birthDate.trim() : undefined,
      documentMedia: urlDoc,
      password: passwordHashed,
    })

    const person = await this.personRepository.update(
      personValuesToUpdate,
      id,
    )

    return person ? person : null
  }

  private validate({
    id,
    name,
    email,
    birthDate,
    password,
  }: UpdatePersonEntry): string | null {
    if (
      name &&
      (typeof name !== 'string' ||
      name.trim().length < 1 ||
      name.trim().length > 200)
    ) {
      return '"name" is a non-empty required string of up to 200 characters'
    }

    if (
      !id &&
      (typeof id !== 'string')
    ) {
      return '"id" is a non-empty required string'
    }

    if (
      birthDate &&
      (typeof birthDate !== 'string' ||
      birthDate.trim().length < 1)
    ) {
      return '"birthDate" is a non-empty required string'
    }

    if (email !== undefined && !isValidEmail(email)) {
      throw new InvalidEntryError(
        '"email" is a non-empty required string of a valid e-mail'
      )
    }

    if (
      password &&
      (typeof password !== 'string' ||
      password.trim().length < 8)
    ) {
      return '"password" is a non-empty required string with at least 8 characters'
    }


    return null
  }
}
