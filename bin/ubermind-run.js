#!/usr/bin/env node

const ubermind = require('commander')

ubermind
  .option('--pm2', 'use pm2 to start the server')
  .option('--docker', 'use docker to start the server')
  .parse(process.argv)

console.log('ubermind run was hit')
console.log(ubermind.pm2)
console.log(ubermind.docker)
