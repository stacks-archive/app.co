const express = require('express')
const next = require('next')
const dotenv = require('dotenv')
const compression = require('compression')
const cookiesMiddleware = require('universal-cookie-express')
const expressSitemapXml = require('express-sitemap-xml')
const fs = require('fs-extra')
const secure = require('express-force-https')
const morgan = require('morgan')

const dev = process.env.NODE_ENV !== 'production'
if (dev) {
  dotenv.config()
}

const { ssrCache } = require('./common/lib/cache')
const { getApps, getAppMiningMonths, getRankedBlockstackApps } = require('./common/lib/api')
const getSitemapURLs = require('./common/lib/sitemap')
const RSSController = require('./common/controllers/rss-controller')
const slugify = require('./common/lib/slugify')

const port = parseInt(process.env.PORT, 10) || 3000
const app = next({ dev })
const handle = app.getRequestHandler()

const apiServer = process.env.API_SERVER || 'https://api.app.co'

const pageCacheKey = (req) => {
  // return `req`
  const { path } = req
  if (path.indexOf('admin') !== -1) {
    return null
  }
  return `page-cache-key-${path}`
}

async function renderAndCache(req, res, pagePath, serverData) {
  try {
    const cacheKey = pageCacheKey(req)
    const USE_CACHE = true
    if (USE_CACHE && cacheKey && ssrCache.has(cacheKey) && !dev) {
      console.log('Cache hit:', req.path)
      res.setHeader('x-cache', 'HIT')
      return res.send(ssrCache.get(cacheKey))
    } else {
      console.log('Cache miss:', req.path)
    }
    const [data, blockstackRankedApps] = await Promise.all([
      getApps(apiServer),
      getRankedBlockstackApps(apiServer)
    ])
    data.apiServer = apiServer
    let appMiningMonths = []
    if (serverData && serverData.fetchMiningResults) {
      appMiningMonths = await getAppMiningMonths(apiServer)
    }

    const dataToPass = {
      ...data,
      ...serverData,
      blockstackRankedApps,
      appMiningMonths
    }
    const html = await app.renderToHTML(req, res, pagePath, dataToPass)
    if (cacheKey) {
      ssrCache.set(cacheKey, html)
    }
    return res.send(html)
  } catch (err) {
    console.log(err)
    return app.renderError(err, req, res, pagePath)
  }
}

const oldConsoleError = console.error
const oldConsoleWarn = console.warn

const checkMatch = (args, match) => {
  if (!args[0] || !args[0].indexOf) return false
  return args[0].indexOf(match) !== -1
}

console.error = (...args) => {
  if (checkMatch(args, 'Warning: React does not recognize')) return
  if (checkMatch(args, 'Warning: Failed prop type')) return
  if (checkMatch(args, 'for a non-boolean attribute') ) return
  if (checkMatch(args, 'Warning: Invalid value for prop')) return
  if (checkMatch(args, 'Failed to retrieve initialize state from localStorage')) return
  if (checkMatch(args, 'Unable to persist state to localStorage')) return
  oldConsoleError(...args)
}

console.warn = (...args) => {
  if (checkMatch(args, 'Failed to retrieve initialize state from localStorage')) return
  if (checkMatch(args, 'Unable to persist state to localStorage')) return
  oldConsoleWarn(...args)
}

