#!/usr/bin/env node

const ubermind = require('commander')
const shell = require('shelljs')

if (shell.which('docker')) {
  shell.exec('docker-compose up -d')
} else {
  shell.exec('echo "You need to install docker to run this."')
}
