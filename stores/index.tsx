import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import AppsStore from '@stores/apps';
import UserStore from '@stores/user';
import newsletter from '@stores/newsletter';
import RouterStore from '@stores/router';
import makeMiningReducer from '@stores/mining/reducer';
import AdminMiningReducer from '@stores/mining-admin/reducer';
import makerReducer from '@stores/maker/reducer';

const persistConfig = {
  whitelist: ['user'],
  key: 'app-co',
  storage
};

export default data => {
  const composeEnhancers =
    (typeof window !== 'undefined' &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

  const finalCreateStore = composeEnhancers(applyMiddleware(thunk))(
    createStore
  );

  const Reducer = combineReducers({
    apps: AppsStore.makeReducer(data),
    user: UserStore.makeUserReducer(data.apps && data.apps.user),
    newsletter,
    router: RouterStore.reducer,
    mining: makeMiningReducer(data),
    miningAdmin: AdminMiningReducer,
    maker: makerReducer(data.maker)
  });

  const persistedReducer = persistReducer(persistConfig, Reducer);

  const store = finalCreateStore(persistedReducer);
  const persistor = persistStore(store);

  return { store, persistor };
};
