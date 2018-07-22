import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
// import { persistReducer, persistStore } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

import AppsStore from '@stores/apps'
import UserStore from '@stores/user'
import newsletter from '@stores/newsletter'

export default (data) => {
  const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
  const finalCreateStore = composeEnhancers(applyMiddleware(thunk))(createStore)

  const Reducer = combineReducers({
    apps: AppsStore.makeReducer(data),
    user: UserStore.reducer,
    newsletter
  })

  return finalCreateStore(Reducer)
}
