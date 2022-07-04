import { Route } from '../fastify/Route'
import { adaptRoute } from '../fastify/fastifyRouteAdapter'

import { CreatePersonController } from '@modules/Person/useCases/createPerson/CreatePersonController'
import { UpdatePersonController } from '@modules/Person/useCases/updatePerson/updatePersonController'
import { ListPersonController } from '@modules/Person/useCases/listPerson/ListPersonController'
import { ListPersonByIdController } from '@modules/Person/useCases/listById/ListPersonController'

const personRoutes = new Route('person')

/**
 * @api {post} /person Create Person
 * @apiGroup Person
 *
 * @apiParam {String} name Name.
 * @apiParam {String} cpf Cpf unique.
 * @apiParam {String} birthDate birth date.
 *
 *
 * @apiSuccess {object} Person update
 *
 * @apiSuccessExample {object} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *      "id": {string},
        "name": {string},
        "birthDate": {string},
        "cpf": {string}
 *    }
 *
 */
personRoutes.createRoute({
  method: 'POST',
  url: '/',
  handler: adaptRoute(CreatePersonController.getSingleton()),
})

/**
 * @api {put} /person Update Person
 * @apiGroup Person
 *
 * @apiParam {String} id Person ID.
 * @apiParam {String} name Name (Optional).
 * @apiParam {multipart} docs files type image (Optional).
 *
 *
 * @apiSuccess {object} Person update
 *
 * @apiSuccessExample {object} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *      "id": {string},
        "name": {string},
        "birthDate": {string},
        "cpf": {string}
 *    }
 *
 */
personRoutes.createRoute({
  method: 'PUT',
  url: '/',
  handler: adaptRoute(UpdatePersonController.getSingleton()),
})


/**
 * @api {get} /person List Person
 * @apiGroup Person
 *
 *
 * @apiSuccess {array} Person list of Person
 *
 * @apiSuccessExample {array} Sucesso
 *    HTTP/1.1 200 OK
 *    [{
 *      "id": {string},
        "name": {string},
        "birthDate": {string},
        "cpf": {string}
 *    }]
 *
 */
personRoutes.createRoute({
  method: 'GET',
  url: '/',
  handler: adaptRoute(ListPersonController.getSingleton()),
})

/**
 * @api {get} /person/details Person details
 * @apiGroup Person
 *
 * @apiParam {String} id Person ID.
 *
 * @apiSuccess {object} Person details of Person
 *
 * @apiSuccessExample {object} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *      "id": {string},
        "name": {string},
        "birthDate": {string},
        "cpf": {string}
 *    }
 *
 */
personRoutes.createRoute({
  method: 'GET',
  url: '/details',
  handler: adaptRoute(ListPersonByIdController.getSingleton()),
})

export { personRoutes }
