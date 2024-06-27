/* eslint-disable @typescript-eslint/no-explicit-any */
import chalk from 'chalk'
import type {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  HTTPMethods,
} from 'fastify'
import { DB, type TEntity } from './db'

type TOptions = {
  port: number
  schema: string
}

type TRoute = {
  method: HTTPMethods
  path: string
  entity: string
  response: TResponse
}

type TResponse = {
  status: number
  output: boolean
  wrapper?: string
}

export class MockAPI {
  private db: Record<string, DB> = {}
  private routes: TRoute[] = []
  private entities: TEntity[] = []

  constructor(
    private readonly options: TOptions,
    private readonly app: FastifyInstance
  ) {}

  private async loadSchema() {
    const schema = await import(this.options.schema)
    this.routes = schema.routes
    this.entities = schema.entities
    this.entities.forEach(async (entity: TEntity) => {
      this.db[entity.name] = new DB(entity)
      await this.db[entity.name].seed()
    })
  }

  private registerRoutes() {
    this.routes.forEach((route: TRoute) => {
      const { path, method, entity, response } = route
      this.app.route({
        method,
        url: path,
        schema: {
          params: {
            type: 'object',
            properties: {
              id: { type: 'string' },
            },
          },
        },
        handler: (request: FastifyRequest, reply: FastifyReply) => {
          const { id } = request.params as Record<string, string>
          const { status, output, wrapper } = response
          const data: any = request.body ?? null
          let responseJson: any | null = null
          if (id) {
            switch (method) {
              case 'GET':
                responseJson = this.db[entity].get(id)
                break
              case 'PATCH':
                responseJson = this.db[entity].patch(id, data)
                break
              case 'PUT':
                responseJson = this.db[entity].update(id, data)
                break
              case 'DELETE':
                responseJson = this.db[entity].get(id)
                this.db[entity].delete(id)
                break
            }
          } else {
            if (method === 'POST') {
              responseJson = this.db[entity].add(data)
            }
            if (method === 'GET') {
              responseJson = this.db[entity].list()
            }
          }
          if (output) {
            if (wrapper) {
              const temp: any = {}
              temp[wrapper] = responseJson
              responseJson = temp
            }
          } else {
            responseJson = null
          }
          reply.status(status).send(responseJson)
        },
      })
    })
  }

  public async start() {
    await this.loadSchema()
    this.registerRoutes()
    this.app
      .listen({
        host: '0.0.0.0',
        port: this.options.port,
      })
      .then(() => {
        console.log('')
        console.log(chalk.blue('Starting mock API server...'))
        console.log(chalk.blackBright(` └── Port: ${this.options.port}`))
        console.log(chalk.blackBright(` └── Schema: ${this.options.schema}`))
        console.log('')
        console.log(chalk.green('🤘 Mock API is running!'))
        console.log('')
      })
  }
}
