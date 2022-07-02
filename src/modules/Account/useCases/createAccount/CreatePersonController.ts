import { Controller, ControllerRequest } from '@infra/http/helpers/Controller'
import {
  success,
  clientError,
  fail,
  HttpResponse,
} from '@infra/http/helpers/httpResponse'

import { CreateAccount } from './CreateAccount'
import { AccountRepository } from '@infra/implementations/repositories/Account'
import { PersonRepository } from '@infra/implementations/repositories/Person'

const createAccount = new CreateAccount(
  AccountRepository.getSingleton(),
  PersonRepository.getSingleton(),
  )

export class CreateAccountController implements Controller {
  private static instance = new CreateAccountController()

  private constructor() {}

  static getSingleton() {
    return this.instance
  }

  async handle({ body }: ControllerRequest): Promise<HttpResponse> {
    const {
      email,
      password,
      balance,
      personId,
     } = body

    try {
      const result = await createAccount.run({
        email,
        password,
        balance,
        personId,
      })
     if (result.id) {
      return success(result)
     }
    return clientError(result.name)
    } catch (err) {
      console.log({err})

      return fail()
    }
  }
}
