const express = require('express')
const {Database, Model} = require('mongorito')
const mongojs = require('mongojs')
const bodyParser = require('body-parser')

const server = (config) => {
  const db = mongojs(config.db)
  const lib = require('./lib')(db, config)
  const app = express()

  app.use(bodyParser.json())
  app.get('/', lib.get)
  app.get('/:collection', lib.find)
  app.get('/:collection/:id', lib.findById)
  app.post('/', lib.create)
  app.put('/', lib.update)
  app.delete('/', lib.delete)

  return app
}

module.exports = server
