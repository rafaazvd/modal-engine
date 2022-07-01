import { compileRoutes } from '../fastify/compileRoutes'

import { personRoutes } from './person.routes'
import { accountRoutes } from './account.routes'

const routes = compileRoutes([
  personRoutes,
  accountRoutes,
])

export { routes }
