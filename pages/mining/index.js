import * as React from 'react'
import { MiningPage } from '@components/mining/page'
import { AppCoLogo } from '@components/mining/logo'
import { Hero, Steps } from '@pages/mining/hero'
import { Earn } from '@pages/mining/earn'
import { How } from '@pages/mining/how'
import { Section, HeaderType, Watch } from '@pages/mining/shared'

const Header = () => (
  <Watch>
    <Section>
      <HeaderType>App Mining by</HeaderType> <AppCoLogo size={32} m={2} />
      <HeaderType>App.co</HeaderType>
    </Section>
  </Watch>
)

const AppMiningPage = () => (
  <MiningPage>
    <Watch top>
      <Header />
    </Watch>
    <Watch>
      <Hero />
      <Steps />
    </Watch>
    <Watch>
      <Earn />
    </Watch>
    <Watch>
      <How />
    </Watch>
  </MiningPage>
)

export default AppMiningPage
