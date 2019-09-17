import React from 'react'
import { Page } from '@components/page'
import { Newsletter } from '@components/newsletter'
import Head from '@containers/head'
import {Box} from '@components/mining'
import { Type } from '@components/typography'

import Content from './content.md'

class LearnMore extends React.PureComponent {
  render() {
    return (
      <Page>
        <Head
          title="Learn More"
          description="App.co surfaces the best new dapps every day. It’s a place for blockchain-loving nerds, enthusiasts, and investors to geek out over the latest decentralized tech—from currency exchanges to mutant-feline-marketplaces."
        />
        <Page.Section px>
          <Newsletter />
        </Page.Section>
        <Page.Section wrap richText bg="white">
          <Box p={["32px", "64px"]}>
            <Type.h1 mt={0} id="whats-a-dapp">
              What's a Dapp?
            </Type.h1>
            <Content />
          </Box>
        </Page.Section>
      </Page>
    )
  }
}

export default LearnMore
