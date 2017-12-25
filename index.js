const express = require('express')
const mongojs = require('mongojs')
const bodyParser = require('body-parser')

const server = (config) => {
  const db = mongojs(config.db)

  db.on('error', (err) => {
    console.error('error connecting to database', err)
  })

  db.on('connect', () => {
    console.log('connected to database')
  })

  const lib = require('./lib')(db, config)
  const app = express()

  app.use(bodyParser.json())

  app.get('/', lib.get)
  app.get('/:model', lib.find)
  app.get('/:model/:id', lib.findById)
  app.post('/', lib.create)
  app.put('/', lib.update)
  app.delete('/', lib.delete)

  return app
}

module.exports = server
