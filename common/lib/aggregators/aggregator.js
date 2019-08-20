const moment = require('moment')
const request = require('request-promise')
const Cache = require('../cache')

class Aggregator {
  static key() {
    return this.name
  }

  static expiryKey() {
    const expiry = this.expiry()
    return expiry ? `expiry-${this.key}` : null
  }

  static async set() {
    const key = this.key()
    const value = await this.setter()
    await Cache.setAsync(key, JSON.stringify(value))
  
    const expiryKey = this.expiryKey()
    if (expiryKey) {
      const expirySeconds = this.expiry()
      const expiryDate = moment().add(expirySeconds, 's')
      await Cache.setAsync(expiryKey, expiryDate.format())
    }

    return value
  }

  static async get() {
    const key = this.key()
    const value = await Cache.getAsync(key)
    if (value) {
      return JSON.parse(value)
    }
    return null
  }

  static async fetch() {
    const key = this.key()
    console.log(`Running aggregator:`, key)
    const value = await this.get()
    if (value) {
      console.log(`Found cache value for`, key)
      if (this.expiry()) {
        const expirationString = await Cache.getAsync(this.expiryKey())
        const expiration = moment(expirationString)
        if (expiration.isAfter(moment())) {
          console.log(`Warming expired cache for`, key)
          this.set()
        }
      }
      return value
    }
    console.log(`Cached value not found for`, key)
    return this.set()
  }

  static expiry() {
    return null
  }

  static setter() {
    return null
  }

  static apiServer() {
    return process.env.API_SERVER || 'https://api.app.co'
  }

  static request(path) {
    return request({
      uri: `${this.apiServer()}${path}`,
      json: true
    })
  }
  
}

module.exports = Aggregator

