const express = require('express')
const next = require('next')
const LRUCache = require('lru-cache')
const dotenv = require('dotenv')
const shrinkRay = require('shrink-ray')
const cookiesMiddleware = require('universal-cookie-express')

const dev = process.env.NODE_ENV !== 'production'
if (dev) {
  dotenv.config()
}

const { getApps } = require('./common/lib/api')
const RSSController = require('./common/controllers/rss-controller')

const port = parseInt(process.env.PORT, 10) || 3000
const app = next({ dev })
const handle = app.getRequestHandler()

const apiServer = process.env.API_SERVER || 'https://app-co-api-staging.herokuapp.com'

// This is where we cache our rendered HTML pages
const ssrCache = new LRUCache({
  max: 10,
  maxAge: dev ? 1000 * 30 : 1000 * 60 * 60 // 1hour
})

/*
 * NB: make sure to modify this to take into account anything that should trigger
 * an immediate page change (e.g a locale stored in req.session)
 */
function getCacheKey(req) {
  return `${req.url}`
}

async function renderAndCache(req, res, pagePath, serverData) {
  const key = getCacheKey(req)

  // If we have a page in the cache, let's serve it
  // if (ssrCache.has(key) && !dev) {
  //   res.setHeader('x-cache', 'HIT')
  //   console.log('cache hit')
  //   res.send(ssrCache.get(key))
  //   return
  // }

  try {
    const data = await getApps(apiServer)
    data.apiServer = apiServer

    const dataToPass = {
      ...data,
      ...serverData
    }

    // If not let's render the page into HTML
    const html = await app.renderToHTML(req, res, pagePath, dataToPass)

    // Something is wrong with the request, let's skip the cache
    if (res.statusCode !== 200) {
      res.send(html)
      return
    }

    // Let's cache this page
    ssrCache.set(key, html)
    res.setHeader('x-cache', 'MISS')
    console.log('cache miss')
    res.send(html)
  } catch (err) {
    app.renderError(err, req, res, pagePath)
  }
}

app.prepare().then(() => {
  const server = express()

  server.use(shrinkRay()).use(cookiesMiddleware())

  server.set('views', './common/server-views')
  server.set('view engine', 'pug')

  server.use((req, res, _next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    _next()
  })

  // Use the `renderAndCache` utility defined below to serve pages
  server.get('/', (req, res) => {
    renderAndCache(req, res, '/')
  })

  server.get('/app/:appSlug', (req, res) => {
    renderAndCache(req, res, '/')
  })

  server.get('/apps', (req, res) => {
    renderAndCache(req, res, '/')
  })

  server.get('/platforms', (req, res) => {
    renderAndCache(req, res, '/platforms')
  })
  server.get('/platforms/all', (req, res) => {
    renderAndCache(req, res, '/platforms/all')
  })
  server.get('/platforms/:platform', (req, res) => {
    renderAndCache(req, res, '/platforms', { platform: req.params.platform })
  })

  server.get('/categories', (req, res) => {
    renderAndCache(req, res, '/categories')
  })

  server.get('/categories/all', (req, res) => {
    renderAndCache(req, res, '/categories/all')
  })
  server.get('/categories/:category', (req, res) => {
    renderAndCache(req, res, '/categories', { category: req.params.category })
  })
  server.get('/category/:category', (req, res) => {
    res.redirect(`/categories/${req.params.category}`)
  })

  server.get('/faq', (req, res) => {
    renderAndCache(req, res, '/faq')
  })

  server.get('/submit', (req, res) => {
    renderAndCache(req, res, '/submit')
  })

  server.get('/admin', (req, res) => {
    renderAndCache(req, res, '/admin')
  })

  server.get('/admin/app', (req, res) => {
    renderAndCache(req, res, '/admin/app')
  })

  server.get('/admin/pending', (req, res) => {
    renderAndCache(req, res, '/admin/pending')
  })

  server.get('/all', (req, res) => {
    renderAndCache(req, res, '/all')
  })

  server.get('/clear-cache', (req, res) => {
    if (req.query.key === process.env.API_KEY) {
      console.log('Clearing cache from API')
      ssrCache.reset()
      res.json({ success: true })
    } else {
      res.status(400).json({ success: false })
    }
  })

  server.use('/rss', RSSController)

  server.get('*', (req, res) => handle(req, res))

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
