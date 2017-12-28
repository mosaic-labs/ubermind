#!/usr/bin/env node

const ubermind = require('commander')
const { version, bin } = require('../package')

ubermind
  .version(`${version}`)
  .command('run', 'run an ubermind server')
  .option('-p, --port <n>', 'set a port for the server -- defaults to 3000', parseInt)
  .option('--auth [value]', 'set auth to false -- defaults to true')
  .parse(process.argv)

console.log(' - port %s', ubermind.port)
console.log(' - auth %s', ubermind.auth)
