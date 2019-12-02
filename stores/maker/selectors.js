export const selectMaker = state => state.maker;

export const selectIsMakerLoading = state => state.maker.loading;

export const selectAppList = state =>
  state.maker.appIds.map(id => state.maker.appEntities[id]);

export const selectCurrentApp = state =>
  state.maker.appEntities[String(state.maker.selectedAppId)];
