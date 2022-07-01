import { FastifyRequest, FastifyReply } from 'fastify'

import { Controller } from '../helpers/Controller'

export function adaptRoute(controller: Controller) {
  return async (request: any, reply: FastifyReply) => {
    let files = {}
    try {
      const existFiles = await request.file()
      if (existFiles) files = existFiles
    } catch (error) {
      console.log('file not found')
    }
    const httpResponse = await controller.handle({
      params: request.params,
      query: request.query,
      body: request.body ? request.body : {},
      files,
      headers: request.headers,
      flow: {},
    })

    reply.status(httpResponse.statusCode).send(httpResponse.body)
  }
}
