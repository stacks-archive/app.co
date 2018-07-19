import { SUBMIT_EMAIL_ERROR, SUBMIT_EMAIL_FINISHED, SUBMIT_EMAIL_STARTED } from '@stores/newsletter'
import fetch from 'cross-fetch'

const doSubmitEmail = (email) => async (dispatch) => {
  dispatch({
    type: SUBMIT_EMAIL_STARTED
  })

  try {
    const url = 'https://app-co-api.herokuapp.com/api/subscribe'
    const data = { email }
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    dispatch({
      type: SUBMIT_EMAIL_FINISHED
    })
  } catch (error) {
    dispatch({
      type: SUBMIT_EMAIL_ERROR,
      error
    })
  }
}

export { doSubmitEmail }
