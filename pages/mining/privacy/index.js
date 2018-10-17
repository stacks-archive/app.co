import * as React from 'react'
import { MiningPage } from '@components/mining/page'
import { AppIcon } from '@components/logos'
import { Section, HeaderType } from '@pages/mining/shared'
import Head from '@containers/head'
import { Flex, Type, Box } from 'blockstack-ui'
import ArrowLeftIcon from 'mdi-react/ArrowLeftIcon'
import Link from 'next/link'
const Header = () => (
  <Section>
    <HeaderType mr={2}>App Mining by</HeaderType> <AppIcon size={32} m={2} />
    <HeaderType ml={2}>
      <a href="https://app.co" target="_blank">
        App.co
      </a>{' '}
      and{' '}
      <a href="https://blockstack.org" target="_blank">
        Blockstack
      </a>
    </HeaderType>
  </Section>
)

const Content = (props) => <Flex flexDirection="column" width={1} maxWidth="780px" {...props} />

class AppMiningPrivacyPolicyPage extends React.PureComponent {
  render() {
    return (
      <MiningPage>
        <Head
          title="Privacy Policy - App Mining"
          description="Earn BTC for apps you build with Blockstack. We are funding decentralized app teams simply for being pioneers in the space."
        />
        <Header />
        <Box maxWidth="780px" width={1} mx="auto">
          <Content pb={4}>
            <Link href="/mining">
              <Flex is="a" href={'/mining'} alignItems="center">
                <ArrowLeftIcon />
                <Type>Back to App Mining</Type>
              </Flex>
            </Link>
          </Content>

          <Content>
            <Type color="white" is="h1" pb={4}>
              Privacy Policy
            </Type>
            <Type color="white" lineHeight="1.8">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid autem dicta distinctio eum facilis,
              harum id ipsum molestiae molestias nihil obcaecati quisquam ratione saepe similique velit veritatis vitae,
              voluptate?
            </Type>
          </Content>
        </Box>
      </MiningPage>
    )
  }
}

export default AppMiningPrivacyPolicyPage
