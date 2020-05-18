/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const next = require('next');
const dotenv = require('dotenv');
const compression = require('compression');
const cookiesMiddleware = require('universal-cookie-express');
const expressSitemapXml = require('express-sitemap-xml');
const fs = require('fs-extra');
const secure = require('express-force-https');
const morgan = require('morgan');
const basicAuth = require('express-basic-auth');
const request = require('request-promise');
const keyBy = require('lodash/keyBy');
const { createMiddleware: createPrometheusMiddleware } = require('@promster/express');
const { createServer } = require('@promster/server');

const dev = process.env.NODE_ENV !== 'production';
if (dev) {
  dotenv.config();
}

const Cache = require('./common/lib/cache');
const {
  getApps,
  getAppMiningMonths,
  getRankedBlockstackApps
} = require('./common/lib/api');
const getSitemapURLs = require('./common/lib/sitemap');
const RSSController = require('./common/controllers/rss-controller');
const slugify = require('./common/lib/slugify');

const AppsAggregator = require('./common/lib/aggregators/apps');
const MiningMonths = require('./common/lib/aggregators/mining-months');
const RankedApps = require('./common/lib/aggregators/ranked-apps');
const MiningApps = require('./common/lib/aggregators/mining-apps');

const port = parseInt(process.env.PORT, 10) || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();

const apiServer = process.env.API_SERVER || 'https://api.app.co';

const pageCacheKey = req => {
  // return `req`
  const { path } = req;
  const isAdmin = path.indexOf('admin') !== -1;
  const isMaker = path.indexOf('maker') !== -1;
  const isSubmit = path.indexOf('submit') !== -1;
  if (isAdmin || isMaker || isSubmit) {
    return null;
  }
  return `page-cache-key-${path}`;
};

async function renderAndCache(req, res, pagePath, serverData) {
  try {
    const cacheKey = pageCacheKey(req);
    const USE_CACHE = true;
    if (USE_CACHE && cacheKey && (await Cache.has(cacheKey)) && !dev) {
      console.log('Cache hit:', req.path);
      res.setHeader('x-cache', 'HIT');
      return res.send(await Cache.getAsync(cacheKey));
    } else if (!dev) {
      console.log('Cache miss:', req.path);
    }
    const [
      data,
      blockstackRankedApps,
      appMiningMonths,
      appMiningApps
    ] = await Promise.all([
      getApps(),
      getRankedBlockstackApps(),
      getAppMiningMonths(),
      MiningApps.fetch()
    ]);
    data.apiServer = apiServer;

    const dataToPass = {
      ...data,
      ...serverData,
      blockstackRankedApps,
      appMiningMonths,
      appMiningApps,
      params: req.params
    };

    //
    // Handle Blockstack signin request
    const authResponseToken = req.query.authResponse;
    if (authResponseToken) {
      const authUrl = `${apiServer}/api/authenticate?authToken=${authResponseToken}`;
      const authResp = await request({
        method: 'POST',
        uri: authUrl,
        json: true
      });
      if (authResp.success) {
        dataToPass.user = authResp;
        req.universalCookies.set('jwt', authResp.token);
      }
    }

    if (req.universalCookies.get('jwt')) {
      const uri = `${apiServer}/api/maker/apps`;
      const json = await request({
        uri,
        json: true,
        auth: {
          bearer: req.universalCookies.get('jwt')
        }
      });
      dataToPass.maker = {
        appIds: json.apps.map(_app => _app.id),
        appEntities: keyBy(json.apps, 'id'),
        loading: false
      };
      if (req.params.appId) {
        dataToPass.maker.selectedAppId = parseInt(req.params.appId, 10);
      }
    }

    const html = await app.renderToHTML(req, res, pagePath, dataToPass);
    if (cacheKey) {
      try {
        await Cache.setAsync(cacheKey, html, 'EX', 60 * 60);
      } catch (error) {
        console.error('Error when saving page cache');
        console.error(error);
      }
    }
    return res.send(html);
  } catch (err) {
    console.error(err);
    return app.renderError(err, req, res, pagePath);
  }
}

