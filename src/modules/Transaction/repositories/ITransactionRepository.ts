import { ITransaction } from '../dataModels/ITransaction'

type SaveTransactionRepositoryData = {
  receiverAccount: string
  senderAccount: string
  value: number
}

interface ITransactionRepository {
  save(data: SaveTransactionRepositoryData): Promise<ITransaction>
  list(): Promise<ITransaction[]>
}

export { ITransactionRepository, SaveTransactionRepositoryData }
