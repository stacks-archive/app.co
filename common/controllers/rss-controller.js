const express = require('express')
const _ = require('lodash')

const { getApps } = require('../lib/api')
// const { makeFeed } = require('./common/lib/rss');

const apiServer = process.env.API_SERVER || 'https://app-co-api.herokuapp.com'

const router = express.Router()

router.get('/', async (req, res) => {
  let { apps } = await getApps(apiServer)
  apps = _.sortBy(apps, (app) => -new Date(app.createdAt).getTime())
  const forbiddenCategories = ['Sample Blockstack Apps', 'Pyramid Schemes']
  apps = _.filter(apps, (app) => forbiddenCategories.indexOf(app.category) === -1)
  res.type('application/rss+xml')
  res.render('rss', {
    apps
  })
})

module.exports = router
