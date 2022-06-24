import { RouteOptions } from 'fastify'

import {
  RouterInstance,
  RouterOpts,
  RouterDoneFunc,
} from './FastifyRouteRegisterParams'

class Route {
  private prefix?: string
  private routes: RouteOptions[]

  constructor(prefix?: string) {
    this.prefix = prefix
    this.routes = []
  }

  public createRoute(route: RouteOptions) {
    this.routes.push(route)
  }

  public getRegister() {
    const routes = this.routes
    const prefix = this.prefix

    return function (
      router: RouterInstance,
      opts: RouterOpts,
      done: RouterDoneFunc
    ) {
      router.register(
        function (
          router: RouterInstance,
          opts: RouterOpts,
          done: RouterDoneFunc
        ) {
          for (let i = 0; i < routes.length; i += 1) {
            router.route(routes[i])
          }

          done()
        },
        { prefix }
      )

      done()
    }
  }
}

export { Route }
