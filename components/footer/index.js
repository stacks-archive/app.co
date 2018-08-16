import React from 'react'

import { Navigation } from '@components/navigation'
import { Flex, Box } from '@components/box'

const Footer = (props) => (
  <Flex {...props}>
    <Box ml="auto">
      <Navigation />
    </Box>
  </Flex>
)

export { Footer }
