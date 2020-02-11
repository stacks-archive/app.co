import React from 'react';

import { Page } from '@components/page';
import Head from '@containers/head';
import { Type } from '@components/typography';

export default class Error extends React.Component {
  render() {
    return (
      <Page isErrorPage>
        <Head />
        <Page.Section flexDirection="column" px>
          <Type.h1 textAlign="center" width="100%">
            Sorry, we couldn't find this page.
          </Type.h1>
          <br />
          <Type.p textAlign="center">
            Feel free to <a href="mailto:hello@app.co">reach out</a>
            {' or '}
            <a
              href="https://github.com/blockstack/app.co/issues"
              target="_blank"
            >
              make an issue
            </a>{' '}
            to let us know if something went wrong.
          </Type.p>
        </Page.Section>
      </Page>
    );
  }
}
