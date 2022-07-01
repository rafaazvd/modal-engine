import { ITransaction } from '@modules/Transaction/dataModels/ITransaction'
import { ITransactionRepository } from '@modules/Transaction/repositories/ITransactionRepository'

type ListTransactionReturn = null | ITransaction[]

export class ListTransaction {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  async run(): Promise<ListTransactionReturn> {
    const transaction = await this.transactionRepository.list()

    return transaction
  }
}
