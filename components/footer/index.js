import React from 'react'
import { Type } from 'blockstack-ui'

import { Navigation } from '@components/navigation'
import { Flex, Box } from '@components/box'

const Footer = ({ isErrorPage, admin, ...props }) => (
  <>
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
    <Flex mt={5}>
      <Box width={1} px={[2, 4, 8]}>
        <Type textAlign="center">Blockstack is not registered, licensed or supervised as a broker dealer or investment adviser by the Securities and Exchange Commission (SEC), the Financial Industry Regulatory Authority (FINRA) or any other financial regulatory authority or licensed to provide any financial advice or services.</Type>
      </Box>
    </Flex>
  </>
)

export { Footer }
