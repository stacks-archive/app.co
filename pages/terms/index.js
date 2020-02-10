import React from 'react';
import { Page } from '@components/page';
import Head from '@containers/head';
import { Box } from '@components/mining';

import Content from './content.md';

class LearnMore extends React.PureComponent {
  render() {
    return (
      <Page>
        <Head
          title="Terms of Service"
          description="App.co surfaces the best new dapps every day. It’s a place for blockchain-loving nerds, enthusiasts, and investors to geek out over the latest decentralized tech—from currency exchanges to mutant-feline-marketplaces."
        />
        <Page.Section wrap richText bg="white">
          <Box p={['32px', '64px']}>
            <Content />
          </Box>
        </Page.Section>
      </Page>
    );
  }
}

export default LearnMore;
