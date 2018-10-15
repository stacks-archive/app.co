import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { Box } from 'blockstack-ui'

const Global = createGlobalStyle`  html,
  body {
    background: #212d37;
  }

  a {
    &:link,
    &:visited,
    &:active {
      text-decoration: underline;
      color: currentColor;
    }
    &:hover {
      text-decoration: none;
    }
  }`

export const StyledMiningPage = ({ children, ...rest }) => (
  <Box bg="#212d37" overflow={'hidden'} minHeight={'100vh'} width={1} {...rest}>
    <Global />
    {children}
  </Box>
)
