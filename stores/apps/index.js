const initialState = {
  apps: [],
  platformFilter: null,
};

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

export default {
  reducer,
  constants,
  actions,
};
