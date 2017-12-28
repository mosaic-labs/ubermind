#!/usr/bin/env node

const ubermind = require('commander')
const { version, bin } = require('../package')

ubermind
  .version(`${version}`)
  .command('run', 'run an ubermind server')
  .command('stop', 'stop an ubermind server')
  .parse(process.argv)
