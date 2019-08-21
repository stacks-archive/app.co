const AppsAggregator = require('./aggregators/apps')
const AppMiningMonths = require('./aggregators/mining-months')
const RankedApps = require('./aggregators/ranked-apps')

const getApps = () => AppsAggregator.fetch()

const getAppMiningMonths = () => AppMiningMonths.fetch()

const getRankedBlockstackApps = () => RankedApps.fetch()

module.exports = {
  getApps,
  getAppMiningMonths,
  getRankedBlockstackApps
}
