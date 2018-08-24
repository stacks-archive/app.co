const express = require('express')
const next = require('next')
const dotenv = require('dotenv')
const compression = require('compression')
const cookiesMiddleware = require('universal-cookie-express')
const expressSitemapXml = require('express-sitemap-xml')
const fs = require('fs-extra')
const secure = require('express-force-https')

const dev = process.env.NODE_ENV !== 'production'
if (dev) {
  dotenv.config()
}

const { ssrCache } = require('./common/lib/cache')
const { getApps } = require('./common/lib/api')
const getSitemapURLs = require('./common/lib/sitemap')
const RSSController = require('./common/controllers/rss-controller')
const slugify = require('./common/lib/slugify')

const port = parseInt(process.env.PORT, 10) || 3000
const app = next({ dev })
const handle = app.getRequestHandler()

const apiServer = process.env.API_SERVER || 'https://app-co-api-staging.herokuapp.com'

async function renderAndCache(req, res, pagePath, serverData) {
  try {
    const data = await getApps(apiServer)
    data.apiServer = apiServer

    const dataToPass = {
      ...data,
      ...serverData
    }
    const html = await app.renderToHTML(req, res, pagePath, dataToPass)
    res.send(html)
  } catch (err) {
    console.log(err)
    app.renderError(err, req, res, pagePath)
  }
}

app.prepare().then(() => {
  getApps(apiServer).then((apps) => {
    const server = express()

    if (!dev) {
      server.use(secure)
    }
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
    server.get('/mining', (req, res) => renderAndCache(req, res, '/mining'))
    server.get('/app/:appSlug', (req, res) => renderAndCache(req, res, '/'))
    server.get('/apps', (req, res) => renderAndCache(req, res, '/'))
    server.get('/platforms', (req, res) => renderAndCache(req, res, '/platforms'))
    server.get('/platforms/all', (req, res) => renderAndCache(req, res, '/platforms'))
    // redirect to top-level page
    server.get('/platforms/:platform', (req, res) => res.redirect(`/${req.params.platform}`))
    server.get('/platform/:platform', (req, res) => res.redirect(`/${req.params.platform}`))
    server.get('/categories', (req, res) => renderAndCache(req, res, '/categories'))
    server.get('/categories/all', (req, res) => renderAndCache(req, res, '/categories/all'))
    server.get('/categories/:category', (req, res) =>
      renderAndCache(req, res, '/categories', { category: req.params.category })
    )
    server.get('/category/:category', (req, res) => res.redirect(`/categories/${req.params.category}`))
    server.get('/faq', (req, res) => renderAndCache(req, res, '/faq'))
    server.get('/submit', (req, res) => renderAndCache(req, res, '/submit'))
    server.get('/admin', (req, res) => renderAndCache(req, res, '/admin'))
    server.get('/admin/app', (req, res) => renderAndCache(req, res, '/admin/app'))
    server.get('/admin/pending', (req, res) => renderAndCache(req, res, '/admin/pending'))
    server.get('/all', (req, res) => renderAndCache(req, res, '/all'))
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
