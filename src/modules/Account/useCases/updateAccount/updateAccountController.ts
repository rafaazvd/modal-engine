import { Controller, ControllerRequest } from '@infra/http/helpers/Controller'
import {
  success,
  fail,
  HttpResponse,
  clientError,
} from '@infra/http/helpers/httpResponse'

import { UpdateAccount } from './UpdateAccount'
import { AccountRepository } from '@infra/implementations/repositories/Account'

const updatePerson = new UpdateAccount(AccountRepository.getSingleton())

export class UpdatePersonController implements Controller {
  private static instance = new UpdatePersonController()

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
      const result = await updatePerson.run({
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
