const express = require('express')
const ubermind = require('./index')
const events = ubermind.events

const app = express()
// mount it to an endpoint
app.use('/ubermind', ubermind({
  timestamps: true,
  webhook: 'localhost:3000', // where it will psot events to
  socket: 'localhost:4000', // socket.io url
  db: 'localhost:27017/ubermind' // specify the database connection string
}));

app.listen(3000, () => {
  console.log('listening on port 3000')
});
