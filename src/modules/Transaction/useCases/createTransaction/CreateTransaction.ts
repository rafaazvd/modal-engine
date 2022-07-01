import { hash } from 'bcrypt'
import { InvalidEntryError } from './errors/InvalidEntryError'
import { ITransaction } from '@modules/Transaction/dataModels/ITransaction'
import { ITransactionRepository } from '@modules/Transaction/repositories/ITransactionRepository'
import { IAccountRepository } from '@modules/Account/repositories/IAccountRepository'
import { DestinationAccountDoesNotExist} from './errors/DestinationAccountDoesNotExist'
import { OriginAccountDoesNotExist } from './errors/OriginAccountDoesNotExist'
import { InsufficientFunds } from './errors/InsufficientFunds'
type CreateTransactionEntry = {
  receiverAccount: string
  senderAccount: string
  value: number
}

type CreateTransactionReturn = OriginAccountDoesNotExist | DestinationAccountDoesNotExist | InvalidEntryError | ITransaction

export class CreateTransaction {
  constructor(private readonly transactionRepository: ITransactionRepository, private readonly accountRepository: IAccountRepository) {}

  async run({
    receiverAccount,
    senderAccount,
    value,
  }: CreateTransactionEntry): Promise<CreateTransactionReturn> {
    const invalidEntry = this.validate({
      receiverAccount,
      senderAccount,
      value,
    })

    if (invalidEntry) {
      return new InvalidEntryError(invalidEntry)
    }

    const receiverAccountExists = await this.accountRepository.findOneById(receiverAccount)
    const senderAccountlExists = await this.accountRepository.findOneById(senderAccount)

    if (!receiverAccountExists) {
      return new DestinationAccountDoesNotExist()
    }
    if (!senderAccountlExists) {
      return new OriginAccountDoesNotExist()
    }
    const senderBalance = senderAccountlExists.balance ? senderAccountlExists.balance : 0
    const newBalanceSenderAccount = senderBalance - value
    if (newBalanceSenderAccount < 0) {
      return new InsufficientFunds()
    }

    const receiverBalance = receiverAccountExists.balance ? receiverAccountExists.balance : 0
    const newBalanceReceiverAccount = receiverBalance + value
    await this.accountRepository.update(
      {
        balance: newBalanceReceiverAccount,
      },
      receiverAccount,
    )
    await this.accountRepository.update(
      {
        balance: newBalanceSenderAccount,
      },
      senderAccount,
    )

    const transaction = await this.transactionRepository.save({
      receiverAccount,
      senderAccount,
      value,
    })

    return transaction
  }

  private validate({
    receiverAccount,
    senderAccount,
    value,
  }: CreateTransactionEntry): string | null {

    if (!senderAccount || typeof senderAccount !== 'string') {
      return '"senderAccount" is a non-empty required string'
    }

    if (!receiverAccount || typeof receiverAccount !== 'string') {
      return '"receiverAccount" is a non-empty required string'
    }

    if (
      value &&
      (typeof value !== 'number' ||
      value < 0)
    ) {
      return '"value" is a non-empty number positive'
    }

    return null
  }
}
