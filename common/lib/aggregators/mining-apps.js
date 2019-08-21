const Aggregator = require('./aggregator')

module.exports = class MiningApps extends Aggregator {
  static async setter() {
    const { apps } = await this.request('/api/app-mining-apps')
    return apps
  }
}
