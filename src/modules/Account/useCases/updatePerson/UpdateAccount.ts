import { hash } from 'bcrypt'
import { InvalidEntryError } from './errors/InvalidEntryError'
import { IAccount } from '@modules/Account/dataModels/IAccount'
import { IAccountRepository } from '@modules/Account/repositories/IAccountRepository'
import { AccountDoesNotExist } from './errors/AccountDoesNotExist'
import { validateUUID } from './errors/validateUUID'

type UpdateAccountEntry = {
  id: string
  balance: number
}

type UpdateAccountReturn = InvalidEntryError | IAccount | null

export class UpdateAccount {
  constructor(private readonly accountRepository: IAccountRepository) {}

  async run({
    id,
    balance,
  }: UpdateAccountEntry): Promise<UpdateAccountReturn> {
    const invalidEntry = this.validate({
      balance,
      id,
    })

    if (invalidEntry) {
      return new InvalidEntryError(invalidEntry)
    }

    const accountExists = await this.accountRepository.findOneById(id)

    if (!accountExists) {
      return new AccountDoesNotExist()
    }

    const account = await this.accountRepository.update({balance}, id)

    return account
  }

  private validate({
    balance,
    id,
  }: UpdateAccountEntry): string | null {

    if (!id || !validateUUID(id)) {
      return '"id" is a non-empty required string uuid'
    }

    if (
      !balance ||
      typeof balance !== 'number' ||
      balance < 0
    ) {
      return '"balance" is a non-empty required number positive'
    }

    return null
  }
}
