const redis = require('redis')
const { promisify } = require('util')
const Promise = require('bluebird')

const prefix = `app-co-${process.env.NODE_ENV}`

const url = process.env.REDIS_URL || 'redis://127.0.0.1:6379'
const client = redis.createClient(url, {
  prefix
})

client.getAsync = promisify(client.get).bind(client)
client.setAsync = promisify(client.set).bind(client)
client.delAsync = promisify(client.del).bind(client)
client.keysAsync = promisify(client.keys).bind(client)
client.existsAsync = promisify(client.exists).bind(client)

client.has = async (key) => {
  try {
    return !!(await client.existsAsync(key))
  } catch (error) {
    console.error(`Error when checking if cache key exists:`, key)
    console.error(error)
    return false
  }
}

client.reset = async () => {
  const keys = await client.keysAsync(`${prefix}*`)
  await Promise.map(keys, key => {
    if (key.indexOf('Aggregator') === -1) {
      console.log('Clearing', key.slice(prefix.length))
      return client.delAsync(key.slice(prefix.length))
    }
    return null
  })
}

module.exports = client

