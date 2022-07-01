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
      birthDate,
     } = body

    try {
      const result = await createPerson.run({
        name,
        cpf,
        birthDate,
      })

      if (result._id) {
        return success(result)
      }

      return clientError(result.name)
    } catch (err) {
      console.log(err)

      return fail()
    }
  }
}
