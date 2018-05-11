import React from 'react';
import styled, { css } from 'styled-components';
import { darken } from 'polished';

const Button = styled.div`
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
  &:hover {
    cursor: pointer;
  }
  ${({ type }) =>
    type &&
    css`
      color: #ffffff;
      background: #4592ff;
      &:hover {
        background: ${darken(0.1, '#4592ff')};
      }
    `};
`;

export { Button };
