import * as Constants from './constants'
import fetch from 'cross-fetch'

const submittingApp = () => ({
  type: Constants.SUBMITTING_APP
})

const submittedApp = () => ({
  type: Constants.SUBMITTED_APP
})

const submitApp = (submission, apiServer) => async function innerSubmittingApp(dispatch) {
  dispatch(submittingApp())
  // send submission
  console.log(submission)
  const url = `${apiServer}/api/app-mining-submission`
  await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(submission)
  })
  dispatch(submittedApp())

  // setTimeout(() => {
  //   dispatch(submittedApp())
  // }, 5000)
  // dispatch(submittedApp())
}

export default {
  submitApp
}
