import { Controller, ControllerRequest } from '@infra/http/helpers/Controller'
import {
  success,
  clientError,
  fail,
  HttpResponse,
} from '@infra/http/helpers/httpResponse'

import { CreatePerson } from './CreatePerson'
import { PersonRepository } from '@infra/implementations/repositories/Person'

const createPerson = new CreatePerson(PersonRepository.getSingleton())

export class CreatePersonController implements Controller {
  private static instance = new CreatePersonController()

  private constructor() {}

  static getSingleton() {
    return this.instance
  }

  async handle({ body }: ControllerRequest): Promise<HttpResponse> {
    const {
      name,
      cpf,
      email,
      birthDate,
      documentMedia,
      password,
     } = body

    try {
      const result = await createPerson.run({
        name,
        cpf,
        email,
        birthDate,
        documentMedia,
        password,
      })

      console.log({result})

      return success(result)
    } catch (err) {
      console.log(err)

      return fail()
    }
  }
}
