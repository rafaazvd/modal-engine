import { Controller, ControllerRequest } from '@infra/http/helpers/Controller'
import { success, fail, HttpResponse } from '@infra/http/helpers/httpResponse'

import { ListAccount } from './ListAccount'
import { AccountRepository } from '@infra/implementations/repositories/Account'

const listAccount = new ListAccount(AccountRepository.getSingleton())

export class ListAccountByIdController implements Controller {
  private static instance = new ListAccountByIdController()

  private constructor() {}

  static getSingleton() {
    return this.instance
  }

  async handle({ query }: ControllerRequest): Promise<HttpResponse> {
    try {
      const { id } = query
      const result = await listAccount.run(id)
      return success(result)
    } catch (err) {
      console.log(err)

      return fail()
    }
  }
}
