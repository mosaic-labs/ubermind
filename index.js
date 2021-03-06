const express = require('express')
const mongojs = require('mongojs')
const bodyParser = require('body-parser')
const noop = (req, res, next) => next()

const server = (config) => {
  const mongo_express = require('mongo-express/lib/middleware')
  const mongo_express_config = require('./mongo_express_config')
  const app = express()
  const server = require('http').Server(app)
  const Events = require('./lib/events')
  const db = mongojs(config.db)
  const events = new Events(config, server)
  const lib = require('./lib')(db, config, events)
  const utils = require('./lib/utils')
  const auth = config.permissions || {}
  //const cors = require('cors')

  db.on('error', (err) => {
    events.broadcast('db_error', err)
    console.error('error connecting to database', err)
  })

  db.on('connect', () => {
    events.broadcast('db_connected')
    if (process.env.NODE_ENV !== 'production') {
      console.log('connected to database')
    }
  })

  // allow cors to be overridden
  if (!config.cors) {
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
      res.header('Access-Control-Allow-Credentials', 'true');
      next();
    });
  }

  app.set('db', db)
  app.set('config', config)

  app.use(bodyParser.json())

  // Mongo / Express Dashboard
  if (config.dashboard !== false) {
    console.log("serving dashboard at `/dashboard`")
    app.use('/dashboard', mongo_express(mongo_express_config(config)))
  }

  app.get('/', auth.getRoot || noop, lib.root)
  app.post('/', auth.create || noop, lib.create)
  app.put('/', auth.update || noop, lib.update)
  app.delete('/', auth.delete || noop, lib.delete)
  app.get('/:model', auth.find || noop, lib.find)
  app.get('/:model/:id', auth.findOne || noop, lib.findOne) // :id only takes ObjectID's
  app.put('/:model/:id', auth.updateOne || noop, lib.updateOne) // :id only takes ObjectID's
  app.delete('/:model/:id', auth.deleteOne || noop, lib.deleteById) // :id only takes ObjectID's


  return app
}

server.utils = require('./lib/utils')
server.events = require('./lib/events')
server.lib = require('./lib')

module.exports = server
