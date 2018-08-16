import * as React from 'react'
import { Heading, Section } from '@pages/mining/shared'
import { Box, Img, Flex } from '@components/mining'

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
        We are funding decentralized app teams,<br />simply for being pioneers in the space.
      </Heading>
      <Flex maxWidth="960px" width="100%" flexDirection={['column', 'row']} />
    </Section>
  </>
)

export { Why }
