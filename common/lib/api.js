const request = require('request-promise')
const _ = require('lodash')

const { ssrCache } = require('./cache')

const dev = process.env.NODE_ENV !== 'production'
const API_CACHE_KEY = 'API_CACHE_KEY'
const BLOCKSTACK_RANKED_APPS_KEY = 'BLOCKSTACK_RANKED_APPS_KEY'
const MINING_RESULTS_KEY = 'MINING_RESULTS_KEY'

const processApps = (appsData) => {
  let categories = Object.keys(appsData.constants.appConstants.categoryEnums)
  let platforms = _.uniq(_.flatten([
    Object.keys(appsData.constants.appConstants.storageEnums),
    Object.keys(appsData.constants.appConstants.authenticationEnums),
    Object.keys(appsData.constants.appConstants.blockchainEnums)
  ]))
  const counts = {}
  platforms.forEach((platform) => {
    counts[platform] = 0
  })
  categories.forEach((category) => {
    counts[category] = 0
  })
  appsData.apps.forEach((app) => {
    if (app.categoryID === 14) { // blockstack sample apps
      return true
    }
    const appPlatforms = _.uniq([
      app.storageNetwork,
      app.blockchain,
      app.authentication
    ])
    const visits = app.Rankings[0] ? app.Rankings[0].monthlyVisitsCount || 0 : 0
    appPlatforms.forEach((platform) => { counts[platform] += visits })
    counts[app.category] += visits
    return app
  })
  categories = _.sortBy(categories, (category) => -counts[category])
  platforms = _.sortBy(platforms, (platform) => -counts[platform])
  return {
    categories,
    platforms,
    ...appsData
  }
}

const getApps = (apiServer) =>
  new Promise(async (resolve, reject) => {
    try {
      if ((!dev && await ssrCache.has(API_CACHE_KEY))) {
        return resolve(JSON.parse(await ssrCache.getAsync(API_CACHE_KEY)))
      }
      const response = await request(`${apiServer}/api/apps`)

      const data = JSON.parse(response)
      const apps = processApps(data)
      await ssrCache.setAsync(API_CACHE_KEY, JSON.stringify(apps))
      return resolve(apps)
    } catch (error) {
      return reject(error)
    }
  })

const getAppMiningMonths = (apiServer) =>
  new Promise(async (resolve, reject) => {
    try {
      if (await ssrCache.has(MINING_RESULTS_KEY)) {
        return resolve(JSON.parse(await ssrCache.getAsync(MINING_RESULTS_KEY)))
      }
      const { months } = await request({
        uri: `${apiServer}/api/app-mining-months`,
        json: true
      })

      await ssrCache.setAsync(MINING_RESULTS_KEY, JSON.stringify(months))
      return resolve(months)
    } catch (error) {
      console.log('Error when fetching mining months', error)
      return reject(error)
    }  
  })

const getRankedBlockstackApps = async (api) => {
  try {
    if (await ssrCache.has(BLOCKSTACK_RANKED_APPS_KEY)) {
      return JSON.parse(await ssrCache.getAsync(BLOCKSTACK_RANKED_APPS_KEY))
    }
    const months = await getAppMiningMonths(api)

    const rankings = months[months.length - 1].compositeRankings

    await ssrCache.setAsync(BLOCKSTACK_RANKED_APPS_KEY, JSON.stringify(rankings))
    return rankings
  } catch (error) {
    console.error('error when fetching ranked apps', error)
    return []
  }
  
}

module.exports = {
  getApps,
  getAppMiningMonths,
  getRankedBlockstackApps
}
