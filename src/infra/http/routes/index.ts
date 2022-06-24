import { compileRoutes } from '../fastify/compileRoutes'

import { testRoute } from './test.routes'

const routes = compileRoutes([
  testRoute,
])

export { routes }
