import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import App from 'next/app';
import Router, { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import merge from 'lodash/merge';
import { CookiesProvider } from 'react-cookie';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { theme as newBlockstackTheme } from '@blockstack/ui';
import { theme as BlockstackTheme } from 'blockstack-ui';
import smoothscroll from 'smoothscroll-polyfill';
import { normalize } from 'polished';
import NProgress from 'nprogress';
import routerEvents from 'next-router-events';

import withReduxStore from '@common/lib/with-redux-store';
import { Root } from '@containers/root';
import { theme } from '@common/styles';
import { Mdx } from '@components/mdx';
import 'isomorphic-unfetch';
import * as Fathom from 'fathom-client';
import { trackPageView } from '@utils';

// Polyfill theme
// This merge is here to handle some edge cases
// caused int the transition to the new ui library
merge(newBlockstackTheme, {
  colors: {
    blue: {
      mid: '#E1E3E8'
    }
  }
});

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
`;

const REFACTORED_PATHS = [
  '/maker/magic-link',
  '/maker/apps',
  '/maker/apps/blockstack-only',
  '/maker/apps/[appId]',
  '/submit-your-app'
];

const RenderRouteThemeProvider = ({ children }) => {
  const { pathname } = useRouter();
  if (REFACTORED_PATHS.includes(pathname)) {
    console.info(`Pathname: '${pathname}' is a refactored path.`);
    return <ThemeProvider theme={newBlockstackTheme}>{children}</ThemeProvider>;
  }
  return <ThemeProvider theme={BlockstackTheme}>{children}</ThemeProvider>;
};

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    /**
     * Pass down cookies from server to each page
     */
    const cookies =
      ctx.req && ctx.req.universalCookies && ctx.req.universalCookies.cookies;

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps, cookies };
  }

  constructor(props) {
    super(props);
    routerEvents.on('routeChangeStart', () => NProgress.start());
    routerEvents.on('routeChangeComplete', () => {
      Fathom.trackPageview();
      NProgress.done();
    });
    routerEvents.on('routeChangeError', () => NProgress.done());
  }

  componentDidMount() {
    if (process.env.FATHOM_ID) {
      Fathom.load();
      Fathom.setSiteId(process.env.FATHOM_ID);
      Fathom.trackPageview();
    }
    smoothscroll.polyfill();
    if (
      typeof document !== 'undefined' &&
      document.location.pathname.indexOf('/admin') !== 0
    ) {
      Router.router.events.on('routeChangeComplete', trackPageView);
    }
  }

  render() {
    const { Component, pageProps, reduxStore, persistor } = this.props;

    return (
      <CookiesProvider>
        <Mdx>
          <RenderRouteThemeProvider>
            <Provider store={reduxStore}>
              <PersistGate loading={null} persistor={persistor}>
                <Root>
                  <>
                    <GlobalStyles />
                    <Component
                      {...pageProps}
                      serverCookies={this.props.cookies}
                    />
                  </>
                </Root>
              </PersistGate>
            </Provider>
          </RenderRouteThemeProvider>
        </Mdx>
      </CookiesProvider>
    );
  }
}

export default withReduxStore(MyApp);
