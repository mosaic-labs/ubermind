const utils = require('./utils')
const handleResponse = utils.handleResponse
const handleError = utils.handleError

const lib = (db, config) => {
  return ({
    get (req, res, next) {
      db[req.body.model].find((err, docs) => {
        if (err) return res.status(500).send(err)
        return res.status(200).send(docs)
      })
    },

    find (req, res, next) {
      let model

      if (req.params.collection) {
        model = req.params.collection
      }

      delete req.query.model

      db[model].find(req.query, (err, docs) => {
        if (err) return res.status(500).send(err)
        return res.status(200).send(docs)
      })
    },

    findById (req, res, next) {
      let id

      if (req.body.id) {
        id = req.body.id
      }

      if (req.params.id) {
        id = req.params.id
      }

      db[req.body.model].findOne({
        _id: id
      }, (err, doc) => {
        console.log( err || doc )
        if (err) return res.status(500).send(err)
        return res.status(200).send(doc)
      })
    },

    create (req, res, next) {
      db[req.body.model].insert(req.body.data, (err, response) => {
        return res.status(201).send(response)
      })
    },

    update (req, res, next) {
      return res.status(204).send('update')
    },

    delete (req, res, next) {
      return res.status(204).send('delete')
    },

    deleteById (req, res, next) {
      return res.status(204).send('not implemented')
    }
  })
}

module.exports = lib
