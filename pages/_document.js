import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

const GoogleCode = `
            window.dataLayer = window.dataLayer || []; function gtag()
            { dataLayer.push(arguments); }
            gtag('js', new Date()); gtag('config', 'UA-119163063-1');
          `

const DriftChatCode = `
"use strict"; !function() { var t = window.driftt = window.drift = window.driftt || []; if (!t.init) { if (t.invoked) return void (window.console && console.error && console.error("Drift snippet included twice.")); t.invoked = !0, t.methods = [ "identify", "config", "track", "reset", "debug", "show", "ping", "page", "hide", "off", "on" ], t.factory = function(e) { return function() { var n = Array.prototype.slice.call(arguments); return n.unshift(e), t.push(n), t; }; }, t.methods.forEach(function(e) { t[e] = t.factory(e); }), t.load = function(t) { var e = 3e5, n = Math.ceil(new Date() / e) * e, o = document.createElement("script"); o.type = "text/javascript", o.async = !0, o.crossorigin = "anonymous", o.src = "https://js.driftt.com/include/" + n + "/" + t + ".js"; var i = document.getElementsByTagName("script")[0]; i.parentNode.insertBefore(o, i); }; } }(); drift.SNIPPET_VERSION = '0.3.1'; drift.load('46aa9a6p5e2d');
`

const CrispChatCode = `
window.$crisp=[];window.CRISP_WEBSITE_ID="ca68d628-52e4-43d9-9558-683bf42e05d2";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();
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
          <script dangerouslySetInnerHTML={{ __html: CrispChatCode }} />
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
