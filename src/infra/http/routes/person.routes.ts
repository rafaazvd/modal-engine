import { Route } from '../fastify/Route'
import { adaptRoute } from '../fastify/fastifyRouteAdapter'

import { CreatePersonController } from '@modules/Person/useCases/createPerson/CreatePersonController'
import { ListPersonController } from '@modules/Person/useCases/listPerson/ListPersonController'

const personRoutes = new Route('countries')

personRoutes.createRoute({
  method: 'POST',
  url: '/',
  handler: adaptRoute(CreatePersonController.getSingleton()),
})

personRoutes.createRoute({
  method: 'GET',
  url: '/',
  handler: adaptRoute(ListPersonController.getSingleton()),
})

export { personRoutes }
