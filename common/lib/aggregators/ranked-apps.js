const Aggregator = require('./aggregator')
const MiningMonths = require('./mining-months')

module.exports = class RankedApps extends Aggregator {
  static async setter() {
    const months = await MiningMonths.fetch()
    const rankings = months[months.length - 1].compositeRankings
    return rankings
  }
}
