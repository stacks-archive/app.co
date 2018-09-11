import * as Constants from './constants'

const initialState = {
  months: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case Constants.FETCHED_MINING_MONTHS: {
      return {
        ...state,
        months: action.months
      }
    }
    case Constants.SAVED_MINING_REPORT: {
      return {
        ...state,
        reportSaved: true
      }
    }
    default:
      return state
  }
}
