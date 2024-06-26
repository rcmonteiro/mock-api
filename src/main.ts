#!/usr/bin/env node
import chalk from 'chalk'
import { parseArgs } from 'node:util'

const { values } = parseArgs({
  options: {
    name: {
      type: 'string',
      short: 'n',
      default: 'NoName',
    },
  },
  allowPositionals: true,
})

const greeting = chalk.green(`Hello, ${values.name}!`)
console.log(greeting)
