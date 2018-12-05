import * as React from 'react'
import Head from '@containers/head'
import { MiningPage } from '@components/mining/page'
import { selectApiServer } from '@stores/apps/selectors'
import { connect } from 'react-redux'
import { StartAppMiningSection } from '@pages/mining/sections/start-app-mining'
import { Hero } from '@pages/mining/sections/hero'
import { HowMuchSection } from '@pages/mining/sections/how-much-earn'
import { RankingSection } from '@pages/mining/sections/ranking'
import { PioneersSection } from '@pages/mining/sections/pioneers'
import { FAQSection } from '@pages/mining/sections/faq'

const handleBodyScroll = (on) =>
  on ? document.body.classList.remove('no-scroll') : document.body.classList.add('no-scroll')

const mapStateToProps = (state) => ({
  apiServer: selectApiServer(state)
})

class AppMiningPage extends React.Component {
  static async getInitialProps({ reduxStore }) {

    try {
      const res = await fetch(`https://app-co-api.herokuapp.com/api/app-mining-months`)
      const { months } = await res.json()
      if (months && months.length) {
        return { rankings: months[0].compositeRankings, month: months[0], months }
      } else {
        return {}
      }
    } catch (error) {
      return {}
    }
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
        <Hero minHeight="100vh" apps={this.props.rankings} />
        <StartAppMiningSection />
        <HowMuchSection apps={this.props.rankings} />
        <RankingSection apps={this.props.rankings} />
        <PioneersSection apps={this.props.rankings} />
        <FAQSection apps={this.props.rankings} />
      </MiningPage>
    )
  }
}

export default connect(mapStateToProps)(AppMiningPage)
