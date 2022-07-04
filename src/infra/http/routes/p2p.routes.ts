import { Route } from '../fastify/Route'
import { adaptRoute } from '../fastify/fastifyRouteAdapter'

import { CreateTransactionController } from '@modules/Transaction/useCases/createTransaction/CreateTransactionController'
import { ListTransactionController } from '@modules/Transaction/useCases/listTransactions/ListAccountController'
const p2pRoutes = new Route('p2p')

/**
 * @api {post} /p2p Create Transaction
 * @apiGroup Transaction
 *
 * @apiParam {String} senderAccount Sender account id
 * @apiParam {String} receiverAccount Receiver account id
 * @apiParam {Number} value transaction amount
 *
 * @apiSuccess {json} transaction transaction details
 *
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *      "id": {string},
        "senderAccount": {string},
        "receiverAccount": {string},
        "value": {number}
 *    }
 *
 */
p2pRoutes.createRoute({
  method: 'POST',
  url: '/',
  handler: adaptRoute(CreateTransactionController.getSingleton()),
})

/**
 * @api {get} /p2p List transactions
 * @apiGroup Transaction
 *
 * @apiSuccess {Array} accounts array of transactions
 *
 * @apiSuccessExample {array} Sucesso
 *    HTTP/1.1 200 OK
 *    [{
 *      "id": {string},
        "value": {string},
        "receiverAccount": {object},
        "senderAccount": {object}
 *    }]
 *
 */

p2pRoutes.createRoute({
  method: 'GET',
  url: '/',
  handler: adaptRoute(ListTransactionController.getSingleton()),
})


export { p2pRoutes }
