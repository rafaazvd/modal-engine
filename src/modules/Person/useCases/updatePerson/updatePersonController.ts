import { Controller, ControllerRequest } from '@infra/http/helpers/Controller'
import {
  success,
  clientError,
  fail,
  HttpResponse,
} from '@infra/http/helpers/httpResponse'

import { UpdatePerson } from './UpdatePerson'
import { PersonRepository } from '@infra/implementations/repositories/Person'

const updatePerson = new UpdatePerson(PersonRepository.getSingleton())

export class UpdatePersonController implements Controller {
  private static instance = new UpdatePersonController()

  private constructor() {}

  static getSingleton() {
    return this.instance
  }

  async handle({ body, files, query }: ControllerRequest): Promise<HttpResponse> {
    const {
      name,
      email,
      birthDate,
      password,
     } = body
     const {
      id,
     } = query

    try {
      const result = await updatePerson.run({
        id,
        name,
        email,
        birthDate,
        files,
        password,
      })

      return success(result)
    } catch (err) {
      console.log(err)

      return fail()
    }
  }
}
