import React from 'react'

import { Navigation } from '@components/navigation'
import { Flex, Box } from '@components/box'

const Footer = ({ isErrorPage, admin, ...props }) => (
  <Flex {...props}>
    <Box ml="auto">
      <Navigation 
        admin={admin}
        display={['block', 'flex']} 
        justifyContent="center" 
        footer
        alignItems="center" 
        textAlign={['center']} 
        isErrorPage={isErrorPage}
      />
    </Box>
  </Flex>
)

export { Footer }
