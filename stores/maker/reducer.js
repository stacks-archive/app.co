import keyBy from 'lodash/keyBy'
import * as MakerActions from './actions'

const initialState = {
  loading: true,
  apps: [],
  appIds: [],
  appEntities: {},
  selectedAppId: null,
  errorMessage: null
}

function makerReducer(state = initialState, action) {
  switch (action.type) {

    case MakerActions.MAKER_AUTH_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: 'Please sign in to access the maker portal.'
      }

    case MakerActions.FETCH_APPS_DONE:
      return {
        ...state,
        loading: false,
        appIds: action.payload.apps.map(app => app.id),
        appEntities: keyBy(action.payload.apps, 'id')
        // selectedAppId: action.payload.apps.length ? action.payload.apps[0].id : null
      }

    case MakerActions.SELECT_APP:
      return { ...state, selectedAppId: action.payload }

    case MakerActions.SAVE_PAYMENT_DETAILS_DONE:
      return {
        ...state,
        appEntities: {
          ...state.appEntities,
          [action.payload.appId]: {
            ...state.appEntities[action.payload.appId],
            BTCAddress: action.payload.btcAddress,
            stacksAddress: action.payload.stxAddress
          }
        }
      }

    default:
      return state
  }
}

export default makerReducer
