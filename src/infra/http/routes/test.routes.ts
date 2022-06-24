import { Route } from '../fastify/Route'
import { adaptRoute } from '../fastify/fastifyRouteAdapter'

import { Controller } from '@infra/http/helpers/Controller'
import {
  success,
  fail,
  HttpResponse,
} from '@infra/http/helpers/httpResponse'

const testRoute = new Route('test')

export class ControllerTest implements Controller {
  private static instance = new ControllerTest()

  private constructor() {}

  static getSingleton() {
    return this.instance
  }

  async handle(): Promise<HttpResponse> {
      try {
      return success({msg: 'api on'})
    } catch (err) {
      console.log(err)
      return fail()
    }
  }
}

testRoute.createRoute({
  method: 'GET',
  url: '/',
  handler: adaptRoute(ControllerTest.getSingleton()),
})

export { testRoute }
