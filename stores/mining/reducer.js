import * as Constants from './constants'

const makeReducer = (data) => {
  const initialState = {
    isSubmitting: false,
    hasSubmitted: false
  }

  if (data.appMiningMonths) {
    initialState.appMiningMonths = data.appMiningMonths
  } else if (data.mining) {
    initialState.appMiningMonths = data.mining.appMiningMonths
  }

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case Constants.SUBMITTING_APP:
        return {
          ...state,
          isSubmitting: true,
          hasSubmitted: false
        }
      case Constants.SUBMITTED_APP:
        return {
          ...state,
          isSubmitting: false,
          hasSubmitted: true
        }
      default:
        return state
    }
  }

  return reducer
}

export default makeReducer
