import App, { Container } from 'next/app';
import React from 'react';
import { withRouter } from 'next/router';
import { Root } from '@containers/root';
import 'isomorphic-unfetch';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    const { apiServer } = ctx.query || 'https://app-co.herokuapp.com';
    const response = await fetch(`${apiServer}/api/apps`);
    const data = await response.json();
    data.apiServer = apiServer;

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return {
      pageProps,
      data,
    };
  }

  render() {
    const { Component, pageProps, data } = this.props;
    return (
      <Container>
        <Root>
          <Component {...pageProps} data={data} />
        </Root>
      </Container>
    );
  }
}

export default withRouter(MyApp);
