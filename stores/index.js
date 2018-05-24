import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

import AppStore from '@stores/apps';

export default (data) => {
  const finalCreateStore = compose(applyMiddleware(thunk))(createStore);

  const Reducer = combineReducers({
    apps: AppStore.makeReducer(data),
  });

  return finalCreateStore(Reducer);
};
