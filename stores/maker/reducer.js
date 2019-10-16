import { keyBy } from 'lodash'
import * as MakerActions from './actions'

const initialState = {
  loading: true,
  apps: [],
  appIds: [],
  appEntities: {},
  errorMessage: null,
  status: {
    paymentDetailsComplete: false,
    kycComplete: false,
    legalComplete: false
  }
}

const updateStatus = (state, props) => ({
  ...state,
  status: { ...state.status, ...props }
})

function makerReducer(state = initialState, action) {
  switch (action.type) {
    case MakerActions.SET_LOADING_DONE:
      return {
        ...state,
        loading: false
      }

    case MakerActions.MAKER_AUTH_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: 'Please sign in to access the maker portal.'
      }

    case MakerActions.FETCH_APPS_DONE:
      return {
        ...state,
        appIds: action.payload.apps.map(app => app.id),
        appEntities: keyBy(action.payload.apps, 'id')
      }

    case MakerActions.SET_PAYMENT_DETAILS_COMPLETE:
      return updateStatus(state, { paymentDetailsComplete: true })

    case MakerActions.SET_KYC_COMPLETE:
      return updateStatus(state, { kycComplete: true })

    case MakerActions.SET_LEGAL_COMPLETE:
      return updateStatus(state, { legalComplete: true })

    default:
      return state
  }
}

export default makerReducer

export const selectMaker = state => state.maker
export const selectAppList = state => state.maker.appIds.map(id => state.maker.appEntities[id])
