const mongojs = require('mongojs')

exports.handleError = (req, res, err) => {
  return res.status(500).send(err)
}

exports.handleResponse = (req, res, data) => {

}

exports.getModel = (req) => {
  let model

  if (req.params.model) {
    model = req.params.model
  }

  if (req.query.model) {
    model = req.query.model
  }

  if (req.body.model) {
    model = req.body.model
  }

  return model
}

exports.getId = (req) => {
  let id

  if (req.params.id) {
    id = req.params.id
  }

  if (req.query.id) {
    id = req.query.id || req.query._id
  }

  if (req.body.id) {
    id = req.body.id || req.body._id
  }

  return mongojs.ObjectId(id)
}

exports.getQuery = (req) => {
  let query

  if (req.body.query) {
    query = req.body.query
  }

  if (req.query) {
    query = req.query
  }

  query._id = mongojs.ObjectId(query._id) || undefined

  return query
}

exports.getUpdate = (req) => {
  let update = {
    $set: req.body.data
  }
  return update
}

exports.populate = (field) => {

}

exports.oneToMany = () => {

}

exports.oneToOne = () => {

}
