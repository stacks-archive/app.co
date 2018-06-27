import find from 'lodash/find';
import assignIn from 'lodash/assignIn';

const constants = {
  SET_PLATFORM: 'SET_PLATFORM',
  SELECT_APP: 'SELECT_APP',
  SAVING_APP: 'SAVING_APP',
  SAVED_APP: 'SAVED_APP',
  FETCHING_PENDING: 'FETCH_PENDING',
  FETCHED_PENDING: 'FETCHING_PENDING',
  FETCHED_ADMIN_APPS: 'FETCHED_ADMIN_APPS',
};

const setPlatformFilter = (platform) => ({
  type: constants.SET_PLATFORM,
  platform,
});
export const doSelectApp = (id) => ({
  type: constants.SELECT_APP,
  id,
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
    const { app } = await response.json();
    dispatch(savedApp(app));
  };

const fetchingPending = () => ({
  type: constants.FETCHING_PENDING,
});

const fetchedPending = (apps) => ({
  type: constants.FETCHED_PENDING,
  apps,
});

const fetchedAdminApps = (apps) => ({
  type: constants.FETCHED_ADMIN_APPS,
  apps,
});

const fetchAdminApps = (apiServer, jwt) =>
  async function innerFetchAdminApps(dispatch) {
    const response = await fetch(`${apiServer}/api/admin/apps`, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      }),
    });
    const { apps } = await response.json();
    dispatch(fetchedAdminApps(apps));
  };

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
  doSelectApp,
  savingApp,
  savedApp,
  saveApp,
  fetchPendingApps,
  fetchAdminApps,
};

const makeReducer = (data) => {
  let initialState = data;

  if (initialState.apps.apps) {
    initialState = initialState.apps;
  } else {
    const emptyState = {
      platformFilter: null,
      selectedApp: null,
      selectedAppId: null,
      isSavingApp: false,
      savedApp: null,
      isFetchingPending: false,
      pendingApps: [],
    };

    initialState = assignIn(data, emptyState);
  }

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case constants.SET_PLATFORM:
        return Object.assign({}, state, {
          platformFilter: action.platform,
        });
      case constants.SELECT_APP: {
        const { id } = action;
        let app = null;
        if (Number.isInteger(id)) {
          app = state.apps.find((_app) => _app.id === id);
        } else {
          app = state.apps.find((_app) => {
            const slug = _app.Slugs.find((_slug) => _slug.value === id);
            return !!slug;
          });
        }
        return Object.assign({}, state, {
          selectedAppId: id,
          selectedApp: app,
        });
      }
      case constants.SAVING_APP:
        return Object.assign({}, state, {
          isSavingApp: true,
        });
      case constants.SAVED_APP:
        return Object.assign({}, state, {
          isSavingApp: false,
          savedApp: action.app,
          selectedApp: action.app,
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
      case constants.FETCHED_ADMIN_APPS: {
        console.log('fetched admin apps');
        const newState = { apps: action.apps };
        if (state.selectedAppId) {
          console.log('existing selectedApp', state.selectedApp);
          newState.selectedApp = find(action.apps, (app) => app.id === state.selectedAppId);
          console.log('new selectedApp', newState.selectedApp.status);
        }
        return Object.assign({}, state, newState);
      }
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
