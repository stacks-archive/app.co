import React from 'react'
import { Page } from '@components/page'
import { Newsletter } from '@components/newsletter'
import Head from '@containers/head'
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
          <Newsletter wrap />
        </Page.Section>
        <Page.Section wrap px py richText bg="white">
          <Content />
        </Page.Section>
      </Page>
    )
  }
}

export default LearnMore
