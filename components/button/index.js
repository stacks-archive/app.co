import React from 'react'
import styled, { css } from 'styled-components'
import { darken } from 'polished'

const Button = styled.a`
  padding: 10px 20px;
  border-radius: 20px;
  font-weight: bold;
  line-height: 20px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  user-select: none;
  transition: 0.15s all ease-in-out;
  cursor: pointer;
  z-index: 10;
  text-decoration: none;
  &:hover {
    cursor: pointer;
  }
  ${({ type }) =>
    type &&
    css`
      color: #ffffff;
      background: #0ccaba;
      &:hover {
        background: ${darken(0.1, '#0CCABA')};
      }
    `};
`

export { Button }
