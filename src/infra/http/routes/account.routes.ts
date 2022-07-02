import { Route } from '../fastify/Route'
import { adaptRoute } from '../fastify/fastifyRouteAdapter'

import { CreateAccountController } from '@modules/Account/useCases/createAccount/CreatePersonController'
import { UpdatePersonController } from '@modules/Account/useCases/updateAccount/updateAccountController'
import { ListAccountController } from '@modules/Account/useCases/listAccounts/ListAccountController'
import { ListAccountByIdController } from '@modules/Account/useCases/listAccountById/ListAccountController'
import { AuthAccountController } from '@modules/Account/useCases/authAccount/authAccountController'

const accountRoutes = new Route('account')
//apidoc -i ./src/infra/http/routes -o src/apidoc
/**
 * @api {post} /account Create Account
 * @apiGroup Account
 *
 * @apiParam {String} personId Person unique ID.
 * @apiParam {String} email email to login
 * @apiParam {String} password password to login
 * @apiParam {Number} balance initial account value
 *
 * @apiSuccess {json} account create a personal account
 *
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *      "id": {string},
        "personId": {string},
        "email": {string},
        "balance": {number}
 *    }
 *
 */
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
