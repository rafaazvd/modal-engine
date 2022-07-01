import { Controller, ControllerRequest } from '@infra/http/helpers/Controller'
import {
  success,
  clientError,
  fail,
  HttpResponse,
} from '@infra/http/helpers/httpResponse'

import { CreateAccount } from './CreateAccount'
import { AccountRepository } from '@infra/implementations/repositories/Account'

const createAccount = new CreateAccount(AccountRepository.getSingleton())

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

      console.log({result})

      return success(result)
    } catch (err) {
      console.log(err)

      return fail()
    }
  }
}
