const request = require('request-promise')

const { ssrCache } = require('./cache')
const AppsAggregator = require('./aggregators/apps')

const dev = process.env.NODE_ENV !== 'production'
const API_CACHE_KEY = 'API_CACHE_KEY'
const BLOCKSTACK_RANKED_APPS_KEY = 'BLOCKSTACK_RANKED_APPS_KEY'
const MINING_RESULTS_KEY = 'MINING_RESULTS_KEY'

const getApps = async () => AppsAggregator.fetch()

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
