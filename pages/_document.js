import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { injectGlobal, ServerStyleSheet } from 'styled-components';
import { normalize } from 'polished';

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
font-family: 'Lato', sans-serif;
background:#eeefef;
}
h1, h2, h3, h4, h5, h6{
font-family: 'Roboto Slab', serif;
margin: 0;
padding: 0;
}
`;

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage((App) => (props) => sheet.collectStyles(<App {...props} />));
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
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
          <meta property="og:image" content="https://app.co/static/images/open_graph/image.png" />
          <meta name="twitter:image" content="https://app.co/static/images/open_graph/image.png" />
          <meta name="twitter:card" content="summary_large_image" />
          {/* <meta name="twitter:site" content="@blockstackorg" /> */}
          <meta name="twitter:title" content="App.co" />
          <meta name="twitter:description" content="Universal dapp store - discover decentralized apps." />

          <meta property="og:title" content="App.co" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://app.co" />
          <meta property="og:description" content="Universal dapp store - discover decentralized apps." />
          {/* Global site tag (gtag.js) - Google Analytics */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-119163063-1" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || []; function gtag()
            \{ dataLayer.push(arguments); \}
            gtag('js', new Date()); gtag('config', 'UA-119163063-1');
          `,
            }}
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
