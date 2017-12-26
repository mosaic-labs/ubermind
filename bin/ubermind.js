#!/usr/bin/env node

const ubermind = require('commander')
const { version, bin } = require('../package')

ubermind
  .version(`${version} - a hivemind apps project`)

