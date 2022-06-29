import { IPerson, Person } from '../models/Person'
import {
  IPersonRepository,
  SavePersonRepositoryData,
} from '@modules/Person/repositories/IPersonRepository'


export class PersonRepository implements IPersonRepository {
  private static instance = new PersonRepository()

  private constructor() {}

  static getSingleton() {
    return this.instance
  }

  async findOneByEmail(email: string): Promise<IPerson | null> {
    const person = await Person.findOne({email})
    return person ? person : null
  }

  async save(data: SavePersonRepositoryData): Promise<IPerson> {
    const person = await Person.create({
      data,
    })

    return person
  }

  async list(): Promise<IPerson[]> {
    const people = await Person.find({})
    return people
  }
}
