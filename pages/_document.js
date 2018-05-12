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
          <title>App.co</title>
          <link
            href="https://fonts.googleapis.com/css?family=Lato:400,700,900|Roboto+Slab:300,400,700"
            rel="stylesheet"
          />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
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
