export const SUBMIT_EMAIL_STARTED = 'newsletter/SUBMIT_EMAIL_STARTED'
export const SUBMIT_EMAIL_FINISHED = 'newsletter/SUBMIT_EMAIL_FINISHED'
export const SUBMIT_EMAIL_ERROR = 'newsletter/SUBMIT_EMAIL_ERROR'

const initialState = {
  subscribed: false,
  submitting: false,
  error: false,
  lastAttempted: null,
  failedAttempts: 0
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
        error,
        failedAttempts: state.failedAttempts + 1
      }

    default:
      return state
  }
}

export default reducer
