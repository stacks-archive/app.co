import * as React from 'react'
import { Heading, Section } from '@pages/mining/shared'
import { Box, Img, Flex } from '@components/mining'
import { Card } from '@components/mining/card'
import { Type } from '@components/typography'

const CardItem = ({ children, ...props }) => (
  <Card
    alignItems="center"
    justifyContent="center"
    width={['100%', 'calc(33.333% - 20px)']}
    flexDirection="column"
    borders
    px={[3, 4]}
    py={4}
    my={[4, 0]}
    {...props}
  >
    <Type.span textAlign="center" color="white" lineHeight={1.5} fontWeight={300}>
      {children}
    </Type.span>
  </Card>
)
const Why = ({ ...props }) => (
  <>
    <Section minHeight="40vh" justifyContent="flex-end" mt={5} flexDirection="column" {...props}>
      <Box p={4}>
        <Img
          src="https://file-rkdziugwdi.now.sh/"
          alt="Frequently Asked Questions"
          maxWidth={['80%', '320px']}
          mx="auto"
          display="block"
        />
      </Box>
      <Heading mb={5} maxWidth={['100%', '800px']}>
        We are funding decentralized app teams, simply for being pioneers in the space.
      </Heading>
      <Flex maxWidth="960px" width="100%" flexDirection={['column', 'row']} justifyContent="space-between">
        <CardItem>Ditch advertising and use App Mining as an alternative revenue&nbsp;source.</CardItem>
        <CardItem>Add Blockstack auth to your existing app and get a second&nbsp;revenue source.</CardItem>
        <CardItem>Skip VC fundraising, focus on your users, and get paid each&nbsp;month.</CardItem>
      </Flex>
    </Section>
  </>
)

export { Why }
