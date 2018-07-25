import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { injectGlobal, ServerStyleSheet } from 'styled-components'
import { normalize } from 'polished'
import { theme } from '@common/styles'

/**
 * Reset our styles
 */
injectGlobal`
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
    border: 1px solid #F2F2F2;
    margin: 0;
    padding: 0;
    display: block;
  }
`

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage((App) => (props) => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <title>App.co - The Universal Dapp Store</title>
          <link
            href="https://fonts.googleapis.com/css?family=Lato:400,700,900|Roboto+Slab:300,400,700"
            rel="stylesheet"
          />
          <link rel="shortcut icon" href="/static/images/favicon/favicon-96x96.png" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          {/* Global site tag (gtag.js) - Google Analytics */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-119163063-1" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || []; function gtag()
            \{ dataLayer.push(arguments); \}
            gtag('js', new Date()); gtag('config', 'UA-119163063-1');
          `
            }}
          />

          <script
            type="text/javascript"
            src="https://a.optmstr.com/app/js/api.min.js"
            data-account="54556"
            data-user="48381"
            async
          />

          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
