import App, { Container } from 'next/app';
import React from 'react';
import { withRouter } from 'next/router';
import { Root } from '@containers/root';
import 'isomorphic-unfetch';
class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    /**
     * Fetch our data first
     */
    const response = await fetch('https://swapi.co/api/people');
    const data = await response.json();

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
