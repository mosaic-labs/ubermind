#!/usr/bin/env node

const shell = require('shelljs')

if (shell.which('docker')) {
  shell.exec('echo "starting up ubermind on port 3000"')
  shell.exec('docker-compose up -d')
} else {
  shell.exec('echo "You need to install docker to run this."')
}
