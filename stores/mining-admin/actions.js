import * as Constants from './constants'

const fetchingMiningMonths = () => ({
  type: Constants.FETCHING_MINING_MONTHS
})

const fetchedMiningMonths = (months) => ({
  type: Constants.FETCHED_MINING_MONTHS,
  months
})

const savingMiningMonth = () => ({
  type: Constants.SAVING_MINING_MONTH
})

const savedMiningMonth = () => ({
  type: Constants.SAVED_MINING_MONTH
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

const saveMonth = (month) => async function innerSaveMonth(dispatch, getState) {
    dispatch(savingMiningMonth())
    const state = getState()
    const { apiServer } = state.apps
    const { jwt } = state.user
    const url = `${apiServer}/api/admin/monthly-reports/${month.id}`
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(month),
      headers: new Headers({
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      })
    })
    dispatch(savedMiningMonth())
  }

export default {
  fetchMiningMonths,
  saveMonth
}
