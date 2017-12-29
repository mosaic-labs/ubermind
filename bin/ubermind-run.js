#!/usr/bin/env node

const ubermind = require('commander')
const shell = require('shelljs')

ubermind
  .option('-p, --port <n>', 'set a port for the server -- defaults to 3000', parseInt)
  .option('-u, --url', 'specify a mongo URI to connect to')
  .option('--auth [value]', 'set auth to false -- defaults to true')
  .option('--pm2', 'use pm2 to start the server')
  .option('--name', 'name the ubermind instance')
  .option('--docker', 'use docker to start the server')
  .parse(process.argv)

if (ubermind.docker && shell.which('docker')) {
  shell.exec(`docker run -p ${ubermind.port}:${ubermind.port} --name ${ubermind.name} -d hivemindapps/ubermind:latest`)
}

if (ubermind.pm2) {
  shell.exec('pm2 start ../example.js')
}
