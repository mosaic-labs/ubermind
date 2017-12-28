#!/usr/bin/env node

const ubermind = require('commander')

ubermind
  .option('-p, --port <n>', 'set a port for the server -- defaults to 3000', parseInt)
  .option('-u, --url', 'specify a mongo URI to connect to')
  .option('--auth [value]', 'set auth to false -- defaults to true')
  .option('--pm2', 'use pm2 to start the server')
  .option('--docker', 'use docker to start the server')
  .parse(process.argv)

if (ubermind.url) {
  console.log('connecting to mongo: ', ubermind.url)
}
