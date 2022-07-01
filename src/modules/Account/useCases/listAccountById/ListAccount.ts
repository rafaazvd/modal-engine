import { IAccount } from '@modules/Account/dataModels/IAccount'
import { IAccountRepository } from '@modules/Account/repositories/IAccountRepository'

type ListAccountReturn = null | IAccount

export class ListAccount {
  constructor(private readonly accountRepository: IAccountRepository) {}

  async run(id: string): Promise<ListAccountReturn> {
    const account = await this.accountRepository.findOneById(id)

    return account
  }
}
