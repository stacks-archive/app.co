import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import getConfig from 'next/config'

// const HappyFoxCode = `
// window.HFCHAT_CONFIG = { EMBED_TOKEN: '4b938070-600d-11e9-a17f-8d51a82b8e0a', ASSETS_URL: 'https://widget.happyfoxchat.com/visitor' }; (function () { var scriptTag = document.createElement('script'); scriptTag.type = 'text/javascript'; scriptTag.async = true; scriptTag.src = window.HFCHAT_CONFIG.ASSETS_URL + '/js/widget-loader.js'; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(scriptTag, s) })()
// `

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage((App) => (props) => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  constructor(props) {
    super(props)
    const { __NEXT_DATA__, ids } = props
    if (ids) {
      __NEXT_DATA__.ids = ids
    }
  }

  render() {
    const { publicRuntimeConfig } = getConfig()
    const { segmentWriteKey } = publicRuntimeConfig

    const SegmentCode = `
      !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.1.0";
      analytics.load("${segmentWriteKey}");
      analytics.page();
      }}();
    `

    return (
      <html lang="en">
        <Head>
          <link rel="shortcut icon" href="/static/images/favicon/favicon-96x96.png" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-119163063-1" />
          <script src="https://polyfill.io/v2/polyfill.min.js?features=IntersectionObserver" />
          <script
            src="https://my.hellobar.com/cefe56c097b8691a6036dcfe8feea1fd6c5c736b.js"
            type="text/javascript"
            charSet="utf-8"
            async="async"
          />
          {/* There is no npm package for this... */}
          <script
            type="text/javascript"
            src="https://s3.amazonaws.com/eversign-embedded-js-library/eversign.embedded.latest.js"
          />
          {/* <script dangerouslySetInnerHTML={{ __html: HappyFoxCode }} /> */}
          <script dangerouslySetInnerHTML={{ __html: SegmentCode }} />

          <script
            type="text/javascript"
            src="https://a.optmnstr.com/app/js/api.min.js"
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
