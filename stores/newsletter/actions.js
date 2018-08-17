import {
  SUBMIT_EMAIL_ERROR,
  SUBMIT_EMAIL_FINISHED,
  SUBMIT_EMAIL_STARTED,
  OPEN_NEWSLETTER_MODAL,
  CLOSE_NEWSLETTER_MODAL
} from '@stores/newsletter'
import fetch from 'cross-fetch'

const doSubmitEmail = (email, callback) => async (dispatch) => {
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
    if (callback) {
      callback()
    }
  } catch (error) {
    dispatch({
      type: SUBMIT_EMAIL_ERROR,
      error
    })
  }
}

const openNewsletterModal = () => ({
  type: OPEN_NEWSLETTER_MODAL
})

const closeNewsletterModal = () => ({
  type: CLOSE_NEWSLETTER_MODAL
})

export default {
  doSubmitEmail,
  openNewsletterModal,
  closeNewsletterModal
}
