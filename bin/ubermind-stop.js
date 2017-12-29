#!/usr/bin/env node

const ubermind = require('commander')
const shell = require('shelljs')

ubermind
  .option('--docker', 'stop ubermind docker-compose')
  .parse(process.argv)

console.log('killing ubermind')

if (ubermind.docker) {
  shell.exec('docker-compose down')
} else {

}

