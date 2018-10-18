import * as React from 'react'
import { MiningPage } from '@components/mining/page'
import { Hero, Steps } from '@pages/mining/hero'
import { Earn } from '@pages/mining/earn'
import { How } from '@pages/mining/how'
import { Why } from '@pages/mining/why'
import { Closing } from '@pages/mining/closing'
import { FAQ } from '@pages/mining/faq-section'
import { Quotes } from '@pages/mining/quotes'
import { Header, Footer } from '@pages/mining/shared'
import Head from '@containers/head'

import { MiningModal } from '@pages/mining/modal'
import { selectApiServer } from '@stores/apps/selectors'
import { connect } from 'react-redux'
import { trackEvent } from '@utils'

const RankingContext = React.createContext({})

const handleBodyScroll = (on) =>
  on ? document.body.classList.remove('no-scroll') : document.body.classList.add('no-scroll')

const mapStateToProps = (state) => ({
  apiServer: selectApiServer(state)
})

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
        return { rankings: months[0].compositeRankings, month: months[0] }
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
  openModal = () => {
    trackEvent('Open App Mining Registration Modal', {
      event_category: 'Mining'
    })
    this.setState({ modalShowing: true })
  }

  componentDidMount() {
    handleBodyScroll(true)
  }

  render() {
    return (
      <MiningPage>
        <Head
          title="App Mining"
          description="Earn BTC for apps you build with Blockstack. We are funding decentralized app teams simply for being pioneers in the space."
        />
        {this.state.modalShowing ? <MiningModal closeModal={() => this.closeModal()} /> : null}
        <Header />
        <RankingContext.Provider value={{ rankings: this.props.rankings, month: this.props.month }}>
          {sections.map((PageSection, i) => (
            <PageSection closeModal={() => this.closeModal()} openModal={() => this.openModal()} key={i} />
          ))}
        </RankingContext.Provider>
        <Footer />
      </MiningPage>
    )
  }
}

export const RankingContextConsumer = RankingContext.Consumer

export default connect(mapStateToProps)(AppMiningPage)
