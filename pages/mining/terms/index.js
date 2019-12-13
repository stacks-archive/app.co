import * as React from 'react';
import { MiningPage } from '@components/mining/page';
import styled from 'styled-components';

import { Header, Footer } from '@containers/mining/shared';
import Head from '@containers/head';
import { Flex, Type, Box } from 'blockstack-ui';
import ArrowLeftIcon from 'mdi-react/ArrowLeftIcon';
import Link from 'next/link';
import Markdown from './content.md';

export const LinksWrapper = styled.div`
  a:link,
  a:visited,
  a:active {
    color: white !important;
  }
`;

const Content = props => (
  <Flex flexDirection="column" width={1} maxWidth="780px" {...props} />
);

class AppMiningTermsOfUsePage extends React.PureComponent {
  render() {
    return (
      <LinksWrapper>
        <MiningPage>
          <Head
            title="Terms of Use - App Mining"
            description="Earn BTC for apps you build with Blockstack. We are funding decentralized app teams simply for being pioneers in the space."
          />
          <Header />
          <Box maxWidth="780px" width={1} mx="auto" px={4}>
            <Content>
              <Link href="/mining">
                <Flex is="a" href="/mining" alignItems="center">
                  <ArrowLeftIcon />
                  <Type>Back to App Mining</Type>
                </Flex>
              </Link>
            </Content>

            <Content color="white">
              <Markdown />
            </Content>
            <Footer />
          </Box>
        </MiningPage>
      </LinksWrapper>
    );
  }
}

export default AppMiningTermsOfUsePage;
