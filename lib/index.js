const utils = require('./utils')
const handleResponse = utils.handleResponse
const handleError = utils.handleError

const lib = (db, config) => {
  console.log('database: ', db)

  return ({
    get (req, res, next) {
      db[req.body.model].find((err, docs) => {
        if (err) return res.status(500).send(err)
        return res.status(200).send(docs)
      })
    },

    find (req, res, next) {
      return res.status(200).send('find')
    },

    findById (req, res, next) {
      return res.status(200).send('findById')
    },

    create (req, res, next) {
      console.log(req.body.model, req.body.data)
      db[req.body.model].insert(req.body.data, (err, response) => {
        return res.status(201).send(response)
      })
    },

    update (req, res, next) {
      return res.status(204).send('update')
    },

    delete (req, res, next) {
      return res.status(204).send('delete')
    }
  })
}

module.exports = lib
