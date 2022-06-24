import { FastifyInstance, FastifyPluginOptions } from 'fastify'

type RouterInstance = FastifyInstance
type RouterOpts = FastifyPluginOptions
type RouterDoneFunc = (err?: Error | undefined) => void

export { RouterInstance, RouterOpts, RouterDoneFunc }
