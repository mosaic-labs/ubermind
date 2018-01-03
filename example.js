const express = require('express')
const ubermind = require('./index')
const events = ubermind.events

const app = express()
// mount it to an endpoint
app.use('/ubermind', ubermind({
  app: app,
  timestamps: true,
  webhook: 'http://localhost:5000/', // where it will post events to
  socket: 'http://localhost:4000', // socket.io url
  db: process.env.MONGO_URI || 'localhost:27017/ubermind' // specify the database connection string
}));

app.listen(3000, () => {
  console.log('listening on port 3000')
});
