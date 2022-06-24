import fastify from 'fastify'
import cors from 'fastify-cors'

import { routes } from './routes'

async function startApp() {

  const app = fastify({ logger: true })

  app.setErrorHandler((err, req, rep) => {
    console.log(err)
    rep.status(500).send({ error: 'internal' })
  })

  app.register(cors)
  app.register(routes)

  return app
}

export { startApp }
