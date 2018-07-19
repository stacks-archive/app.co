import App, { Container } from 'next/app'
import React from 'react'
import { withRouter } from 'next/router'
import { Provider } from 'react-redux'
import withReduxStore from '@common/lib/with-redux-store'
import { Root } from '@containers/root'
import { theme } from '@common/styles'
import { ThemeProvider } from 'styled-components'

import 'isomorphic-unfetch'

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props

    return (
      <ThemeProvider theme={theme}>
        <Container>
          <Provider store={reduxStore}>
            <Root>
              <Component {...pageProps} />
            </Root>
          </Provider>
        </Container>
      </ThemeProvider>
    )
  }
}

export default withRouter(withReduxStore(MyApp))
