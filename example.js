const express = require('express');
const ubermind = require('./index');
const app = express();

// mount it to an endpoint
app.use('/ubermind', ubermind({
  app: app, // pass through the express app instance
  db: 'localhost:27017/hivemind' // specify the database connection string
}));

app.listen(3000, () => {
  console.log('listening on port 3000');
});
