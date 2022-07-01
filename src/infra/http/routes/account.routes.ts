import { Route } from '../fastify/Route'
import { adaptRoute } from '../fastify/fastifyRouteAdapter'

import { CreateAccountController } from '@modules/Account/useCases/createAccount/CreatePersonController'
import { UpdatePersonController } from '@modules/Account/useCases/updatePerson/updatePersonController'
import { ListAccountController } from '@modules/Account/useCases/listAccounts/ListAccountController'
import { ListAccountByIdController } from '@modules/Account/useCases/listAccountById/ListAccountController'
import { AuthAccountController } from '@modules/Account/useCases/authAccount/authAccountController'

const accountRoutes = new Route('account')

accountRoutes.createRoute({
  method: 'POST',
  url: '/',
  handler: adaptRoute(CreateAccountController.getSingleton()),
})

accountRoutes.createRoute({
  method: 'POST',
  url: '/login',
  handler: adaptRoute(AuthAccountController.getSingleton()),
})

accountRoutes.createRoute({
  method: 'PUT',
  url: '/',
  handler: adaptRoute(UpdatePersonController.getSingleton()),
})

accountRoutes.createRoute({
  method: 'GET',
  url: '/',
  handler: adaptRoute(ListAccountController.getSingleton()),
})

accountRoutes.createRoute({
  method: 'GET',
  url: '/details',
  handler: adaptRoute(ListAccountByIdController.getSingleton()),
})

export { accountRoutes }
