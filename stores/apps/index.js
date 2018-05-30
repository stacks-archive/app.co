const constants = {
  SET_PLATFORM: 'SET_PLATFORM',
  SELECT_APP: 'SELECT_APP',
  SAVING_APP: 'SAVING_APP',
  SAVED_APP: 'SAVED_APP',
};

const setPlatformFilter = (platform) => ({
  type: constants.SET_PLATFORM,
  platform,
});
const selectApp = (app) => ({
  type: constants.SELECT_APP,
  app,
});
const savingApp = () => ({ type: constants.SAVING_APP });
const savedApp = (app) => ({
  type: constants.SAVED_APP,
  app,
});
const saveApp = (data, apiServer, jwt) =>
  async function innerSaveApp(dispatch) {
    console.log(data);
    dispatch(savingApp());
    const response = await fetch(`${apiServer}/api/admin/apps/${data.id}`, {
      method: 'POST',
      headers: new Headers({
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(data),
    });
    const { app } = response.json();
    dispatch(savedApp(app));
  };

const actions = {
  setPlatformFilter,
  selectApp,
  savingApp,
  savedApp,
  saveApp,
};

const makeReducer = (data) => {
  const initialState = Object.assign({}, data, {
    platformFilter: null,
    selectedApp: null,
    isSavingApp: false,
    savedApp: null,
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
      case constants.SAVING_APP:
        return Object.assign({}, state, {
          isSavingApp: true,
        });
      case constants.SAVED_APP:
        return Object.assign({}, state, {
          isSavingApp: false,
          savedApp: action.app,
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
