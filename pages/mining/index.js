import * as React from 'react'
import { MiningPage } from '@components/mining/page'
import { AppCoLogo } from '@components/mining/logo'
import { Hero, Steps } from '@pages/mining/hero'
import { Earn } from '@pages/mining/earn'
import { How } from '@pages/mining/how'
import { Why } from '@pages/mining/why'
import { Closing } from '@pages/mining/closing'
import { FAQ } from '@pages/mining/faq'
import { Section, HeaderType, Watch } from '@pages/mining/shared'

const Header = () => (
  <Watch>
    <Section>
      <HeaderType>App Mining by</HeaderType> <AppCoLogo size={32} m={2} />
      <HeaderType>App.co</HeaderType>
    </Section>
  </Watch>
)

const sections = [
  <>
    <Hero />
    <Steps />
  </>,
  <Earn />,
  <How />,
  <Why />,
  <Closing />,
  <FAQ />
]

const AppMiningPage = () => (
  <MiningPage>
    <Watch top>
      <Header />
    </Watch>
    {sections.map((PageSection, i) => <Watch key={i}>{PageSection}</Watch>)}
  </MiningPage>
)

export default AppMiningPage
