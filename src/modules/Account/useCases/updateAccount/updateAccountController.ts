import { Controller, ControllerRequest } from '@infra/http/helpers/Controller'
import {
  success,
  fail,
  HttpResponse,
  clientError,
} from '@infra/http/helpers/httpResponse'

import { UpdateAccount } from './UpdateAccount'
import { AccountRepository } from '@infra/implementations/repositories/Account'

const updateAccount = new UpdateAccount(AccountRepository.getSingleton())

export class UpdateAccountController implements Controller {
  private static instance = new UpdateAccountController()

  private constructor() {}

  static getSingleton() {
    return this.instance
  }

  async handle({ body, query }: ControllerRequest): Promise<HttpResponse> {
    const {
      balance,
     } = body
     const {
      id,
     } = query

    try {
      const result = await updateAccount.run({
        id,
        balance,
      })

      if (result.email) {
        return success(result)
      }

      return clientError(result.name)
    } catch (err) {
      console.log(err)

      return fail()
    }
  }
}
