// this should probs be renamed so it's not apps.apps
export const selectApps = (state) => state.apps.apps;
export const selectApiServer = (state) => state.apps.apiServer;
export const selectCurrentApp = (state) => state.apps.selectedApp;
export const selectFilteredApps = (state) => state.apps.filteredApps;
export const selectPlatformFilter = (state) => state.apps.platformFilter;
export const selectAppCategories = (state) => state.apps.constants.appConstants.categoryEnums;
export const selectAppAuthenticationEnums = (state) => state.apps.constants.appConstants.authenticationEnums;
export const selectAppStorageEnums = (state) => state.apps.constants.appConstants.storageEnums;
export const selectAppBlockchainEnums = (state) => state.apps.constants.appConstants.blockchainEnums;
export const selectCategoryFilter = (state) => state.apps.categoryFilter;
export const selectPlatformName = (state) => state.apps.platformName;
export const selectCategoryName = (state) => state.apps.categoryName;
export const selectAppConstants = (state) => state.apps.constants.appConstants;
