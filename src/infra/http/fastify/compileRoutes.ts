import { Route } from './Route'
import {
  RouterInstance,
  RouterOpts,
  RouterDoneFunc,
} from './FastifyRouteRegisterParams'

function compileRoutes(routes: Route[]) {
  return function (
    router: RouterInstance,
    opts: RouterOpts,
    done: RouterDoneFunc
  ) {
    for (let i = 0; i < routes.length; i += 1) {
      router.register(routes[i].getRegister())
    }

    done()
  }
}

export { compileRoutes }
