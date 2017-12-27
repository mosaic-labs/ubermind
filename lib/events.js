const EventEmitter = require('events')
const axios = require('axios')

class Events extends EventEmitter {
  constructor (config, io) {
    super()
    this.webhook = config.webhook || 'http://localhost:5000'
    this.logLevel = config.logLevel || 0
    this.db = config.db || {}
    this.io = io
  }

  broadcast (event, payload = {}) {
    axios.post(this.webhook, payload)
      .then((response) => {
        if (this.logging > 0) console.log(`webhook_response: ${response}`)
        return response
      })
      .catch((err) => {
        if (this.logging > 0) console.error(`webhook_error: ${err}`)
        return err
      })

    this.emit(event, payload)
    this.io.on('connect', (socket) => {
      socket.emit(event, payload)
    })
  }
}

module.exports = Events
