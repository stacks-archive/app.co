// this should probs be renamed so it's not apps.apps
export const selectApps = state => state.apps && state.apps.apps;
export const selectCurrentApp = state => state.apps && state.apps.selectedApp;

export const selectUser = state => state.user;

export const selectFilteredApps = state =>
  state.apps && state.apps.filteredApps;
export const selectPlatformFilter = state =>
  state.apps && state.apps.platformFilter;
export const selectAppCategories = state =>
  state.apps && state.apps.constants.appConstants.categoryEnums;

export const selectAppCategoriesArray = state =>
  state.apps && Object.keys(state.apps.constants.appConstants.categoryEnums);

export const selectBlockchainCategories = state =>
  state.apps && Object.keys(state.apps.constants.appConstants.blockchainEnums);

export const selectStorageCategories = state =>
  state.apps && Object.keys(state.apps.constants.appConstants.storageEnums);

export const selectAuthenticationCategories = state =>
  state.apps &&
  Object.keys(state.apps.constants.appConstants.authenticationEnums);

export const selectAppAuthenticationEnums = state =>
  state.apps && state.apps.constants.appConstants.authenticationEnums;

export const selectAppStorageEnums = state =>
  state.apps && state.apps.constants.appConstants.storageEnums;

export const selectAppBlockchainEnums = state =>
  state.apps && state.apps.constants.appConstants.blockchainEnums;

export const selectCategoryFilter = state =>
  state.apps && state.apps.categoryFilter;
export const selectPlatformName = state =>
  state.apps && state.apps.platformName;
export const selectCategoryName = state =>
  state.apps && state.apps.categoryName;
export const selectAppConstants = state =>
  state.apps && state.apps.constants.appConstants;

export const selectAppMiningApps = state =>
  state.apps && state.apps.appMiningApps;
export const selectAppMiningMonths = state =>
  state.apps && state.apps.appMiningMonths;

export const selectRankedBlockstackApps = state =>
  state.apps && state.apps.blockstackRankedApps;

export const selectAllPlatforms = state => {
  if (!state.apps || !state.apps.platforms) {
    state.apps.platforms = state.platforms;
  }

  return state.apps.platforms;
};
