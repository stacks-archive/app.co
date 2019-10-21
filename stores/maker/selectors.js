const updateEntity = (state, id, newProps) => ({
  ...state,
  appEntities: {
    ...state.appEntities,
    [id]: {
      ...state.appEntities[id],
      ...newProps
    }
  }
})

export const selectMaker = state => state.maker

export const selectAppList = state => state.maker.appIds.map(id => state.maker.appEntities[id])

export const selectCurrentApp = state => state.maker.appEntities[state.maker.selectedAppId]

// export const selectCompetionStatus = state => {
//   const selectedApp = state.appEntities[state.selectedAppId]
//   return {
//     paymentDetailsComplete
//   }
// }
