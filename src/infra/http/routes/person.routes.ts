import { Route } from '../fastify/Route'
import { adaptRoute } from '../fastify/fastifyRouteAdapter'

import { CreatePersonController } from '@modules/Person/useCases/createPerson/CreatePersonController'
import { UpdatePersonController } from '@modules/Person/useCases/updatePerson/updatePersonController'
import { ListPersonController } from '@modules/Person/useCases/listPerson/ListPersonController'
import { ListPersonByIdController } from '@modules/Person/useCases/listById/ListPersonController'
import { AuthPersonController } from '@modules/Person/useCases/authPerson/authPersonController'
const personRoutes = new Route('person')

personRoutes.createRoute({
  method: 'POST',
  url: '/',
  handler: adaptRoute(CreatePersonController.getSingleton()),
})

personRoutes.createRoute({
  method: 'POST',
  url: '/login',
  handler: adaptRoute(AuthPersonController.getSingleton()),
})

personRoutes.createRoute({
  method: 'PUT',
  url: '/',
  handler: adaptRoute(UpdatePersonController.getSingleton()),
})

personRoutes.createRoute({
  method: 'GET',
  url: '/',
  handler: adaptRoute(ListPersonController.getSingleton()),
})

personRoutes.createRoute({
  method: 'GET',
  url: '/details',
  handler: adaptRoute(ListPersonByIdController.getSingleton()),
})

export { personRoutes }
