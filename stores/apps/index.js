const constants = {
  SET_PLATFORM: 'SET_PLATFORM',
  SELECT_APP: 'SELECT_APP',
  SAVING_APP: 'SAVING_APP',
  SAVED_APP: 'SAVED_APP',
  FETCHING_PENDING: 'FETCH_PENDING',
  FETCHED_PENDING: 'FETCHING_PENDING',
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

const fetchingPending = () => ({
  type: constants.FETCHING_PENDING,
});

const fetchedPending = (apps) => ({
  type: constants.FETCHED_PENDING,
  apps,
});

const fetchPendingApps = (apiServer, jwt) =>
  async function innerFetchPendingApps(dispatch) {
    dispatch(fetchingPending());
    const response = await fetch(`${apiServer}/api/admin/apps/pending`, {
      headers: new Headers({
        Authorization: `Bearer ${jwt}`,
      }),
    });
    // console.log(response.json());
    const { apps } = await response.json();
    console.log(apps);
    dispatch(fetchedPending(apps));
  };

const actions = {
  setPlatformFilter,
  selectApp,
  savingApp,
  savedApp,
  saveApp,
  fetchPendingApps,
};

const makeReducer = (data) => {
  const initialState = Object.assign({}, data, {
    platformFilter: null,
    selectedApp: null,
    isSavingApp: false,
    savedApp: null,
    isFetchingPending: false,
    pendingApps: [],
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
      case constants.FETCHING_PENDING:
        return Object.assign({}, state, {
          isFetchingPending: true,
        });
      case constants.FETCHED_PENDING:
        return Object.assign({}, state, {
          isFetchingPending: false,
          pendingApps: action.apps,
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
