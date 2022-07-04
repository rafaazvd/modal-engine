import { Route } from '../fastify/Route'
import { adaptRoute } from '../fastify/fastifyRouteAdapter'

import { CreatePersonController } from '@modules/Person/useCases/createPerson/CreatePersonController'
import { UpdatePersonController } from '@modules/Person/useCases/updatePerson/updatePersonController'
import { ListPersonController } from '@modules/Person/useCases/listPerson/ListPersonController'
import { ListPersonByIdController } from '@modules/Person/useCases/listById/ListPersonController'

const personRoutes = new Route('person')

personRoutes.createRoute({
  method: 'POST',
  url: '/',
  handler: adaptRoute(CreatePersonController.getSingleton()),
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

/**
 * @api {get} /person/details Person details
 * @apiGroup Account
 *
 * @apiParam {String} id Account ID.
 *
 * @apiSuccess {object} transactions details of transactions
 *
 * @apiSuccessExample {object} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *      "id": {string},
        "personId": {string},
        "email": {string},
        "balance": {number}
 *    }
 *
 */
personRoutes.createRoute({
  method: 'GET',
  url: '/details',
  handler: adaptRoute(ListPersonByIdController.getSingleton()),
})

export { personRoutes }
