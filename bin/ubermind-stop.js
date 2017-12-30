#!/usr/bin/env node
const shell = require('shelljs')

console.log('killing ubermind')
shell.exec('docker-compose down')

