import * as React from 'react'
import { Heading, Section, SubHeading } from '@pages/mining/shared'
import { Box, Img, Flex } from '@components/mining'
import { Card } from '@components/mining/card'

const CardItem = (props) => <Card width={['100%', 'calc(33.333% - 20px)']} {...props} />

const How = ({ ...props }) => (
  <>
    <Section minHeight="40vh" justifyContent="flex-end" mt={5} flexDirection="column" {...props}>
      <Box p={4}>
        <Img
          src="https://file-ewemlsnqnv.now.sh/"
          alt="How much can you earn?"
          maxWidth={['80%', '460px']}
          mx="auto"
          display="block"
        />
      </Box>
      <Heading mb={5} maxWidth={['100%', '800px']}>
        Apps are ranked by reviewers and rewards distributed every 30 days
      </Heading>
      <Flex width="960px">
        <CardItem>Thing 1</CardItem>
        <CardItem mx={4}>Thing 1</CardItem>
        <CardItem>Thing 1</CardItem>
      </Flex>
    </Section>
  </>
)
export { How }
