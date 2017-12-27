const express = require('express')
const ubermind = require('./index')
const events = ubermind.events
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use((req, res, next) => {
  console.log(`webhook received:
    ${req.method}
    ${req.path}
    ${JSON.stringify(req.body)}`)

    return res.status(200).send('OK')
})

app.listen(5000, () => {
  console.log('listening on port 5000')
});
