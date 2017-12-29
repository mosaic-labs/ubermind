#!/usr/bin/env node

const ubermind = require('commander')
const shell = require('shelljs')

ubermind
  .option('-p, --port <n>', 'set a port for the server -- defaults to 3000', parseInt)
  .option('-u, --url', 'specify a mongo URI to connect to')
  .option('--nodemon', 'use nodemon for development mode')
  .option('--docker', 'use docker to startup ubermind - you cannot use port or url arugments with --docker flag')
  .parse(process.argv)

if (ubermind.docker) {
  if (shell.which('docker')) {
    shell.exec('docker-compose up -d')
  } else {
    shell.exec('echo "You need to install docker to run this."')
  }
}

if (ubermind.nodemon) {
  const port = ubermind.port || 3000
  const url = ubermind.url || 'http://localhost:27017/ubermind'
  shell.exec(`PORT=${port} MONGO_URI=${url} nodemon example.js`)
}

