export const SUBMIT_EMAIL_STARTED = 'newsletter/SUBMIT_EMAIL_STARTED'
export const SUBMIT_EMAIL_FINISHED = 'newsletter/SUBMIT_EMAIL_FINISHED'
export const SUBMIT_EMAIL_ERROR = 'newsletter/SUBMIT_EMAIL_ERROR'
export const OPEN_NEWSLETTER_MODAL = 'newsletter/OPEN_NEWSLETTER_MODAL'
export const CLOSE_NEWSLETTER_MODAL = 'newsletter/CLOSE_NEWSLETTER_MODAL'

const initialState = {
  subscribed: false,
  submitting: false,
  error: false,
  lastAttempted: null,
  failedAttempts: 0,
  newsletterModalIsOpen: false
}

const reducer = (state = initialState, { type, error }) => {
  switch (type) {
    case SUBMIT_EMAIL_STARTED:
      return {
        ...state,
        submitting: true,
        lastAttempted: Date.now()
      }
    case SUBMIT_EMAIL_FINISHED:
      return {
        ...state,
        submitting: false,
        subscribed: true
      }
    case SUBMIT_EMAIL_ERROR:
      return {
        ...state,
        error,
        failedAttempts: state.failedAttempts + 1
      }
    case OPEN_NEWSLETTER_MODAL:
      return {
        ...state,
        newsletterModalIsOpen: true
      }
    case CLOSE_NEWSLETTER_MODAL:
      return {
        ...state,
        newsletterModalIsOpen: false
      }

    default:
      return state
  }
}

export default reducer
