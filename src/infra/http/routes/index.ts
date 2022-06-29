import { compileRoutes } from '../fastify/compileRoutes'

import { testRoute } from './test.routes'
import { personRoutes } from './person.routes'

const routes = compileRoutes([
  testRoute,
  personRoutes,
])

export { routes }
