const constants = {
  SET_PLATFORM: 'SET_PLATFORM',
  SELECT_APP: 'SELECT_APP',
};

const actions = {
  setPlatformFilter(platform) {
    return {
      type: constants.SET_PLATFORM,
      platform,
    };
  },
  selectApp(app) {
    return {
      type: constants.SELECT_APP,
      app,
    };
  },
};

const makeReducer = (data) => {
  console.log('reducer', data);
  const initialState = Object.assign({}, data, {
    platformFilter: null,
    selectedApp: null,
  });

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case constants.SET_PLATFORM:
        return Object.assign({}, state, {
          platformFilter: action.platform,
        });
      case constants.SELECT_APP:
        return Object.assign({}, state, {
          selectedApp: action.app,
        });
      default:
        return state;
    }
  };

  return reducer;
};

export default {
  makeReducer,
  constants,
  actions,
};
