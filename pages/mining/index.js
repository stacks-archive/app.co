import * as React from 'react'
import { MiningPage } from '@components/mining/page'
import { AppIcon } from '@components/logos'
import { Hero, Steps } from '@pages/mining/hero'
import { Earn } from '@pages/mining/earn'
import { How } from '@pages/mining/how'
import { Why } from '@pages/mining/why'
import { Closing } from '@pages/mining/closing'
import { FAQ } from '@pages/mining/faq'
import { Section, HeaderType } from '@pages/mining/shared'
import Head from '@containers/head'
import { MiningModal } from '@pages/mining/modal'

const Header = () => (
  <Section>
    <HeaderType mr={2}>App Mining by</HeaderType> <AppIcon size={32} m={2} />
    <HeaderType ml={2}>App.co</HeaderType>
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
  (props) => <How id="how-ranking-works" {...props} />,
  (props) => <Why id="why" {...props} />,
  (props) => <Closing id="register-your-app" {...props} />,
  (props) => <FAQ id="faq" {...props} />
]

class AppMiningPage extends React.PureComponent {
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
        {sections.map((PageSection, i) => (
          <PageSection closeModal={() => this.closeModal()} openModal={() => this.openModal()} key={i}/>
        ))}
      </MiningPage>
    )
  }
}

export default AppMiningPage
