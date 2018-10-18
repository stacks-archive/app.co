import * as React from 'react'
import { Heading, Section } from '@pages/mining/shared'
import { Flex } from '@components/mining'
import { MiningButton } from '@components/mining/button'

const Closing = ({ openModal, ...props }) => (
  <>
    <Section minHeight="40vh" justifyContent="flex-end" mt={5} flexDirection="column" {...props}>
      <Heading mb={5} maxWidth={['100%', '500px']}>
        The better your app, the&nbsp;more Bitcoin you earn
      </Heading>
      <Flex maxWidth="960px" width="100%" alignItems="center" justifyContent="center">
        <MiningButton onClick={() => openModal()}>Submit your app for qualification</MiningButton>
      </Flex>
    </Section>
  </>
)

export { Closing }
