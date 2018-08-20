import React from 'react'

import { Navigation } from '@components/navigation'
import { Flex, Box } from '@components/box'

const Footer = ({ isErrorPage, ...props }) => (
  <Flex {...props}>
    <Box ml="auto">
      <Navigation 
        display={['block', 'flex']} 
        justifyContent="center" 
        alignItems="center" 
        textAlign={['center']} 
        isErrorPage={isErrorPage}
      />
    </Box>
  </Flex>
)

export { Footer }
