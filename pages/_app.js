import App, { Container } from 'next/app'
import React from 'react'
import { withRouter } from 'next/router'
import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie'

import withReduxStore from '@common/lib/with-redux-store'
import { Root } from '@containers/root'
import { theme } from '@common/styles'
import { ThemeProvider } from 'styled-components'
import { Mdx } from '@components/mdx'

import 'isomorphic-unfetch'

class MyApp extends App {
  constructor(props) {
    super(props)
  }

  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    /**
     * Pass down cookies from server to each page
     */
    const cookies = ctx.req && ctx.req.universalCookies && ctx.req.universalCookies.cookies

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps, cookies }
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props

    return (
      <CookiesProvider>
        <Mdx>
          <ThemeProvider theme={theme}>
            <Container>
              <Provider store={reduxStore}>
                <Root>
                  <Component {...pageProps} serverCookies={this.props.cookies} />
                </Root>
              </Provider>
            </Container>
          </ThemeProvider>
        </Mdx>
      </CookiesProvider>
    )
  }
}

export default withRouter(withReduxStore(MyApp))
