import * as React from 'react'
import { MiningPage } from '@components/mining/page'
import { Header } from '@pages/mining/shared'
import Head from '@containers/head'
import { Flex, Type, Box } from 'blockstack-ui'
import ArrowLeftIcon from 'mdi-react/ArrowLeftIcon'
import Link from 'next/link'
import Markdown from './content.md'

const Content = (props) => <Flex flexDirection="column" width={1} maxWidth="780px" {...props} />

class AppMiningPrivacyPolicy extends React.PureComponent {
  render() {
    return (
      <MiningPage>
        <Head
          title="Privacy Policy - App Mining"
          description="Earn BTC for apps you build with Blockstack. We are funding decentralized app teams simply for being pioneers in the space."
        />
        <Header />
        <Box maxWidth="780px" width={1} mx="auto">
          <Content>
            <Link href="/mining">
              <Flex is="a" href={'/mining'} alignItems="center">
                <ArrowLeftIcon />
                <Type>Back to App Mining</Type>
              </Flex>
            </Link>
          </Content>

          <Content color="white">
            <Markdown />
          </Content>
        </Box>
      </MiningPage>
    )
  }
}

export default AppMiningPrivacyPolicy
