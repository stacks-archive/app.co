import * as React from 'react'
import { MiningPage } from '@components/mining/page'
import { AppCoLogo } from '@components/mining/logo'
import { Hero, Steps } from '@pages/mining/hero'
import { Earn } from '@pages/mining/earn'

import { Section, HeaderType } from '@pages/mining/shared'

const Header = () => (
  <Section>
    <HeaderType>App Mining by</HeaderType> <AppCoLogo size={32} m={2} />
    <HeaderType>App.co</HeaderType>
  </Section>
)

const AppMiningPage = () => (
  <MiningPage>
    <Header />
    <Hero />
    <Steps />
    <Earn />
  </MiningPage>
)

export default AppMiningPage
