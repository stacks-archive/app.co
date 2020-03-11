import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  constructor(props) {
    super(props);
    const { __NEXT_DATA__, ids } = props;
    if (ids) {
      __NEXT_DATA__.ids = ids;
    }
  }

  render() {

    return (
      <html lang="en">
        <Head>
          <link
            rel="shortcut icon"
            href="/static/images/favicon/favicon-96x96.png"
          />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <script src="https://polyfill.io/v2/polyfill.min.js?features=IntersectionObserver" />
          {/* There is no npm package for this... */}
          <script
            type="text/javascript"
            src="https://s3.amazonaws.com/eversign-embedded-js-library/eversign.embedded.latest.js"
          />

          <script
            type="text/javascript"
            src="https://a.optmnstr.com/app/js/api.min.js"
            data-account="54556"
            data-user="48381"
            async
          />
          <link
            href="/static/nprogress.css"
            rel="stylesheet"
            type="text/css"
            async
          />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
