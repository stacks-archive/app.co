import * as React from 'react'
import { MiningButton } from '@components/mining/button'
import { MiningList } from '@components/mining/list'
import { Section, Heading, SubHeading } from '@pages/mining/shared'
import { Type } from '@components/typography'
import { Flex, Box } from '@components/mining'

const ListItemText = (props) => <Type.h4 color="white" fontSize="18px" lineHeight={1.5} fontWeight={400} {...props} />

const apps = [
  {
    name: 'Graphite Docs'
  },
  {
    name: 'Graphite Docs'
  },
  {
    name: 'Graphite Docs'
  },
  {
    name: 'Graphite Docs'
  },
  {
    name: 'Graphite Docs'
  }
]

const AppItem = ({ name, index, length, ...rest }) => (
  <Flex width={1} p={4} bg="white" alignItems="center" opacity={index / length}>
    <ListItemText opacity={0.5} mr={3} color="#212D37">
      1
    </ListItemText>
    <ListItemText color="#212D37">{name}</ListItemText>
    <ListItemText color="#212D37">Blockstack Auth</ListItemText>
    <ListItemText color="#212D37">Gaia</ListItemText>
    <ListItemText ml="auto" color="#212D37" fontSize={3}>
      $15,000
    </ListItemText>
    <ListItemText color="#212D37" opacity={0.5} ml={3}>
      1.2 BTC
    </ListItemText>
  </Flex>
)

const appsArray = apps.map((app, i) => <AppItem key={app.name} index={apps.length - i} length={apps.length} {...app} />)

const Rankings = (props) => (
  <Section flexDirection="column" {...props}>
    <MiningList
      width={1}
      maxWidth="850px"
      items={[
        <Flex width={1} p={4}>
          <ListItemText opacity={0.5} mr={3}>
            App.co Rank
          </ListItemText>
          <ListItemText ml="auto" color="#11A9BC">
            Oct 2018 Payouts
          </ListItemText>
        </Flex>,
        ...appsArray
      ]}
    />
  </Section>
)

const Earn = ({ ...props }) => (
  <>
    <Section minHeight="40vh" justifyContent="flex-end" mt={5} flexDirection="column" {...props}>
      <Box p={4}>
        <img
          src="https://file-vdymnlybqk.now.sh/"
          alt="How much can you earn?"
          style={{ maxWidth: '360px', margin: '0 auto', display: 'block' }}
        />
      </Box>
      <Heading mb={5}>How much can you earn?</Heading>
      <Box maxWidth={[1, '500px']}>
        <SubHeading>
          We currently pay in BTC for legal compliance. We will begin paying Stacks tokens March 2019.
        </SubHeading>
      </Box>
    </Section>
    <Rankings />
  </>
)

export { Earn }
