import * as React from 'react'
import Head from '@containers/head'
import { MiningPage } from '@components/mining/page'
import { selectApiServer, selectAppMiningApps } from '@stores/apps/selectors'
import { connect } from 'react-redux'
import { AllApps } from '@pages/mining/apps/table-section'
import { ModalRoot } from 'blockstack-ui'
import { Header } from '@components/mining/header'
import { Footer } from '@components/mining/footer'

const handleBodyScroll = (on) =>
  on ? document.body.classList.remove('no-scroll') : document.body.classList.add('no-scroll')

const mapStateToProps = (state) => ({
  apiServer: selectApiServer(state)
})

class AppMiningPage extends React.Component {
  static async getInitialProps({ reduxStore }) {
    const state = reduxStore.getState()
    const apps = selectAppMiningApps(state)
    return { apps }
  }

  componentDidMount() {
    handleBodyScroll(true)
  }

  render() {
    return (
      <ModalRoot>
        <MiningPage>
          <Head
            title="App Mining"
            description="Earn BTC for apps you build with Blockstack. We are funding decentralized app teams simply for being pioneers in the space."
          />
          <Header link showOnMobile />

          <AllApps pt={120} apps={this.props.apps} />
          <Footer />
        </MiningPage>
      </ModalRoot>
    )
  }
}

export default connect(mapStateToProps)(AppMiningPage)
