import { IPerson } from '../dataModels/IPerson'

type SavePersonRepositoryData = {
  name: string
  cpf: string
  birthDate: string
  documentMedia?: string
}

type UpdatePersonRepositoryData = {
  name?: string
  cpf?: string
  birthDate?: string
  documentMedia?: string
}

interface IPersonRepository {
  findOneByCpf(cpf: string): Promise<IPerson | null>
  findOneById(id: string): Promise<IPerson | null>
  save(data: SavePersonRepositoryData): Promise<IPerson>
  update(data: UpdatePersonRepositoryData, id: string): Promise<IPerson | null>
  list(): Promise<IPerson[]>
}

export { IPersonRepository, SavePersonRepositoryData, UpdatePersonRepositoryData }
