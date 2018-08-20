import * as Constants from './constants'

const initialState = {
  isSubmitting: false,
  hasSubmitted: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case Constants.SUBMITTING_APP:
      return {
        isSubmitting: true,
        hasSubmitted: false
      }
    case Constants.SUBMITTED_APP:
      return {
        isSubmitting: false,
        hasSubmitted: true
      }
    default:
      return state
  }
}
