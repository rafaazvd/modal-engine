import { Route } from '../fastify/Route'
import { adaptRoute } from '../fastify/fastifyRouteAdapter'

import { CreateAccountController } from '@modules/Account/useCases/createAccount/CreatePersonController'
import { UpdateAccountController } from '@modules/Account/useCases/updateAccount/updateAccountController'
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

/**
 * @api {post} /account/login Login account
 * @apiGroup Account
 *
 * @apiParam {String} email email to login
 * @apiParam {String} password password to login
 *
 * @apiSuccess {json} account Login
 *
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *      "id": {string},
        "personId": {string},
        "email": {string},
        "accessToken": {string},
        "balance": {number}
 *    }
 *
 */
accountRoutes.createRoute({
  method: 'POST',
  url: '/login',
  handler: adaptRoute(AuthAccountController.getSingleton()),
})

/**
 * @api {put} /account Create Account
 * @apiGroup Account
 *
 * @apiParam {String} id Account ID.
 *
 * @apiSuccess {Number} balance current account value
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
  method: 'PUT',
  url: '/',
  handler: adaptRoute(UpdateAccountController.getSingleton()),
})

/**
 * @api {get} /account List accounts
 * @apiGroup Account
 *
 * @apiSuccess {Array} accounts array of accounts
 *
 * @apiSuccessExample {array} Sucesso
 *    HTTP/1.1 200 OK
 *    [{
 *      "id": {string},
        "personId": {string},
        "email": {string},
        "balance": {number}
 *    }]
 *
 */
accountRoutes.createRoute({
  method: 'GET',
  url: '/',
  handler: adaptRoute(ListAccountController.getSingleton()),
})

/**
 * @api {get} /account/details Details of account
 * @apiGroup Account
 *
 * @apiParam {String} id Account ID.
 *
 * @apiSuccess {object} account details of account
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
accountRoutes.createRoute({
  method: 'GET',
  url: '/details',
  handler: adaptRoute(ListAccountByIdController.getSingleton()),
})

export { accountRoutes }
