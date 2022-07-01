import { IPerson } from '@modules/Person/dataModels/IPerson'
import { IPersonRepository } from '@modules/Person/repositories/IPersonRepository'

type ListPersonReturn = null | IPerson

export class ListPerson {
  constructor(private readonly personRepository: IPersonRepository) {}

  async run(id: string): Promise<ListPersonReturn> {
    const people = await this.personRepository.findOneById(id)

    return people
  }
}
