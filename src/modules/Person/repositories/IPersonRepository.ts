import { IPerson } from '../dataModels/IPerson'

type SavePersonRepositoryData = {
  name: string
  cpf: string
  email: string
  birthDate: string
  documentMedia?: string
  password: string
}

type UpdatePersonRepositoryData = {
  name?: string
  cpf?: string
  email?: string
  birthDate?: string
  documentMedia?: string
  password?: string
}

interface IPersonRepository {
  findOneByEmail(email: string): Promise<IPerson | null>
  findOneById(id: string): Promise<IPerson | null>
  save(data: SavePersonRepositoryData): Promise<IPerson>
  update(data: UpdatePersonRepositoryData, id: string): Promise<IPerson | null>
  list(): Promise<IPerson[]>
}

export { IPersonRepository, SavePersonRepositoryData, UpdatePersonRepositoryData }
