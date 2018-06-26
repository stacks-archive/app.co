const express = require('express');
const _ = require('lodash');

const { getApps } = require('../lib/api');
// const { makeFeed } = require('./common/lib/rss');

const apiServer = process.env.API_SERVER || 'https://app-co-api.herokuapp.com';

const router = express.Router();

router.get('/', async (req, res) => {
  const { apps } = await getApps(apiServer);
  const sorted = _.sortBy(apps, (app) => -new Date(app.createdAt).getTime());
  res.type('application/rss+xml');
  res.render('rss', {
    apps: sorted,
  });
});

module.exports = router;
