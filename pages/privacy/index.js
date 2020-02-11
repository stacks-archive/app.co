import React from 'react';
import { Page } from '@components/page';
import { Newsletter } from '@components/newsletter';
import Head from '@containers/head';
import { Box } from '@components/mining';

import Content from './content.md';

class Privacy extends React.PureComponent {
  render() {
    return (
      <Page>
        <Head title="Privacy Policy" />
        <Page.Section px>
          <Newsletter wrap />
        </Page.Section>
        <Page.Section wrap richText bg="white">
          <Box p={['32px', '64px']}>
            <Content />
          </Box>
        </Page.Section>
      </Page>
    );
  }
}

export default Privacy;
