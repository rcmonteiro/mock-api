import { Command } from 'commander'
import path from 'node:path'
import { app } from './app'
import { MockAPI } from './mock-api'

const cli = new Command()

cli
  .version('1.0.0')
  .description('Simple mock API for running frontend e2e tests')
  .option('-p, --port <number>', 'Port to run the mock API on')
  .option('-s, --schema <path>', 'Path to JSON schema file')

cli.parse(process.argv)

const args = cli.opts()

const options = {
  port: args.port ? parseInt(args.port) : 4001,
  schema: path.resolve(args.schema || './src/schemas/default.json'),
}

const mock = new MockAPI(options, app)

mock.start()
