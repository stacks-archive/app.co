import React from 'react'
import styled from 'styled-components'
import { Flex, Box, Type } from 'blockstack-ui'

import { Page } from '@components/page'

export const MakerContainer = ({children}) => (
  <Flex
    // maxWidth={544}
    // px={[1, 3]}
    mb={5}
    mx={[0, 20]}
    flexDirection={['column', 'column', 'column', 'row']}
    justifyContent="space-between"
    flexWrap="wrap"
  >
    <Box flexGrow={1}>
      {children}
    </Box>
  </Flex>
)

//
// Copied styles, see if exists anywhere else
export const StyledBox = styled(Box)`
  background: #fff;
  border-top: 1px solid #F0F0F5;
  border-bottom: 1px solid #F0F0F5;
  padding: 32px;
  margin-bottom: 32px;
  max-width: 544px;

  @media (min-width: 832px) {
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.04);
    border-radius: 6px;
    border: 1px solid #F0F0F5;
  }
`

// export const StyledPage = styled(Page)`
//   padding: 0 !important;
//   background: red;
// `
