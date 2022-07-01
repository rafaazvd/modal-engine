import { ITransaction, Transaction } from '../models/Transactions'
import {
  ITransactionRepository,
  SaveTransactionRepositoryData,
} from '@modules/Transaction/repositories/ITransactionRepository'

export class TransactionRepository implements ITransactionRepository {
  private static instance = new TransactionRepository()

  private constructor() {}

  static getSingleton() {
    return this.instance
  }
  async save(data: SaveTransactionRepositoryData): Promise<any> {
    const account = await Transaction.create(data)
    return {
      id: account._id,
      receiverAccount: account.receiverAccount,
      senderAccount: account.senderAccount,
      value: account.value,
    }
  }
  async list(): Promise<ITransaction[]> {
    const account = await Transaction.find({})
      .populate({
        path: 'receiverAccount',
        model: 'Account',
        populate: {
          path: 'personId',
          model: 'Person',
        }
      })
      .populate({
        path: 'senderAccount',
        model: 'Account',
        populate: {
          path: 'personId',
          model: 'Person',
        }
      })
    return account
  }
}