app.prepare().then(() => {
  getApps(apiServer).then((apps) => {
    const server = express()

    if (!dev) {
      server.use(secure)
    }
    server.use(morgan('combined'))
    server.use(cookiesMiddleware())
    server.use(compression())

    server.set('views', './common/server-views')
    server.set('view engine', 'pug')

    server.use((req, res, _next) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', '*')
      _next()
    })

    server.get('/', (req, res) => renderAndCache(req, res, '/'))
    /**
     * Mining Pages
     */
    server.get('/mining', (req, res) => renderAndCache(req, res, '/mining'))
    server.get('/mining/apps', (req, res) => renderAndCache(req, res, '/mining/apps'))
    server.get('/mining/faq', (req, res) => renderAndCache(req, res, '/mining/faq'))
    server.get('/mining/terms', (req, res) => renderAndCache(req, res, '/mining/terms'))
    server.get('/mining/privacy', (req, res) => renderAndCache(req, res, '/mining/privacy'))
    server.get('/mining/developer-instructions', (req, res) =>
      renderAndCache(req, res, '/mining/developer-instructions')
    )
    server.get('/mining/reviewer-instructions', (req, res) => renderAndCache(req, res, '/mining/reviewer-instructions'))

    server.get('/mining/latest', async (req, res) => {
      try {
        const months = await getAppMiningMonths(apiServer)
        const latest = months[months.length - 1]
        const slug = slugify(latest.humanReadableDate)
        res.redirect(`/mining/${slug}`)
      } catch (error) {
        console.error(error)
        res.redirect('/mining')
      }
    })


    server.get('/mining/:date', (req, res) => {
      const { date } = req.params
      const [month, year] = date.split('-')
      renderAndCache(req, res, '/mining/month-results', { month, year, fetchMiningResults: true })
    })

    /**
     * App Pages
     */
    server.get('/app/:appSlug', (req, res) => renderAndCache(req, res, '/'))
    server.get('/apps', (req, res) => renderAndCache(req, res, '/'))
    /**
     * Platforms
     */
    server.get('/platforms', (req, res) => renderAndCache(req, res, '/platforms'))
    server.get('/platforms/all', (req, res) => renderAndCache(req, res, '/platforms'))
    // redirect to top-level page
    server.get('/platforms/:platform', (req, res) => res.redirect(`/${req.params.platform}`))
    server.get('/platform/:platform', (req, res) => res.redirect(`/${req.params.platform}`))
    /**
     * Categories
     */
    server.get('/categories', (req, res) => renderAndCache(req, res, '/categories'))
    server.get('/categories/all', (req, res) => renderAndCache(req, res, '/categories/all'))
    server.get('/categories/:category', (req, res) =>
      renderAndCache(req, res, '/categories', { category: req.params.category })
    )
    server.get('/category/:category', (req, res) => res.redirect(`/categories/${req.params.category}`))
    /**
     * General Pages
     */
    server.get('/faq', (req, res) => renderAndCache(req, res, '/faq'))
    server.get('/submit', (req, res) => renderAndCache(req, res, '/submit'))
    server.get('/all', (req, res) => renderAndCache(req, res, '/all'))
    server.get('/terms', (req, res) => renderAndCache(req, res, '/terms'))
    server.get('/privacy', (req, res) => renderAndCache(req, res, '/privacy'))

    /**
     * Admin Pages
     */

    server.get('/admin', (req, res) => renderAndCache(req, res, '/admin'))
    server.get('/admin/app', (req, res) => renderAndCache(req, res, '/admin/app'))
    server.get('/admin/pending', (req, res) => renderAndCache(req, res, '/admin/pending'))
    server.get('/admin/mining/months', (req, res) => renderAndCache(req, res, '/admin/mining/months'))
    server.get('/admin/mining/months/:id', (req, res) =>
      renderAndCache(req, res, '/admin/mining/month', { monthId: req.params.id })
    )
    server.get('/admin/mining/months/:id/upload-report', (req, res) =>
      renderAndCache(req, res, '/admin/mining/upload-report', { monthId: req.params.id })
    )
    server.get('/admin/mining/months/:monthId/reviewers/:reviewerId', (req, res) =>
      renderAndCache(req, res, '/admin/mining/reviewer')
    )

    apps.platforms.forEach((platform) => {
      server.get(`/${slugify(platform)}`, (req, res) => {
        req.params.platform = platform
        return renderAndCache(req, res, '/platforms', { platform })
      })
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
    server.use(expressSitemapXml(getSitemapURLs(apiServer), 'https://app.co'))

    server.get('/robots.txt', async (req, res) => {
      const robots = await fs.readFile('./static/robots.txt')
      res.header('Content-Type', 'text/plain')
      res.status(200).send(robots)
    })

    server.get('*', (req, res) => handle(req, res))

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
})
