import { Controller, ControllerRequest } from '@infra/http/helpers/Controller'
import {
  success,
  clientError,
  fail,
  HttpResponse,
} from '@infra/http/helpers/httpResponse'

import { CreateTransaction } from './CreateTransaction'
import { TransactionRepository } from '@infra/implementations/repositories/Transactions'
import { AccountRepository } from '@infra/implementations/repositories/Account'

const createTransaction = new CreateTransaction(
    TransactionRepository.getSingleton(),
    AccountRepository.getSingleton(),
  )

export class CreateTransactionController implements Controller {
  private static instance = new CreateTransactionController()

  private constructor() {}

  static getSingleton() {
    return this.instance
  }

  async handle({ body }: ControllerRequest): Promise<HttpResponse> {
    const {
      receiverAccount,
      senderAccount,
      value,
     } = body

    try {
      const result = await createTransaction.run({
        receiverAccount,
        senderAccount,
        value,
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
