import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

const GoogleCode = `
            window.dataLayer = window.dataLayer || []; function gtag()
            { dataLayer.push(arguments); }
            gtag('js', new Date()); gtag('config', 'UA-119163063-1');
          `

const CrispChatCode = `
window.$crisp=[];window.CRISP_WEBSITE_ID="ca68d628-52e4-43d9-9558-683bf42e05d2";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();
`

const ViralLoopCode = `
!function(){var a=window.VL=window.VL||{};return a.instances=a.instances||{},a.invoked?void(window.console&&console.error&&console.error("VL snippet loaded twice.")):(a.invoked=!0,void(a.load=function(b,c,d){var e={};e.publicToken=b,e.config=c||{};var f=document.createElement("script");f.type="text/javascript",f.id="vrlps-js",f.defer=!0,f.src="https://app.viral-loops.com/client/vl/vl.min.js";var g=document.getElementsByTagName("script")[0];return g.parentNode.insertBefore(f,g),f.onload=function(){a.setup(e),a.instances[b]=e},e.identify=e.identify||function(a,b){e.afterLoad={identify:{userData:a,cb:b}}},e.pendingEvents=[],e.track=e.track||function(a,b){e.pendingEvents.push({event:a,cb:b})},e.pendingHooks=[],e.addHook=e.addHook||function(a,b){e.pendingHooks.push({name:a,cb:b})},e.$=e.$||function(a){e.pendingHooks.push({name:"ready",cb:a})},e}))}();var campaign=VL.load("55100",{autoLoadWidgets:!0});campaign.addHook("boot",function(){campaign.widgets.create("rewardingWidget",{container:"body",position:"bottom-left"}),campaign.widgets.create("rewardingWidgetTrigger",{container:"body",position:"bottom-left"})});
`

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
          <script dangerouslySetInnerHTML={{ __html: GoogleCode }} />
          <script dangerouslySetInnerHTML={{ __html: CrispChatCode }} />
          <script dangerouslySetInnerHTML={{ __html: ViralLoopCode }} />

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
