import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import persistState from 'redux-localstorage'

import AppsStore from '@stores/apps'
import UserStore from '@stores/user'
import newsletter from '@stores/newsletter'
import RouterStore from '@stores/router'
import makeMiningReducer from '@stores/mining/reducer'
import AdminMiningReducer from '@stores/mining-admin/reducer'
import makerReducer from '@stores/maker/reducer'

export default (data) => {
  const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

  const persisted = persistState(['user'], { key: 'redux-app-co' })
  const finalCreateStore = composeEnhancers(applyMiddleware(thunk), persisted)(createStore)

  const Reducer = combineReducers({
    apps: AppsStore.makeReducer(data),
    user: UserStore.reducer,
    newsletter,
    router: RouterStore.reducer,
    mining: makeMiningReducer(data),
    miningAdmin: AdminMiningReducer,
    maker: makerReducer(data.maker)
  })

  return finalCreateStore(Reducer)
}
