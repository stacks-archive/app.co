const express = require('express');
const next = require('next');
const LRUCache = require('lru-cache');

require('dotenv').config();

const { App } = require('./db/models');
const { saveRanking } = require('./common/lib/twitter');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// This is where we cache our rendered HTML pages
const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60, // 1hour
});

/*
 * NB: make sure to modify this to take into account anything that should trigger
 * an immediate page change (e.g a locale stored in req.session)
 */
function getCacheKey(req) {
  return `${req.url}`;
}

async function renderAndCache(req, res, pagePath) {
  const key = getCacheKey(req);

  // If we have a page in the cache, let's serve it
  if (ssrCache.has(key)) {
    res.setHeader('x-cache', 'HIT');
    console.log('cache hit');
    res.send(ssrCache.get(key));
    return;
  }

  try {
    const apps = await App.findAll();
    // If not let's render the page into HTML
    const html = await app.renderToHTML(req, res, pagePath, { apps });

    // Something is wrong with the request, let's skip the cache
    if (res.statusCode !== 200) {
      res.send(html);
      return;
    }

    // Let's cache this page
    ssrCache.set(key, html);

    res.setHeader('x-cache', 'MISS');
    console.log('cache miss');
    res.send(html);
  } catch (err) {
    app.renderError(err, req, res, pagePath);
  }
}

app.prepare().then(() => {
  const server = express();

  server.post('/api/fetch_rankings', async (req, res) => {
    if (process.env.API_KEY === req.query.key) {
      const apps = await App.findAll();
      const fetchRankings = apps.map((appModel) => saveRanking(appModel));
      Promise.all(fetchRankings)
        .then(() => {
          res.send('OK');
        })
        .catch((error) => {
          console.log('api error', error);
          res.status(500).send('API Error.');
        });
    } else {
      res.status(400).send('Bad Request');
    }
  });

  // Use the `renderAndCache` utility defined below to serve pages
  server.get('/', (req, res) => {
    renderAndCache(req, res, '/');
  });

  server.get('*', (req, res) => handle(req, res));

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
