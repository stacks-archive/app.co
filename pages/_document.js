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
`
const GoogleCode = `
            window.dataLayer = window.dataLayer || []; function gtag()
            { dataLayer.push(arguments); }
            gtag('js', new Date()); gtag('config', 'UA-119163063-1');
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
          <link rel="shortcut icon" href="/static/images/favicon/favicon-96x96.png" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-119163063-1" />
          <script
            src="https://my.hellobar.com/cefe56c097b8691a6036dcfe8feea1fd6c5c736b.js"
            type="text/javascript"
            charSet="utf-8"
            async="async"
          />
          <script dangerouslySetInnerHTML={{ __html: GoogleCode }} />
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
