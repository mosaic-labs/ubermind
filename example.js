const express = require('express')
const ubermind = require('./index')

const app = express()
// mount it to an endpoint
app.use('/ubermind', ubermind({
  app: app,
  timestamps: true,
  webhook: process.env.UBERMIND_WEBHOOK || 'http://localhost:5000/', // where it will post events to
  socket: process.env.UBERMIND_SOCKET || 'http://localhost:4000', // socket.io url
  db: process.env.UBERMIND_MONGO_URI || 'mongodb://localhost:27017/ubermind' // specify the database connection string
}));

app.listen(process.env.UBERMIND_PORT || 3000, () => {
  console.log('listening on port 3000')
});
