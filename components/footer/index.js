import React from 'react'

import { Navigation } from '@components/navigation'
import { Flex, Box } from '@components/box'

const Footer = (props) => (
  <Flex {...props}>
    <Box ml="auto">
      <Navigation display={['block', 'flex']} justifyContent="center" alignItems="center" textAlign={['center']} />
    </Box>
  </Flex>
)

export { Footer }
