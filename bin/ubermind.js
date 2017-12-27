#!/usr/bin/env node

const ubermind = require('commander')
const { version, bin } = require('../package')

ubermind
  .version(`${version}`)
  .option('-p, --port <n>', 'set a port for the server -- defaults to 3000', parseInt)
  .option('--auth', 'set auth to false -- defaults to true')
  .parse(process.argv)

ubermind.on('--help', function() {
  console.log('Ubermind - A firebase-like REST API')
})

ubermind
  .command('run <cmd>')
  .alias('start')
  .description('start the ubermind server with docker')
  .action(function(cmd, options) {
    console.log('ubermind run was triggered')
    console.log(cmd)
    console.log(options)
  })

console.log(' - port %s', ubermind.port)
console.log(' - auth %s', ubermind.auth)
