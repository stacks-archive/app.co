import App from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie'
import Router from 'next/router'
import withReduxStore from '@common/lib/with-redux-store'
import { Root } from '@containers/root'
import { theme } from '@common/styles'
import { theme as BlockstackTheme } from 'blockstack-ui'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { Mdx } from '@components/mdx'
import NProgress from 'nprogress'
import routerEvents from 'next-router-events'
import { trackPageView } from '@utils'
import 'isomorphic-unfetch'
import { normalize } from 'polished'
import smoothscroll from 'smoothscroll-polyfill'
/**
 * Reset our styles
 */
const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=IBM+Plex+Mono:300,400,600');
  ${normalize()};
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
    font-variant-numeric: tabular-nums;
  }
  body, html{
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    background-color: ${theme.colors.grey.light};
    color: ${theme.colors.grey};
    scroll-behavior: smooth;
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

  constructor(props) {
    super(props)
    routerEvents.on('routeChangeStart', () => NProgress.start())
    routerEvents.on('routeChangeComplete', () => NProgress.done())
    routerEvents.on('routeChangeError', () => NProgress.done())
  }

  componentDidMount() {
    smoothscroll.polyfill()
    if (typeof document !== 'undefined' && document.location.pathname.indexOf('/admin') !== 0) {
      Router.router.events.on('routeChangeComplete', trackPageView)
    }
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props

    return (
      <CookiesProvider>
        <Mdx>
          <ThemeProvider theme={BlockstackTheme}>
            <Provider store={reduxStore}>
              <Root>
                <>
                  <GlobalStyles />
                  <Component {...pageProps} serverCookies={this.props.cookies} />
                </>
              </Root>
            </Provider>
          </ThemeProvider>
        </Mdx>
      </CookiesProvider>
    )
  }
}

export default withReduxStore(MyApp)
