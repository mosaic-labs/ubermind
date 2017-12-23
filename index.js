const express = require('express')
const lib = require('./lib')
const {Database, Model} = require('mongorito')

console.log('lib: ', lib)

const server = (config) => {
  const app = express()
  const db = new Database(config.db)

  app.get('/', lib.get)
  app.get('/:collection', lib.find)
  app.get('/:collection/:id', lib.findById)
  app.post('/', lib.create)
  app.put('/', lib.update)
  app.delete('/', lib.delete)

  return app
}

module.exports = server
