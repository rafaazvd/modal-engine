import { compileRoutes } from '../fastify/compileRoutes'

import { personRoutes } from './person.routes'
import { accountRoutes } from './account.routes'
import { p2pRoutes } from './p2p.routes'

const routes = compileRoutes([
  personRoutes,
  accountRoutes,
  p2pRoutes,
])

export { routes }
