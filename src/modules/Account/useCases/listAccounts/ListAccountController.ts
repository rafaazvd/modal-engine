import { Controller, ControllerRequest } from '@infra/http/helpers/Controller'
import { success, fail, HttpResponse } from '@infra/http/helpers/httpResponse'

import { ListAccount } from './ListAccounts'
import { AccountRepository } from '@infra/implementations/repositories/Account'

const listAccount = new ListAccount(AccountRepository.getSingleton())

export class ListAccountController implements Controller {
  private static instance = new ListAccountController()

  private constructor() {}

  static getSingleton() {
    return this.instance
  }

  async handle(request: ControllerRequest): Promise<HttpResponse> {
    try {
      const result = await listAccount.run()
      return success(result)
    } catch (err) {
      console.log(err)
      return fail()
    }
  }
}
