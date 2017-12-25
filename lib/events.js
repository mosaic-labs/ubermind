const EventEmitter = require('events')
const axios = require('axios')

class Uber extends EventEmitter {
  super (config) {
    console.log('got config: ', config)
    this.webhook = config.webhook || 'localhost:3000'
    this.logging = config.logging || 1
    this.db = config.db || {}
  }

  broadcast (event, payload = {}) {
    axios.post(this.webhook, payload)
      .then((response) => {
        if (this.logging) console.log(response)
        return response
      })
      .catch((err) => {
        if (this.logging) console.error('error posting to webhookURL: ', err)
        return err
      })

    this.emit(event, payload)
  }
}

module.exports = Uber