const oldConsoleError = console.error;
const oldConsoleWarn = console.warn;

const checkMatch = (args, match) => {
  if (!args[0] || !args[0].indexOf) return false;
  return args[0].indexOf(match) !== -1;
};

console.error = (...args) => {
  if (checkMatch(args, 'Warning: React does not recognize')) return;
  if (checkMatch(args, 'Warning: Failed prop type')) return;
  if (checkMatch(args, 'for a non-boolean attribute')) return;
  if (checkMatch(args, 'Warning: Invalid value for prop')) return;
  if (checkMatch(args, 'Failed to retrieve initialize state from localStorage'))
    return;
  if (checkMatch(args, 'Unable to persist state to localStorage')) return;
  oldConsoleError(...args);
};

console.warn = (...args) => {
  if (checkMatch(args, 'Failed to retrieve initialize state from localStorage'))
    return;
  if (checkMatch(args, 'Unable to persist state to localStorage')) return;
  oldConsoleWarn(...args);
};

app.prepare().then(() => {
  getApps(apiServer).then((apps) => {
    const server = express();
    server.use(createPrometheusMiddleware({ app: server }));

    // Create `/metrics` endpoint on separate server
    if (!dev) {
      createServer({ port: 9153 }).then(() => console.log(`@promster/server started on port 9153.`));
    }

    if (!dev) {
      server.use(secure);
      server.use(morgan('combined'));
    }
    server.use(cookiesMiddleware());
    server.use(compression());

    if (process.env.AUTH_PASSWORD) {
      server.use(
        basicAuth({
          users: { admin: process.env.AUTH_PASSWORD },
          challenge: true
        })
      );
    }

    server.set('views', './common/server-views');
    server.set('view engine', 'pug');

    server.use((req, res, _next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', '*');
      _next();
    });

    server.get('/', (req, res) => renderAndCache(req, res, '/'));
    /**
     * Mining Pages
     */
    server.get('/mining', (req, res) => renderAndCache(req, res, '/mining'));
    server.get('/mining/apps', (req, res) =>
      renderAndCache(req, res, '/mining/apps')
    );
    server.get('/mining/faq', (req, res) =>
      renderAndCache(req, res, '/mining/faq')
    );
    server.get('/mining/terms', (req, res) =>
      renderAndCache(req, res, '/mining/terms')
    );
    server.get('/mining/privacy', (req, res) =>
      renderAndCache(req, res, '/mining/privacy')
    );
    server.get('/mining/developer-instructions', (req, res) =>
      renderAndCache(req, res, '/mining/developer-instructions')
    );
    server.get('/mining/reviewer-instructions', (req, res) =>
      renderAndCache(req, res, '/mining/reviewer-instructions')
    );

    server.get('/mining/latest', async (req, res) => {
      try {
        const months = await getAppMiningMonths(apiServer);
        const latest = months[months.length - 1];
        const slug = slugify(latest.humanReadableDate);
        res.redirect(`/mining/${slug}`);
      } catch (error) {
        console.error(error);
        res.redirect('/mining');
      }
    });

    server.get('/mining/:date', (req, res) => {
      const { date } = req.params;
      const [month, year] = date.split('-');
      renderAndCache(req, res, '/mining/month-results', {
        month,
        year,
        fetchMiningResults: true
      });
    });

    /**
     * App Pages
     */
    server.get('/app/:appSlug', (req, res) => renderAndCache(req, res, '/'));
    server.get('/apps', (req, res) => renderAndCache(req, res, '/'));
    /**
     * Platforms
     */
    server.get('/platforms', (req, res) =>
      renderAndCache(req, res, '/platforms')
    );
    server.get('/platforms/all', (req, res) =>
      renderAndCache(req, res, '/platforms')
    );
    // redirect to top-level page
    server.get('/platforms/:platform', (req, res) =>
      res.redirect(`/${req.params.platform}`)
    );
    server.get('/platform/:platform', (req, res) =>
      res.redirect(`/${req.params.platform}`)
    );
    /**
     * Categories
     */
    server.get('/categories', (req, res) =>
      renderAndCache(req, res, '/categories')
    );
    server.get('/categories/all', (req, res) =>
      renderAndCache(req, res, '/categories/all')
    );
    server.get('/categories/:category', (req, res) =>
      renderAndCache(req, res, '/categories', { category: req.params.category })
    );
    server.get('/category/:category', (req, res) =>
      res.redirect(`/categories/${req.params.category}`)
    );
    /**
     * General Pages
     */
    server.get('/faq', (req, res) => renderAndCache(req, res, '/faq'));
    server.get('/submit', (req, res) => res.redirect('/submit-your-app'));
    server.get('/submit-your-app', (req, res) =>
      renderAndCache(req, res, '/submit-your-app')
    );
    server.get('/all', (req, res) => renderAndCache(req, res, '/all'));
    server.get('/terms', (req, res) => renderAndCache(req, res, '/terms'));
    server.get('/privacy', (req, res) => renderAndCache(req, res, '/privacy'));

    /**
     * Admin Pages
     */

    server.get('/admin', (req, res) => renderAndCache(req, res, '/admin'));
    server.get('/admin/app', (req, res) =>
      renderAndCache(req, res, '/admin/app')
    );
    server.get('/admin/pending', (req, res) =>
      renderAndCache(req, res, '/admin/pending')
    );
    server.get('/admin/mining/months', (req, res) =>
      renderAndCache(req, res, '/admin/mining/months')
    );
    server.get('/admin/mining/months/:id', (req, res) =>
      renderAndCache(req, res, '/admin/mining/month', {
        monthId: req.params.id
      })
    );
    server.get('/admin/mining/months/:id/upload-report', (req, res) =>
      renderAndCache(req, res, '/admin/mining/upload-report', {
        monthId: req.params.id
      })
    );
    server.get(
      '/admin/mining/months/:monthId/reviewers/:reviewerId',
      (req, res) => renderAndCache(req, res, '/admin/mining/reviewer')
    );

    /**
     * Maker pages
     */
    server.get('/maker', (req, res) => res.redirect('maker/apps'));
    server.get('/maker/apps', (req, res) =>
      renderAndCache(req, res, '/maker/apps')
    );
    server.get('/maker/apps/blockstack-only', (req, res) =>
      renderAndCache(req, res, '/maker/apps/blockstack-only')
    );
    server.get('/maker/apps/:appId', (req, res) =>
      renderAndCache(req, res, '/maker/apps/:appId')
    );
    server.get('/maker/:accessToken', (req, res) =>
      renderAndCache(req, res, '/maker/magic-link', {
        accessToken: req.params.accessToken
      })
    );

    server.get('/blockstack', (req, res) => {
      res.redirect('https://www2.blockstack.org/apps');
    });

    apps.platforms.forEach(platform => {
      server.get(`/${slugify(platform)}`, (req, res) => {
        req.params.platform = platform;
        return renderAndCache(req, res, '/platforms', { platform });
      });
    });

    server.get('/clear-cache', async (req, res) => {
      if (req.query.key === process.env.API_KEY) {
        console.log('Clearing cache from API');
        try {
          await Promise.all([
            AppsAggregator.set(),
            MiningMonths.set(),
            MiningApps.set()
          ]);
          await RankedApps.set();
          await Cache.reset();
          res.json({ success: true });
        } catch (error) {
          console.error(error);
          res.status(500).json({ success: false });
        }
      } else {
        res.status(400).json({ success: false });
      }
    });

    server.use('/rss', RSSController);
    server.use(expressSitemapXml(getSitemapURLs(apiServer), 'https://app.co'));

    server.get('/status', (_req, res) => {
      res.json({ success: true });
    });

    server.get('/robots.txt', async (req, res) => {
      const robotsFile =
        dev || process.env.STAGING ? 'robots.staging.txt' : 'robots.txt';
      const robotsPath = `./static/${robotsFile}`;
      const robots = await fs.readFile(robotsPath);
      res.header('Content-Type', 'text/plain');
      res.status(200).send(robots);
    });

    server.get('*', (req, res) => handle(req, res));

    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  });
});
