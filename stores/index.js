import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

import AppsStore from '@stores/apps';
import UserStore from '@stores/user';

export default (data) => {
  const finalCreateStore = compose(applyMiddleware(thunk))(createStore);

  const Reducer = combineReducers({
    apps: AppsStore.makeReducer(data),
    user: UserStore.reducer,
  });

  return finalCreateStore(Reducer);
};
