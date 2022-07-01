import { IAccount, Account } from '../models/Account'
import {
  IAccountRepository,
  SaveAccountRepositoryData,
  UpdateAccountRepositoryData,
} from '@modules/Account/repositories/IAccountRepository'

export class AccountRepository implements IAccountRepository {
  private static instance = new AccountRepository()

  private constructor() {}

  static getSingleton() {
    return this.instance
  }

  async findOneByEmail(email: string): Promise<IAccount | null> {
    const account = await Account.findOne({email})
    return account ? account : null
  }

  async findOneById(id: string): Promise<IAccount | null> {
    const account = await Account.findById(id)
    return account ? account : null
  }

  async findByPersonId(id: string): Promise<IAccount | null> {
    const account = await Account.findById(id)
    return account ? account : null
  }

  async save(data: SaveAccountRepositoryData): Promise<any> {
    const account = await Account.create(data)
    delete account.password
    return account
  }
  async update(data: UpdateAccountRepositoryData, id: string): Promise<IAccount | null> {
    await Account.findByIdAndUpdate(
      id,
      data,
    )
    const account = await Account.findById(id)
    return account ? account : null
  }

  async list(): Promise<IAccount[]> {
    const account = await Account.find({})
    return account
  }
}
