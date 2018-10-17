import * as React from 'react'
import { MiningPage } from '@components/mining/page'
import { AppIcon } from '@components/logos'
import { Hero, Steps } from '@pages/mining/hero'
import { Earn } from '@pages/mining/earn'
import { How } from '@pages/mining/how'
import { Why } from '@pages/mining/why'
import { Closing } from '@pages/mining/closing'
import { FAQ } from '@pages/mining/faq'
import { Quotes } from '@pages/mining/quotes'
import { Section, HeaderType } from '@pages/mining/shared'
import Head from '@containers/head'
import { Type, Flex } from 'blockstack-ui'
import { MiningModal } from '@pages/mining/modal'
import { selectApiServer } from '@stores/apps/selectors'
import { connect } from 'react-redux'
import Link from 'next/link'

const RankingContext = React.createContext({})

const mapStateToProps = (state) => ({
  apiServer: selectApiServer(state)
})

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

const sections = [
  (props) => (
    <>
      <Hero {...props} />
      <Steps {...props} id="steps" />
    </>
  ),
  (props) => <Earn id="how-to-earn" {...props} />,
  (props) => <Quotes id="quotes-from-developers" {...props} />,
  (props) => <How id="how-ranking-works" {...props} />,
  (props) => <Why id="why" {...props} />,
  (props) => <Closing id="register-your-app" {...props} />,
  (props) => <FAQ id="faq" {...props} />
]

class AppMiningPage extends React.PureComponent {
  static async getInitialProps({ reduxStore }) {
    const apiServer = selectApiServer(reduxStore.getState())
    try {
      const res = await fetch(`${apiServer}/api/app-mining-months`)
      const { months } = await res.json()
      if (months && months.length) {
        return { rankings: months[0].compositeRankings }
      } else {
        return {}
      }
    } catch (error) {
      return {}
    }
  }
  state = {
    modalShowing: false
  }
  closeModal = () => this.setState({ modalShowing: false })
  openModal = () => this.setState({ modalShowing: true })

  render() {
    return (
      <MiningPage>
        <Head
          title="App Mining"
          description="Earn BTC for apps you build with Blockstack. We are funding decentralized app teams simply for being pioneers in the space."
        />
        {this.state.modalShowing ? <MiningModal closeModal={() => this.closeModal()} /> : null}
        <Header />
        <RankingContext.Provider value={{ rankings: this.props.rankings }}>
          {sections.map((PageSection, i) => (
            <PageSection closeModal={() => this.closeModal()} openModal={() => this.openModal()} key={i} />
          ))}
        </RankingContext.Provider>
        <Flex justifyContent="center" p={4}>
          <Link href={'/mining/terms'}>
            <Type pr={2} href={'/mining/terms'} is="a">
              Terms of Use
            </Type>
          </Link>
          <Type>|</Type>
          <Link href={'/mining/privacy'}>
            <Type pl={2} href={'/mining/privacy'} is="a">
              Privacy Policy
            </Type>
          </Link>
        </Flex>
      </MiningPage>
    )
  }
}

export const RankingContextConsumer = RankingContext.Consumer

export default connect(mapStateToProps)(AppMiningPage)
