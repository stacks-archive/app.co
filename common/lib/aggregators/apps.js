const _ = require('lodash')
const Aggregator = require('./aggregator')

module.exports = class AppsAggregator extends Aggregator {
  static async setter() {
    const data = await this.request(`/api/apps`)
    const apps = this.processApps(data)
    return apps
  }

  static async processApps(appsData) {
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
}
