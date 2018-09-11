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

const savingMiningReport = () => ({
  type: Constants.SAVING_MINING_REPORT
})

const savedMiningReport = () => ({
  type: Constants.SAVED_MINING_REPORT
})

const deletingReviewer = () => ({
  type: Constants.DELETING_REVIEWER
})

const deletedReviewer = () => ({
  type: Constants.DELETED_REVIEWER
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

const saveReport = (report) => async function innerSaveReport(dispatch, getState) {
  dispatch(savingMiningReport())
  const state = getState()
  const { apiServer } = state.apps
  const { jwt } = state.user
  const url = `${apiServer}/api/admin/monthly-reports/${report.monthId}/upload`
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(report),
    headers: new Headers({
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json'
    })
  })
  dispatch(savedMiningReport())
}

const deleteReviewer = (reviewer) => async function innerDeleteReviewer(dispatch, getState) {
  dispatch(deletingReviewer())
  const state = getState()
  const { apiServer } = state.apps
  const { jwt } = state.user
  const url = `${apiServer}/api/admin/monthly-reports/${reviewer.reportId}/reviewers/${reviewer.id}`
  await fetch(url, {
    method: 'DELETE',
    headers: new Headers({
      Authorization: `Bearer ${jwt}`
    })
  })
  dispatch(deletedReviewer())
}

export default {
  fetchMiningMonths,
  saveMonth,
  saveReport,
  deleteReviewer
}
