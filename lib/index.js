const utils = require('./utils')
const handleResponse = utils.handleResponse
const handleError = utils.handleError
const mongojs = require('mongojs')

const lib = (db, config) => {
  return ({
    get (req, res, next) {
      const model = utils.getModel(req)

      db[model].find((err, docs) => {
        if (err) return res.status(500).send(err)
        return res.status(200).send(docs)
      })
    },

    find (req, res, next) {
      const model = utils.getModel(req)

      db[model].find(req.query, (err, docs) => {
        if (err) return res.status(500).send(err)
        return res.status(200).send(docs)
      })
    },

    findById (req, res, next) {
      const id = utils.getId(req)
      const model = utils.getModel(req)

      db[model].findOne({
        _id: id
      }, (err, doc) => {
        if (err) return res.status(500).send(err)
        return res.status(200).send(doc)
      })
    },

    create (req, res, next) {
      let model = utils.getModel(req)
      db[model].insert(req.body.data, (err, response) => {
        return res.status(201).send(response)
      })
    },

    update (req, res, next) {
      const model = utils.getModel(req)

      if (req.query._id) {
        req.query._id = mongojs.ObjectId(req.query._id)
      }

      db[model].update(
        req.body.query,
        req.body.data,
        req.body.options || {},
        (err, data) => {
          if (err) res.status(500).send(err)
          return res.status(204).send(data)
        })
    },

    delete (req, res, next) {
      const model = utils.getModel(req)
      db[model].remove(
        query,
        req.body.options || {},
        (err, response) => {
          if (err) res.status(500).send(err)
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
        console.log('Error: ', err)
        console.log('Response: ', response)
        return res.status(200).send(err || response)
      })
    }
  })
}

module.exports = lib
