const constants = {
  SET_PLATFORM: 'SET_PLATFORM',
};

const actions = {
  setPlatformFilter(platform) {
    return {
      type: constants.SET_PLATFORM,
      platform,
    };
  },
};

const makeReducer = (data) => {
  const initialState = Object.assign({}, data, {
    platformFilter: null,
  });

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case constants.SET_PLATFORM:
        return Object.assign({}, state, {
          platformFilter: action.platform,
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
