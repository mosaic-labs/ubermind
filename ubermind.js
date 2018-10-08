const express = require('express')
const ubermind = require('./index')

const app = express()

app.use('/ubermind', ubermind({
  timestamps: process.env.TIMESTAMPS || true,
  webhook: process.env.WEBHOOK_URI || 'http://localhost:5000/',
  db: process.env.MONGO_URI || 'mongodb://localhost:27017/ubermind',
  dashboard: true
}));

const port = parseInt(process.env.PORT || 3000)

app.listen(port, () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('listening on port %s', port)
  }
});
