import { SUBMIT_APP_STARTED, SUBMIT_APP_FINISHED } from '@stores/mining/constants'

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

  const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case SUBMIT_APP_STARTED:
        return {
          ...state,
          isSubmitting: true,
          hasSubmitted: false
        }
      case SUBMIT_APP_FINISHED:
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
