import { Controller, ControllerRequest } from '@infra/http/helpers/Controller'
import {
  success,
  clientError,
  fail,
  HttpResponse,
} from '@infra/http/helpers/httpResponse'

import { AuthPerson } from './authPerson'
import { PersonRepository } from '@infra/implementations/repositories/Person'

const authPerson = new AuthPerson(PersonRepository.getSingleton())

export class AuthPersonController implements Controller {
  private static instance = new AuthPersonController()

  private constructor() {}

  static getSingleton() {
    return this.instance
  }

  async handle({ body }: ControllerRequest): Promise<HttpResponse> {
    const {
      email,
      password,
     } = body

    try {
      const result = await authPerson.run({
        email,
        password,
      })

      return success(result)
    } catch (err) {
      console.log(err)

      return fail()
    }
  }
}
