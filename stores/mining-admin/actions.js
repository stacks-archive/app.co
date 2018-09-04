import * as Constants from './constants'

const fetchingMiningMonths = () => ({
  type: Constants.FETCHING_MINING_MONTHS
})

const fetchedMiningMonths = (months) => ({
  type: Constants.FETCHED_MINING_MONTHS,
  months
})

const fetchMiningMonths = () => async function innerFetchMiningMonths(dispatch, getState) {
  dispatch(fetchingMiningMonths())
  const state = getState()
  const { apiServer } = state.apps
  const { jwt } = state.user
  console.log(apiServer, jwt)
  const url = `${apiServer}/api/admin/monthly-reports`
  const response = await fetch(url, {
    headers: new Headers({
      Authorization: `Bearer ${jwt}`
    })
  })
  const { reports } = await response.json()
  console.log(reports)
  dispatch(fetchedMiningMonths(reports))
}

export default {
  fetchMiningMonths
}
