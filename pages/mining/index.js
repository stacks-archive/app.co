import * as React from 'react'
import { MiningPage } from '@components/mining/page'
import { AppCoLogo } from '@components/mining/logo'
import { Flex } from '@components/mining'
import { Type } from '@components/typography'
import { MiningButton } from '@components/mining/button'
import { MiningList, MiningListItem } from '@components/mining/list'

const HeaderType = (props) => <Type.h3 color="white" fontSize="23px" fontWeight={300} {...props} />
const HeroType = (props) => <Type.h3 color="white" fontSize={[4, 5]} textAlign="center" fontWeight={200} {...props} />
const Section = (props) => <Flex alignItems="center" justifyContent="center" py={4} px={3} {...props} />
const Header = () => (
  <Section>
    <HeaderType>App Mining by</HeaderType> <AppCoLogo size={32} m={2} />
    <HeaderType>App.co</HeaderType>
  </Section>
)

const ListItemText = (props) => <Type.h4 color="white" fontSize="18px" lineHeight={1.5} fontWeight={400} {...props} />

const Steps = (props) => (
  <Section flexDirection="column" {...props}>
    <MiningList
      width={1}
      minWidth={[1, '600px']}
      maxWidth="500px"
      items={[
        <Flex>
          <ListItemText opacity={0.5} mr={3}>
            1.
          </ListItemText>
          <ListItemText>
            <a href="#">Register your app</a> on App.co.
          </ListItemText>
        </Flex>,
        <Flex>
          <ListItemText opacity={0.5} mr={3}>
            2.
          </ListItemText>
          <ListItemText>
            <a href="#">Integrate Blockstack</a> decentralized authentication.
          </ListItemText>
        </Flex>,
        <Flex>
          <ListItemText opacity={0.5} mr={3}>
            3.
          </ListItemText>
          <ListItemText>
            Improve your app. Earn more Bitcoin each month. <a href="#">See rankings.</a>
          </ListItemText>
        </Flex>
      ]}
    />
  </Section>
)

const Hero = ({ ...props }) => (
  <Section minHeight="40vh" justifyContent="flex-end" flexDirection="column" {...props}>
    <HeroType mb={5}>
      The better your app,<br />the more Bitcoin you earn.
    </HeroType>
    <MiningButton>Register your app</MiningButton>
  </Section>
)

const AppMiningPage = (props) => (
  <MiningPage>
    <Header />
    <Hero />
    <Steps />
  </MiningPage>
)

export default AppMiningPage
