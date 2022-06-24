import { FastifyRequest, FastifyReply } from 'fastify'

import { Controller } from '../helpers/Controller'

export function adaptRoute(controller: Controller) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const httpResponse = await controller.handle({
      params: request.params,
      query: request.query,
      body: request.body,
      headers: request.headers,
      flow: {},
    })

    reply.status(httpResponse.statusCode).send(httpResponse.body)
  }
}
