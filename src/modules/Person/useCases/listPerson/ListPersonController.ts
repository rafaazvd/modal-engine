import { Controller, ControllerRequest } from '@infra/http/helpers/Controller'
import { success, fail, HttpResponse } from '@infra/http/helpers/httpResponse'

import { ListPerson } from './ListPerson'
import { PersonRepository } from '@infra/implementations/repositories/Person'

const listPerson = new ListPerson(PersonRepository.getSingleton())

export class ListPersonController implements Controller {
  private static instance = new ListPersonController()

  private constructor() {}

  static getSingleton() {
    return this.instance
  }

  async handle(request: ControllerRequest): Promise<HttpResponse> {
    try {
      const result = await listPerson.run()
      console.log({result})
      return success(result)
    } catch (err) {
      console.log(err)

      return fail()
    }
  }
}
