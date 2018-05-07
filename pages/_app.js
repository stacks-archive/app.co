import App, { Container } from 'next/app';
import React from 'react';
import { withRouter } from 'next/router';
import { Root } from '@containers/root';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Root>
          <Component {...pageProps} />
        </Root>
      </Container>
    );
  }
}

export default withRouter(MyApp);
