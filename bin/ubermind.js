#!/usr/bin/env node

const ubermind = require('commander')
const { version, bin } = require('../package')

ubermind
  .version(`${version}`)
  .command('run', 'run an ubermind server')
  .command('stop', 'stop an ubermind server')
  .command('docker', 'start ubermind using docker')
  .command('logs', 'check logs for an ubermind instance')
  .parse(process.argv)
