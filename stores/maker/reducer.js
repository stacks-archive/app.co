import keyBy from 'lodash/keyBy';
import * as MakerActions from './actions';

const initialState = {
  loading: true,
  appIds: [],
  appEntities: {},
  selectedAppId: null,
  errorMessage: null
};

export const createMakerReducer = (serverState = {}) => {
  const startingState = {
    ...initialState,
    ...serverState,
    loading: !serverState.appIds
  };

  function makerReducer(state = startingState, action) {
    switch (action.type) {
      case MakerActions.MAKER_AUTH_ERROR:
        return {
          ...state,
          loading: false,
          errorMessage: 'Please sign in to access the maker portal.'
        };

      case MakerActions.FETCH_APPS_DONE:
        return {
          ...state,
          loading: false,
          appIds: action.payload.apps.map(app => app.id),
          appEntities: keyBy(action.payload.apps, 'id')
        };

      case MakerActions.SELECT_APP:
        return { ...state, selectedAppId: action.payload };

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
        };

      default:
        return state;
    }
  }

  return makerReducer;
};

export default createMakerReducer;
