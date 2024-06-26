import type { FastifyInstance } from 'fastify'

export const GET = async (app: FastifyInstance) => {
  app.get('*', {}, async (request, reply) => {
    reply.send({ message: 'Hello World!' })
  })
}
