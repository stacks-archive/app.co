const request = require('request-promise')
const _ = require('lodash')

const { ssrCache } = require('./cache')

const dev = process.env.NODE_ENV !== 'production'
const API_CACHE_KEY = 'API_CACHE_KEY'

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
    const appPlatforms = _.uniq([
      app.storageNetwork,
      app.blockchain,
      app.authentication
    ])
    const visits = app.Rankings[0] ? app.Rankings[0].monthlyVisitsCount || 0 : 0
    appPlatforms.forEach((platform) => { counts[platform] += visits })
    counts[app.category] += visits
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
      if (ssrCache.has(API_CACHE_KEY) && !dev) {
        return resolve(JSON.parse(ssrCache.get(API_CACHE_KEY)))
      }
      const response = await request(`${apiServer}/api/apps`)

      const data = JSON.parse(response)
      const apps = processApps(data)
      ssrCache.set(API_CACHE_KEY, JSON.stringify(apps))
      return resolve(apps)
    } catch (error) {
      return reject(error)
    }
  })

module.exports = {
  getApps
}
