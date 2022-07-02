import { Route } from '../fastify/Route'
import { adaptRoute } from '../fastify/fastifyRouteAdapter'

import { CreateTransactionController } from '@modules/Transaction/useCases/createTransaction/CreateTransactionController'
import { ListTransactionController } from '@modules/Transaction/useCases/listTransactions/ListAccountController'
const p2pRoutes = new Route('p2p')

p2pRoutes.createRoute({
  method: 'POST',
  url: '/',
  handler: adaptRoute(CreateTransactionController.getSingleton()),
})

p2pRoutes.createRoute({
  method: 'GET',
  url: '/',
  handler: adaptRoute(ListTransactionController.getSingleton()),
})


export { p2pRoutes }
