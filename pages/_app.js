import App, { Container } from 'next/app'
import React from 'react'
import { withRouter } from 'next/router'
import { Provider } from 'react-redux'
import NProgress from 'nprogress'
import routerEvents from 'next-router-events'

import withReduxStore from '@common/lib/with-redux-store'
import { Root } from '@containers/root'
import { theme } from '@common/styles'
import { ThemeProvider } from 'styled-components'
import { Mdx } from '@components/mdx'

import 'isomorphic-unfetch'

class MyApp extends App {
  constructor(props) {
    super(props)
    console.log('constructing app')
    routerEvents.on('routeChangeStart', () => NProgress.start())
    routerEvents.on('routeChangeComplete', () => NProgress.done())
    routerEvents.on('routeChangeError', () => NProgress.done())
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props

    return (
      <Mdx>
        <ThemeProvider theme={theme}>
          <Container>
            <Provider store={reduxStore}>
              <Root>
                <Component {...pageProps} />
              </Root>
            </Provider>
          </Container>
        </ThemeProvider>
      </Mdx>
    )
  }
}

export default withRouter(withReduxStore(MyApp))
