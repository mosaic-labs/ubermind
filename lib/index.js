const lib = {
  get (req, res, next) {
    return res.status(200).send('get')
  },

  find (req, res, next) {
    return res.status(200).send('find')
  },

  findById (req, res, next) {
    return res.status(200).send('findById')
  },

  create (req, res, next) {
    return res.status(201).send('create')
  },

  update (req, res, next) {
    return res.status(204).send('update')
  },

  delete (req, res, next) {
    return res.status(204).send('delete')
  }
}

module.exports = lib
