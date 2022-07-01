import fastify from 'fastify'
import cors from 'fastify-cors'

import { routes } from './routes'
import db from './db'

async function startApp() {
  await db()
  const app = fastify({ logger: true })

  app.setErrorHandler((err, req, rep) => {
    console.log(err)
    rep.status(500).send({ error: 'internal' })
  })

  app.register(require('@fastify/multipart'), {
    limits: {
      fieldNameSize: 500, // Max field name size in bytes
      fieldSize: 700,     // Max field value size in bytes
      fields: 10,         // Max number of non-file fields
      fileSize: 10000000,  // For multipart forms, the max file size in bytes
      files: 4,           // Max number of file fields
      headerPairs: 20000   // Max number of header key=>value pairs
    }
  });

  app.register(cors)
  app.register(routes)

  return app
}

export { startApp }
