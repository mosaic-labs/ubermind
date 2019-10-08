const mongojs = require('mongojs')

exports.handleError = (req, res, err) => {
  return res.status(500).send(err)
}

exports.handleResponse = (req, res, data) => {

}


/**
Notes:
TODO accept query paramaters in different orders. Using entries
*/
const formatConditionalOperators = (obj) => {
  for (const key in obj) {
    if (typeof obj[key] === 'object') {
      formatConditionalOperators(obj[key])
    } else if (key == '$gt' || key == '$lt' || key == '$gte' || key == '$lte') {
      obj[key] = parseInt(obj[key])
    }
  }
  return obj
}


exports.queryComposer = (req) => {
  let reqQuery = req.query
  for (const key in reqQuery) {
    const value = reqQuery[key];
    delete reqQuery[key]
    const query = this.queryBuilderProxy(key, value)
    Object.assign(reqQuery,query)
  }
  reqQuery = formatConditionalOperators(reqQuery)
  return reqQuery
}

exports.queryBuilderProxy = (key, value) => {
  const regex = /-/g
  const queryStatement = value.replace(regex, " ")
  return queryBuilder(key,queryStatement)
}

const queryBuilder = (queryKey, queryStatement) => {
  let query = queryStatement
  if (queryStatement.includes('||')) {
    queryStatement = queryStatement.split('||')
    query = { $in: queryStatement }
  }
  if (queryKey.includes('!')) {
    queryKey = queryKey.replace("!", "")
    if (Array.isArray(queryStatement)) {
      query = { $nin: queryStatement }
    } else {
      query = { $ne: queryStatement }
    }
  }
  if (queryStatement.includes('>=')) {
    queryStatement = queryStatement.replace(">=", "")
    query = { $gte: queryStatement }
  }
  if (queryStatement.includes('<=')) {
    queryStatement = queryStatement.replace("<=", "")
    query = { $lte: queryStatement }
  }
  if (queryStatement.includes('>')) {
    queryStatement = queryStatement.replace(">", "")
    query = { $gt: queryStatement }
  }
  if (queryStatement.includes('<')) {
    queryStatement = queryStatement.replace("<", "")
    query = { $lt: queryStatement }
  }
  let obj = {}
  obj[queryKey] = query
  return obj

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
