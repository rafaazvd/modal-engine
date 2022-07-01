import { IPerson, Person } from '../models/Person'
import {
  IPersonRepository,
  SavePersonRepositoryData,
  UpdatePersonRepositoryData,
} from '@modules/Person/repositories/IPersonRepository'


export class PersonRepository implements IPersonRepository {
  private static instance = new PersonRepository()

  private constructor() {}

  static getSingleton() {
    return this.instance
  }

  async findOneByCpf(cpf: string): Promise<IPerson | null> {
    const person = await Person.findOne({cpf})
    return person ? person : null
  }

  async findOneById(id: string): Promise<IPerson | null> {
    const person = await Person.findById(id, {password: 0})
    return person ? person : null
  }

  async save(data: SavePersonRepositoryData): Promise<IPerson> {
    const person = await Person.create(data)

    return person
  }
  async update(data: UpdatePersonRepositoryData, id: string): Promise<IPerson | null> {
    await Person.findByIdAndUpdate(
      id,
      data,
    )
    const person = await Person.findById(id, {password: 0})
    return person ? person : null
  }

  async list(): Promise<IPerson[]> {
    const people = await Person.find({}, {password: 0})
    return people
  }
}
