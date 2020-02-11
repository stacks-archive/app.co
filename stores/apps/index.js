import { selectAllPlatforms } from '@stores/apps/selectors';
import { getTags, capitalize } from '@utils';
import { slugify } from '@common';

const constants = {
  SELECT_PLATFORM: 'SELECT_PLATFORM',
  CLEAR_PLATFORM: 'CLEAR_PLATFORM',
  SELECT_APP: 'SELECT_APP',
  CLEAR_APP: 'CLEAR_APP',
  SAVING_APP: 'SAVING_APP',
  SAVED_APP: 'SAVED_APP',
  FETCHING_PENDING: 'FETCH_PENDING',
  FETCHED_PENDING: 'FETCHING_PENDING',
  FETCHED_ADMIN_APPS: 'FETCHED_ADMIN_APPS',
  SELECT_CATEGORY: 'SELECT_CATEGORY',
  CLEAR_CATEGORY: 'CLEAR_CATEGORY',
  FETCHED_APP_MINING_APPS: 'FETCHED_APP_MINING_APPS'
};

export const doSelectPlatformFilter = platform => ({
  type: constants.SELECT_PLATFORM,
  platform
});
export const doClearPlatformFilter = () => ({
  type: constants.CLEAR_PLATFORM
});
export const doSelectApp = id => ({
  type: constants.SELECT_APP,
  id
});
export const doClearApp = () => ({
  type: constants.CLEAR_APP
});
const savingApp = () => ({ type: constants.SAVING_APP });
const savedApp = app => ({
  type: constants.SAVED_APP,
  app
});
const saveApp = (data, jwt) => async dispatch => {
  dispatch(savingApp());
  const response = await fetch(
    `${process.env.API_SERVER}/api/admin/apps/${data.id}`,
    {
      method: 'POST',
      headers: new Headers({
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(data)
    }
  );
  const resData = await response.json();
  dispatch(savedApp(resData.app));
};

const fetchingPending = () => ({
  type: constants.FETCHING_PENDING
});

const fetchedPending = apps => ({
  type: constants.FETCHED_PENDING,
  apps
});

export const doSelectCategoryFilter = category => ({
  type: constants.SELECT_CATEGORY,
  category
});
export const doClearCategoryFilter = () => ({
  type: constants.CLEAR_CATEGORY
});

const fetchedAdminApps = apps => ({
  type: constants.FETCHED_ADMIN_APPS,
  apps
});

const fetchedAppMiningApps = apps => ({
  type: constants.FETCHED_APP_MINING_APPS,
  apps
});

const fetchAdminApps = (jwt) => async dispatch => {
  const response = await fetch(`${process.env.API_SERVER}/api/admin/apps`, {
    method: 'GET',
    headers: new Headers({
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json'
    })
  });
  const data = await response.json();
  dispatch(fetchedAdminApps(data.apps));
};

const fetchPendingApps = (jwt) => async dispatch => {
  dispatch(fetchingPending());
  const response = await fetch(`${process.env.API_SERVER}/api/admin/apps/pending`, {
    headers: new Headers({
      Authorization: `Bearer ${jwt}`
    })
  });
  const data = await response.json();
  dispatch(fetchedPending(data.apps));
};

const fetchAppMiningApps = () => async (dispatch) => {
  const response = await fetch(`${process.env.API_SERVER}/api/app-mining-apps`);
  const data = await response.json();
  dispatch(fetchedAppMiningApps(data.apps));
};

const actions = {
  doSelectPlatformFilter,
  doSelectApp,
  savingApp,
  savedApp,
  saveApp,
  fetchPendingApps,
  fetchAdminApps,
  fetchAppMiningApps
};

export const selectAppsForPlatform = (apps, platform, blockstackRankedApps) => {
  if (platform.toLowerCase() === 'blockstack') {
    const rankedApps = blockstackRankedApps || [];
    const rankedAppsById = {};
    rankedApps.forEach(app => {
      rankedAppsById[app.id] = true;
    });
    apps.forEach(app => {
      if (!rankedAppsById[app.id]) {
        const isBlockstack =
          (app.authentication === 'Blockstack' ||
            app.storageNetwork === 'Gaia') &&
          app.categoryID !== 14;
        if (isBlockstack) {
          const { Rankings, ...rest } = app;
          rankedApps.push(rest);
        }
      }
    });
    return rankedApps;
  } else {
    return apps.filter(app => {
      const tags = getTags(app);
      if (platform.toLowerCase() === 'blockstack') {
        return (
          (app.authentication === 'Blockstack' ||
            app.storageNetwork === 'Gaia') &&
          app.categoryID !== 14
        );
      }
      return !!tags.find(tag => tag.toLowerCase() === platform.toLowerCase());
    });
  }
};

const makeReducer = data => {
  let initialState = data;

  if (!initialState.apps) {
    return () => null;
  }

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
      filteredApps: [],
      categoryFilter: null,
      platformName: null,
      categoryName: null
    };

    initialState = { ...data, ...emptyState };
  }

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case constants.SELECT_PLATFORM: {
        const { platform } = action;
        const { blockstackRankedApps } = state;
        const filteredApps = selectAppsForPlatform(
          state.apps,
          platform,
          blockstackRankedApps
        );
        const allPlatforms = selectAllPlatforms(state);
        const platformName =
          allPlatforms.find(_platform => slugify(_platform) === platform) ||
          capitalize(platform);
        return {
          ...state,
          platformFilter: platform,
          filteredApps,
          platformName,
          categoryFilter: null,
          categoryName: null
        };
      }
      case constants.CLEAR_PLATFORM: {
        if (
          state.platformFilter ||
          state.filteredApps.length ||
          state.platformName
        ) {
          return {
            ...state,
            platformFilter: null,
            filteredApps: [],
            platformName: null
          };
        }
        return state;
      }
      case constants.CLEAR_APP: {
        return {
          ...state,
          selectedAppId: null,
          selectedApp: null
        };
      }
      case constants.SELECT_APP: {
        const { id } = action;
        let selectedApp = null;
        if (Number.isInteger(id)) {
          selectedApp = state.apps.find(_app => _app.id === id);
        } else {
          selectedApp = state.apps.find(_app => {
            const slug = _app.Slugs.find(_slug => _slug.value === id);
            return !!slug;
          });
        }
        return {
          ...state,
          selectedAppId: id,
          selectedApp
        };
      }
      case constants.SAVING_APP:
        return {
          ...state,
          isSavingApp: true
        };
      case constants.SAVED_APP:
        return {
          ...state,
          isSavingApp: false,
          savedApp: action.app,
          selectedApp: action.app
        };
      case constants.FETCHING_PENDING:
        return {
          ...state,
          isFetchingPending: true
        };
      case constants.FETCHED_PENDING:
        return {
          ...state,
          isFetchingPending: false,
          pendingApps: action.apps
        };
      case constants.FETCHED_ADMIN_APPS: {
        const newState = { apps: action.apps };
        if (state.selectedAppId) {
          newState.selectedApp = action.apps.find(
            app => app.id === state.selectedAppId
          );
        }
        return {
          ...state,
          ...newState
        };
      }
      case constants.SELECT_CATEGORY: {
        const category = slugify(action.category);
        const filteredApps = state.apps.filter(
          app => app.category && slugify(app.category) === category
        );
        const categoryName = Object.keys(
          state.constants.appConstants.categoryEnums
        ).find(cat => slugify(cat) === category);
        return {
          ...state,
          categoryFilter: category,
          filteredApps,
          categoryName,
          platformFilter: null,
          platformName: null
        };
      }
      case constants.CLEAR_CATEGORY: {
        if (
          state.categoryFilter ||
          state.filteredApps.length ||
          state.categoryName
        ) {
          return {
            ...state,
            categoryFilter: null,
            filteredApps: [],
            categoryName: null
          };
        }
        return state;
      }
      case constants.FETCHED_APP_MINING_APPS: {
        return {
          ...state,
          appMiningApps: action.apps
        };
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
  actions
};

export { actions as appsActions };
