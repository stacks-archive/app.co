import * as React from 'react'
import { MiningButton } from '@components/mining/button'
import { MiningList } from '@components/mining/list'
import { Section, Heading } from '@pages/mining/shared'
import { Type } from '@components/typography'
import { Flex } from '@components/mining'

const ListItemText = (props) => <Type.h4 color="white" fontSize="18px" lineHeight={1.5} fontWeight={400} {...props} />

const Steps = (props) => (
  <Section flexDirection="column" {...props}>
    <MiningList
      width={1}
      minWidth={[1, '600px']}
      maxWidth="500px"
      items={[
        <Flex p={4}>
          <ListItemText opacity={0.5} mr={3}>
            1.
          </ListItemText>
          <ListItemText>
            <a href="#">Register your app</a> on App.co.
          </ListItemText>
        </Flex>,
        <Flex p={4}>
          <ListItemText opacity={0.5} mr={3}>
            2.
          </ListItemText>
          <ListItemText>
            <a href="#">Integrate Blockstack</a> decentralized authentication.
          </ListItemText>
        </Flex>,
        <Flex p={4}>
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
  <Section minHeight="50vh" justifyContent="flex-end" flexDirection="column" py={4} {...props}>
    <Heading mb={5}>
      The better your app,<br />the more Bitcoin you earn.
    </Heading>
    <MiningButton>Register your app</MiningButton>
  </Section>
)

export { Steps, Hero }
