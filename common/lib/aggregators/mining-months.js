const Aggregator = require('./aggregator')

module.exports = class AppMiningMonths extends Aggregator {
  static async setter() {
    const { months } = await this.request('/api/app-mining-months')
    return months
  }
}
