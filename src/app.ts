import fastify from 'fastify'
import { GET } from './methods/get'

export const app = fastify()

app.register(GET)
