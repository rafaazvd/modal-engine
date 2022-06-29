import { IPerson } from '@modules/Person/dataModels/IPerson'
import { IPersonRepository } from '@modules/Person/repositories/IPersonRepository'

type ListPersonReturn = null | IPerson[]

export class ListPerson {
  constructor(private readonly personRepository: IPersonRepository) {}

  async run(): Promise<ListPersonReturn> {
    const people = await this.personRepository.list()

    return people
  }
}
