import React from 'react';
import { Page } from '@components/page';
import { Newsletter } from '@components/newsletter';
import Head from '@containers/head';
import { Box } from '@components/mining';
import { Text } from '@blockstack/ui';

import Content from './content.md';

class LearnMore extends React.PureComponent {
  render() {
    return (
      <Page wrap>
        <Head
          title="Learn More"
          description="App.co surfaces the best new dapps every day. It’s a place for blockchain-loving nerds, enthusiasts, and investors to geek out over the latest decentralized tech—from currency exchanges to mutant-feline-marketplaces."
        />
        <Page.Section px>
          <Newsletter />
        </Page.Section>
        <Page.Section wrap richText bg="white">
          <Box p={['32px', '64px']}>
            <Text mt={0} id="whats-a-dapp" textStyle="display.large">
              What's a Dapp?
            </Text>
            <Content />
          </Box>
        </Page.Section>
      </Page>
    );
  }
}

export default LearnMore;
