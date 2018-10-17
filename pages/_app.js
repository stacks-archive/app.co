import App, { Container } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie'
import Router from 'next/router'
import withReduxStore from '@common/lib/with-redux-store'
import { Root } from '@containers/root'
import { theme } from '@common/styles'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { Mdx } from '@components/mdx'
import { trackPageView } from '@utils'
import 'isomorphic-unfetch'
import { normalize } from 'polished'

/**
 * Reset our styles
 */
const GlobalStyles = createGlobalStyle`
  ${normalize()};
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
  }
  body, html{
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    background-color: ${theme.colors.grey.light};
    color: ${theme.colors.grey};
  }
  
  ol li ol {
  list-style-type: upper-alpha;
  }
  body{
  &.no-scroll{
  overflow: hidden; 
  }
  }
  
  a{
    &:link,
    &:visited,
    &:active{
      color: ${theme.colors.blue};
    }
    &:hover{
      color: ${theme.colors.blue.light};
    }
  }
  h1, h2, h3, h4, h5, h6{
    margin: 0;
    padding: 0;
  }
  .headroom{
    z-index: 99 !important;
  }
  hr{
    background:transparent;
    border: 1px solid #f2f2f2;
    margin: 0;
    padding: 0;
    display: block;
  }

  input::ms-clear {
    display: none;
  }
`

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
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

  componentDidMount() {
    Router.router.events.on('routeChangeComplete', trackPageView)
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
                  <>
                    <GlobalStyles />
                    <Component {...pageProps} serverCookies={this.props.cookies} />
                  </>
                </Root>
              </Provider>
            </Container>
          </ThemeProvider>
        </Mdx>
      </CookiesProvider>
    )
  }
}

export default withReduxStore(MyApp)
