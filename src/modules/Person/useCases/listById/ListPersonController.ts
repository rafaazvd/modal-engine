import { Controller, ControllerRequest } from '@infra/http/helpers/Controller'
import { success, fail, HttpResponse } from '@infra/http/helpers/httpResponse'

import { ListPerson } from './ListPerson'
import { PersonRepository } from '@infra/implementations/repositories/Person'

const listPerson = new ListPerson(PersonRepository.getSingleton())

export class ListPersonByIdController implements Controller {
  private static instance = new ListPersonByIdController()

  private constructor() {}

  static getSingleton() {
    return this.instance
  }

  async handle({ query }: ControllerRequest): Promise<HttpResponse> {
    try {
      const { id } = query
      const result = await listPerson.run(id)
      return success(result)
    } catch (err) {
      console.log(err)

      return fail()
    }
  }
}
