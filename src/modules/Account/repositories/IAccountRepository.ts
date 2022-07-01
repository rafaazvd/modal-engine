import { IAccount } from '../dataModels/IAccount'

type SaveAccountRepositoryData = {
  personId: string
  email: string
  password: string
  balance: number
}

type UpdateAccountRepositoryData = {
  balance: number
}

interface IAccountRepository {
  findByPersonId(id: string): Promise<IAccount | null>
  findOneById(id: string): Promise<IAccount | null>
  findOneByEmail(email: string): Promise<IAccount | null>
  save(data: SaveAccountRepositoryData): Promise<IAccount>
  update(data: UpdateAccountRepositoryData, id: string): Promise<IAccount | null>
  list(): Promise<IAccount[]>
}

export { IAccountRepository, SaveAccountRepositoryData, UpdateAccountRepositoryData }
