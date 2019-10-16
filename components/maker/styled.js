import React from 'react'
import styled, { css } from 'styled-components'
import { Flex, Box, Type, Button, Field } from 'blockstack-ui'

//
// These styles are to be considered tempoary, and to be removed
// upon release of the updated style guide

export const SidebarButton = styled.div`
  width: 100%;
  // text-align: center;
  padding: 20px;
  box-sizing: border-box;
  background-color: ${({ active }) => active ? '#201f6d26' : 'white'};
  &:hover {
    cursor: pointer;
    background-color: ${({ active }) => active ? '#201f6d26' : '#201f6d0d'};
  }
`

export const MakerStickyStatusBox = styled(Box)`
  @media screen and (min-width: 832px) {
    position: sticky;
    top: 48px;
  }
`

export const MakerContentBox = styled(Box)`
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

export const MakerContainer = ({ children }) => (
  <Flex
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

export const MakerTitle = styled(Type.h2)`
  display: block;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  color: #0F1117;
  margin-bottom: 16px;
`

export const MakerCardHeader = styled(Type.h2)`
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: #0F1117;
  margin-bottom: 16px;
`

export const MakerCardSubheader = styled(Type.h3)`
  display: block;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #0F1117;
  margin-bottom: 8px;
`

export const MakerCardText = ({children}) => (
  <Type.p
    fontSize={14}
    lineHeight="20px"
    color="#677282"
    mt={0}
    mb={16}
  >
    {children}
  </Type.p>
)

export const MakerRadioListLabel = styled.label`
  display: block;
  margin: 8px 0;
  > input {
    margin-right: 12px;
  }
`

export const MakerCardDivider = styled.hr`
  margin: 24px -32px 32px;
  border: 0;
  height: 1px;
  background-color: #F0F0F5;
`

export const MakerButton = styled(Button)`
  background: #3700FF;
  border-radius: 6px;
  height: 40px;
  box-shadow: none;
  min-width: 126px;
  > span {
    font-size: 14px;
  }
  ${props => props.disabled && css`
    background: #C5CCFF;
  `}
`

export const MakerField = styled(Field)`
  > label {
    color: red !important;
  }
`
