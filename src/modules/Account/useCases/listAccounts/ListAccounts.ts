import { IAccount } from '@modules/Account/dataModels/IAccount'
import { IAccountRepository } from '@modules/Account/repositories/IAccountRepository'

type ListAccountReturn = null | IAccount[]

export class ListAccount {
  constructor(private readonly accountRepository: IAccountRepository) {}

  async run(): Promise<ListAccountReturn> {
    const accounts = await this.accountRepository.list()

    return accounts
  }
}
