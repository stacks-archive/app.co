import App, { Container } from 'next/app'
import React from 'react'
import { withRouter } from 'next/router'
import { Provider } from 'react-redux'
import withReduxStore from '@common/lib/with-redux-store'

import { Root } from '@containers/root'
import Store from '@stores'

import 'isomorphic-unfetch'

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props

    return (
      <Container>
        <Provider store={reduxStore}>
          <Root>
            <Component {...pageProps} />
          </Root>
        </Provider>
      </Container>
    )
  }
}

export default withRouter(withReduxStore(MyApp))
