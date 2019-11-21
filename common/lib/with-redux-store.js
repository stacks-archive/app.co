import React from 'react';
import initializeStore from '@stores';

const isServer = typeof window === 'undefined';
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

function getOrCreateStore(initialState) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initializeStore(initialState);
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initializeStore(initialState);
  }
  return window[__NEXT_REDUX_STORE__];
}

export default App =>
  class AppWithRedux extends React.Component {
    static async getInitialProps(appContext) {
      // Get or Create the store with `undefined` as initialState
      // This allows you to set a custom default initialState
      const data = appContext.ctx.query;

      const { store, persistor } = getOrCreateStore(data);

      // Provide the store to getInitialProps of pages
      appContext.ctx.reduxStore = store;

      let appProps = {};
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps.call(App, appContext);
      }

      return {
        ...appProps,
        initialReduxState: store.getState(),
        persistor
      };
    }

    constructor(props) {
      super(props);
      const { store, persistor } = getOrCreateStore(props.initialReduxState);
      this.reduxStore = store;
      this.persistor = persistor;
    }

    render() {
      return (
        <App
          {...this.props}
          reduxStore={this.reduxStore}
          persistor={this.persistor}
        />
      );
    }
  };
