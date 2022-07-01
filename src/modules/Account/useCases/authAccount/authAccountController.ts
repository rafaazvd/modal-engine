import { Controller, ControllerRequest } from '@infra/http/helpers/Controller'
import {
  success,
  clientError,
  fail,
  HttpResponse,
} from '@infra/http/helpers/httpResponse'

import { AuthAccount } from './authAccount'
import { AccountRepository } from '@infra/implementations/repositories/Account'

const authAccount = new AuthAccount(AccountRepository.getSingleton())

export class AuthAccountController implements Controller {
  private static instance = new AuthAccountController()

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
      const result = await authAccount.run({
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
