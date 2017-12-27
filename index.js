const express = require('express')
const mongojs = require('mongojs')
const bodyParser = require('body-parser')

const server = (config) => {
  const app = express()
  const server = require('http').Server(app);
  const Events = require('./lib/events')
  const db = mongojs(config.db)
  const events = new Events(config, server)
  const lib = require('./lib')(db, config, events)
  const utils = require('./lib/utils')

  db.on('error', (err) => {
    events.broadcast('db_error', err)
    console.error('error connecting to database', err)
  })

  db.on('connect', () => {
    events.broadcast('db_connected')
    console.log('connected to database')
  })

  app.use(bodyParser.json())

  app.set('db', db)
  app.set('config', config)

  app.get('/', lib.root)
  app.post('/', lib.create)
  app.put('/', lib.update)
  app.delete('/', lib.delete)
  app.get('/:model', lib.find)
  app.get('/:model/:id', lib.findOne) // :id only takes ObjectID's
  app.put('/:model/:id', lib.updateOne) // :id only takes ObjectID's
  app.delete('/:model/:id', lib.deleteById) // :id only takes ObjectID's

  return app
}

server.utils = require('./lib/utils')
server.events = require('./lib/events')

module.exports = server
