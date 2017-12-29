#!/usr/bin/env node

const ubermind = require('commander')
const shell = require('shelljs')

ubermind
  .option('-d --docker', 'get logs for docker-compose')

if (ubermind.docker) {
  shell.exec('docker-compose logs ubermind_api_1')
  shell.exec('docker-compose logs ubermind_mongo_1')
}
