import assignIn from 'lodash/assignIn'

import { getTags, capitalize } from '@utils'
import { selectAllPlatforms } from '@stores/apps/selectors'
import { slugify } from '@common'

const constants = {
  SELECT_PLATFORM: 'SELECT_PLATFORM',
  SELECT_APP: 'SELECT_APP',
  CLEAR_APP: 'CLEAR_APP',
  SAVING_APP: 'SAVING_APP',
  SAVED_APP: 'SAVED_APP',
  FETCHING_PENDING: 'FETCH_PENDING',
  FETCHED_PENDING: 'FETCHING_PENDING',
  FETCHED_ADMIN_APPS: 'FETCHED_ADMIN_APPS',
  SELECT_CATEGORY: 'SELECT_CATEGORY',
  CLEAR_CATEGORY: 'CLEAR_CATEGORY'
}

export const doSelectPlatformFilter = (platform) => ({
  type: constants.SELECT_PLATFORM,
  platform
})
export const doSelectApp = (id) => ({
  type: constants.SELECT_APP,
  id
})
export const doClearApp = () => ({
  type: constants.CLEAR_APP
})
const savingApp = () => ({ type: constants.SAVING_APP })
const savedApp = (app) => ({
  type: constants.SAVED_APP,
  app
})
const saveApp = (data, apiServer, jwt) => async (dispatch) => {
  dispatch(savingApp())
  const response = await fetch(`${apiServer}/api/admin/apps/${data.id}`, {
    method: 'POST',
    headers: new Headers({
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(data)
  })
  const { app } = await response.json()
  dispatch(savedApp(app))
}

const fetchingPending = () => ({
  type: constants.FETCHING_PENDING
})

const fetchedPending = (apps) => ({
  type: constants.FETCHED_PENDING,
  apps
})

export const doSelectCategoryFilter = (category) => ({
  type: constants.SELECT_CATEGORY,
  category
})
export const doClearCategoryFilter = () => ({
  type: constants.CLEAR_CATEGORY
})

const fetchedAdminApps = (apps) => ({
  type: constants.FETCHED_ADMIN_APPS,
  apps
})

const fetchAdminApps = (apiServer, jwt) => async (dispatch) => {
  const response = await fetch(`${apiServer}/api/admin/apps`, {
    method: 'GET',
    headers: new Headers({
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json'
    })
  })
  const { apps } = await response.json()
  dispatch(fetchedAdminApps(apps))
}

const fetchPendingApps = (apiServer, jwt) => async (dispatch) => {
  dispatch(fetchingPending())
  const response = await fetch(`${apiServer}/api/admin/apps/pending`, {
    headers: new Headers({
      Authorization: `Bearer ${jwt}`
    })
  })
  const { apps } = await response.json()
  dispatch(fetchedPending(apps))
}

const actions = {
  doSelectPlatformFilter,
  doSelectApp,
  savingApp,
  savedApp,
  saveApp,
  fetchPendingApps,
  fetchAdminApps
}

export const selectAppsForPlatform = (apps, platform) =>
  apps.filter((app) => {
    const tags = getTags(app)
    if (platform === 'blockstack') {
      return app.authentication === 'Blockstack' || app.storageNetwork === 'Gaia'
    }
    return !!tags.find((tag) => tag.toLowerCase() === platform.toLowerCase())
  })

const makeReducer = (data) => {
  let initialState = data

  if (initialState.apps.apps) {
    initialState = initialState.apps
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
    }

    initialState = assignIn(data, emptyState)
  }

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case constants.SELECT_PLATFORM: {
        const { platform } = action
        const filteredApps = selectAppsForPlatform(state.apps, platform)
        const allPlatforms = selectAllPlatforms(state)
        const platformName =
          allPlatforms.find((_platform) => _platform.toLowerCase() === platform.toLowerCase()) || capitalize(platform)
        return {
          ...state,
          platformFilter: platform,
          filteredApps,
          platformName
        }
      }
      case constants.CLEAR_APP: {
        return {
          ...state,
          selectedAppId: null,
          selectedApp: null
        }
      }
      case constants.SELECT_APP: {
        const { id } = action
        let selectedApp = null
        if (Number.isInteger(id)) {
          selectedApp = state.apps.find((_app) => _app.id === id)
        } else {
          selectedApp = state.apps.find((_app) => {
            const slug = _app.Slugs.find((_slug) => _slug.value === id)
            return !!slug
          })
        }
        return {
          ...state,
          selectedAppId: id,
          selectedApp
        }
      }
      case constants.SAVING_APP:
        return {
          ...state,
          isSavingApp: true
        }
      case constants.SAVED_APP:
        return {
          isSavingApp: false,
          savedApp: action.app,
          selectedApp: action.app
        }
      case constants.FETCHING_PENDING:
        return Object.assign({}, state, {
          isFetchingPending: true
        })
      case constants.FETCHED_PENDING:
        return {
          ...state,
          isFetchingPending: false,
          pendingApps: action.apps
        }
      case constants.FETCHED_ADMIN_APPS: {
        const newState = { apps: action.apps }
        if (state.selectedAppId) {
          newState.selectedApp = action.apps.find((app) => app.id === state.selectedAppId)
        }
        return {
          ...state,
          ...newState
        }
      }
      case constants.SELECT_CATEGORY: {
        const category = slugify(action.category)
        const filteredApps = state.apps.filter((app) => app.category && slugify(app.category) === category)
        const categoryName = Object.keys(state.constants.appConstants.categoryEnums).find(
          (cat) => slugify(cat) === category
        )
        return {
          ...state,
          categoryFilter: category,
          filteredApps,
          categoryName
        }
      }
      case constants.CLEAR_CATEGORY: {
        if (state.categoryFilter || state.filteredApps.length || state.categoryName) {
          return {
            ...state,
            categoryFilter: null,
            filteredApps: [],
            categoryName: null
          }
        }
        return state
      }
      default:
        return state
    }
  }

  return reducer
}

export default {
  makeReducer,
  constants,
  actions
}
