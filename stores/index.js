import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
// import { persistReducer, persistStore } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import persistState from 'redux-localstorage'

import AppsStore from '@stores/apps'
import UserStore from '@stores/user'

export default (data) => {
  const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
  const persisted = persistState(['user'], { key: 'redux-app-co' })
  const finalCreateStore = composeEnhancers(applyMiddleware(thunk), persisted)(createStore)

  const Reducer = combineReducers({
    apps: AppsStore.makeReducer(data),
    user: UserStore.reducer
  })

  return finalCreateStore(Reducer)
}
