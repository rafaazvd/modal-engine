import { Controller, ControllerRequest } from '@infra/http/helpers/Controller'
import { success, fail, HttpResponse } from '@infra/http/helpers/httpResponse'

import { ListTransaction } from './ListTransaction'
import { TransactionRepository } from '@infra/implementations/repositories/Transactions'

const listTransaction = new ListTransaction(TransactionRepository.getSingleton())

export class ListTransactionController implements Controller {
  private static instance = new ListTransactionController()

  private constructor() {}

  static getSingleton() {
    return this.instance
  }

  async handle(request: ControllerRequest): Promise<HttpResponse> {
    try {
      const result = await listTransaction.run()
      return success(result)
    } catch (err) {
      console.log(err)
      return fail()
    }
  }
}
