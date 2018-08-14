import * as React from 'react'
import { MiningList } from '@components/mining/list'
import { Section, Heading, SubHeading } from '@pages/mining/shared'
import { Type } from '@components/typography'
import { Flex, Box } from '@components/mining'
import { MiningButton } from '@components/mining/button'
import ArrowRightIcon from 'mdi-react/ArrowRightIcon'
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

const AppItemText = (props) => <ListItemText color="#212D37" {...props} />
const Tag = ({ ...rest }) => (
  <AppItemText border="1px solid #646C73" borderRadius="3px" fontSize={1} px={2} ml={2} {...rest} />
)

const AppItem = ({ name, i, index, length, ...rest }) => (
  <Flex width={1} p={4} bg={`rgba(255,255,255, ${index / length + 0.1})`} alignItems="center">
    <AppItemText opacity={0.5} mr={3}>
      {i + 1}
    </AppItemText>
    <AppItemText pr={3}>{name}</AppItemText>
    <Tag>Blockstack Auth</Tag>
    <Tag>Gaia</Tag>
    <AppItemText ml="auto" fontSize={3}>
      $15,000
    </AppItemText>
    <AppItemText opacity={0.5} ml={3}>
      1.2 BTC
    </AppItemText>
  </Flex>
)

const appsArray = apps.map((app, i) => <AppItem key={i} i={i} index={apps.length - i} length={apps.length} {...app} />)

const Rankings = (props) => (
  <Section flexDirection="column" {...props}>
    <MiningList
      width={1}
      maxWidth="850px"
      noItemBorder
      items={[
        <Flex width={1} p={4}>
          <ListItemText opacity={0.5} mr={3}>
            App.co Rank
          </ListItemText>
          <ListItemText ml="auto" color="#11A9BC">
            Estimated October Payouts
          </ListItemText>
        </Flex>,
        ...appsArray
      ]}
    />
  </Section>
)

const ActionBar = () => (
  <>
    <Box maxWidth="960px" mx="auto" style={{ transform: 'translateY(-25px)' }}>
      <Box borderTop="1px solid white" />
      <MiningButton mx="auto" width="250px" bg="#EF6F6F" alignItems="center" style={{ transform: 'translateY(-25px)' }}>
        View all apps
        <Box ml={2}>
          <ArrowRightIcon color="currentColor" size="1.3rem" style={{ transform: 'translateY(4px)' }} />
        </Box>
      </MiningButton>
    </Box>
  </>
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
      <Box maxWidth={['80%', '500px']}>
        <SubHeading>
          We currently pay in BTC for legal compliance. We will begin paying Stacks tokens March 2019.
        </SubHeading>
      </Box>
    </Section>
    <Rankings />
    <ActionBar />
  </>
)

export { Earn }
