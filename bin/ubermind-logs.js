#!/usr/bin/env node

const ubermind = require('commander')
const shell = require('shelljs')
shell.exec('docker-compose logs ubermind_api_1')
shell.exec('docker-compose logs ubermind_mongo_1')
