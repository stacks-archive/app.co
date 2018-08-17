const LRUCache = require('lru-cache')

const dev = process.env.NODE_ENV !== 'production'
const ssrCache = new LRUCache({
  max: 10,
  maxAge: dev ? 1000 * 30 : 1000 * 60 * 60 // 1hour
})

module.exports = { ssrCache }
