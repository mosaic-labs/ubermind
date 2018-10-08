const utils = require('./utils')
const handleResponse = utils.handleResponse
const handleError = utils.handleError
const mongojs = require('mongojs')
const events = require('./events')
const pkg = require('../package')

const lib = (db, config, events) => {
  return ({
    root (req, res, next) {
      let payload = {}

      db.stats((err, data) => {
        if (err) res.status(500).send(err)

        payload.stats = data
        payload.version = pkg.version

        db.getCollectionNames((err, collections) => {
          if (err) handleError(req, res, err)

          payload.collections = collections
          return res.status(200).send(payload)
        })
      })
    },

    find (req, res, next) {
      const model = utils.getModel(req)
      const limit = parseInt(req.query.limit) || 50
      const skip = parseInt(req.query.skip) || 0

      delete req.query.skip
      delete req.query.limit

      if (req.query._id) {
        req.query._id = mongojs.ObjectId(req.query._id)
      }

      db[model]
        .find(req.query)
        .limit(limit)
        .skip(skip, (err, docs) => {
          if (err) return res.status(500).send(err)
          return res.status(200).send(docs)
        })
    },

    query (req, res, next) {
      const model = utils.getModel(req)
      const limit = parseInt(req.query.limit) || 50
      const skip = parseInt(req.query.skip) || 0

      delete req.query.skip
      delete req.query.limit

      return db[model]
        .find(req.body.query)
        .limit(limit)
        .skip(skip)
        .then((err, docs) => {
          if (err) return res.status(500).send(err)
          return res.status(200).send(docs)
        })
    },

    findOneBy (req, res, next) {
      const id = utils.getId(req)
      const model = utils.getModel(req)
      const field = utisl.getField(req)
      const query = {}

      query[field] = id

      return db[model]
        .findOne(query, (err, doc) => {
          if (err) return res.status(500).send(err)
          return res.status(200).send(doc)
        })
    },

    findOne (req, res, next) {
      const id = utils.getId(req)
      const model = utils.getModel(req)

      db[model].findOne({
        _id: mongojs.ObjectId(id)
      }, (err, doc) => {
        if (err) return res.status(500).send(err)
        return res.status(200).send(doc)
      })
    },

    create (req, res, next) {
      let model = utils.getModel(req)
      const payload = req.body.data

      if (Array.isArray(payload)) {
        payload.forEach(item => item._id = mongojs.ObjectId(item._id))
      }

      payload._id = mongojs.ObjectId(payload._id)

      if (config.timestamps === true) {
        payload.created_at = Date.now()
      }

      db[model].insert(payload, (err, response) => {
        events.broadcast(`${model}:created`, response)
        return res.status(201).send(response)
      })
    },

    update (req, res, next) {
      const model = utils.getModel(req)

      if (req.query._id) {
        req.query._id = mongojs.ObjectId(req.query._id)
      }

      if (config.timestamps === true) {
        if (Array.isArray(req.body.data)) {
          req.body.data.map(item => item.updated_at = Date.now())
        } else {
          req.body.data.updated_at = Date.now()
        }
      }

      db[model].update(
        req.body.query,
        req.body.data,
        req.body.options || {},
        (err, data) => {
          if (err) res.status(500).send(err)
          events.broadcast(`${model}:updated`, data)
          return res.status(204).send(data)
        })
    },

    updateOne (req, res, next) {
      const model = utils.getModel(req)
      const id = utils.getId(req)

      delete req.body.data._id

      if (config.timestamps === true) {
        req.body.data.updated_at = Date.now()
      }

      db[model].findAndModify({
        query: req.body.query,
        update: {$set: req.body.data}
      }, (err, doc) => {
          if (err) res.status(500).send(err)
          events.broadcast(`${model}:updated`, doc)
          return res.status(204).json(doc)
        })
    },

    delete (req, res, next) {
      const model = utils.getModel(req)
      const query = utils.getQuery(req)

      db[model].remove(
        query,
        req.body.options || {},
        (err, response) => {
          if (err) res.status(500).send(err)
          events.broadcast(`${model}:deleted`, response)
          return res.status(204).send(response)
        })
    },

    deleteById (req, res, next) {
      const model = utils.getModel(req)
      const id = utils.getId(req)

      db[model].remove({
        _id: id
      }, req.body.options || {},
      (err, response) => {
        if (err) res.status(500).send(err)
        events.broadcast(`${model}:deleted`, response)
        return res.status(200).send(response)
      })
    }
  })
}

module.exports = lib
