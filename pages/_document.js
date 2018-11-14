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
          <script type="text/javascript" src="https://a.optmnstr.com/app/js/api.min.js" data-account="54556" data-user="48381" async />
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
