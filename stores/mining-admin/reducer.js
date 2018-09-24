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
    case Constants.SAVING_MINING_REPORT: {
      return {
        ...state,
        uploadReportError: null
      }
    }
    case Constants.SAVED_MINING_REPORT: {
      return {
        ...state,
        reportSaved: true
      }
    }
    case Constants.ERROR_MINING_REPORT: {
      return {
        ...state,
        uploadReportError: action.message
      }
    }
    default:
      return state
  }
}
