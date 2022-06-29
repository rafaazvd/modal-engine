import { IPerson } from '../dataModels/IPerson'

type SavePersonRepositoryData = {
  name: string
  cpf: string
  email: string
  birthDate: string
  documentMedia?: any
  password: string
}

interface IPersonRepository {
  findOneByEmail(email: string): Promise<IPerson | null>
  save(data: SavePersonRepositoryData): Promise<IPerson>
  list(): Promise<IPerson[]>
}

export { IPersonRepository, SavePersonRepositoryData }
