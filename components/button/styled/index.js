import React from 'react';
import styled, { css } from 'styled-components';
import { darken } from 'polished';

const StyledButton = styled.a`
  padding: 10px 20px;
  border-radius: 20px;
  line-height: 20px;
  flex-shrink: 0;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  user-select: none;
  cursor: pointer;
  z-index: 10;
  text-decoration: none;
  transition: all 135ms cubic-bezier(0.4, 0, 0.2, 1);
  will-change: background-color;
  color: #ffffff;
  &:link,
  &:visited,
  &:active {
    color: #ffffff;
  }
  svg {
    display: block;
  }
  ${({ condensed }) =>
    condensed &&
    css`
      padding: 6px 12px;
      border-radius: 8px;
      font-size: 12px;
      white-space: nowrap;
    `};
  ${({ dark }) =>
    dark &&
    css`
      background-color: rgba(20, 33, 68, 0.45);
      &:hover {
        background-color: rgba(20, 33, 68, 0.56);
      }
    `};
  ${({ light }) =>
    light &&
    css`
      background-color: rgba(255, 255, 255, 0.07);
      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    `};
  ${({ white }) =>
    white &&
    css`
      background-color: rgba(255, 255, 255, 0.1);
      text-shadow: rgba(0, 0, 0, 0.05) 1px 1px;
      font-weight: 500;
      &:hover {
        background-color: rgba(255, 255, 255, 0.3);
      }
    `};
  ${({ transparent }) =>
    transparent &&
    css`
      background-color: rgba(20, 33, 68, 0);
      &:hover {
        background-color: rgba(20, 33, 68, 0);
      }
    `};
  ${({ icon, small }) =>
    icon && small
      ? css`
          width: 32px;
          height: 32px;
          border-radius: 100%;
          padding: 0;
        `
      : icon &&
        !small &&
        css`
          width: 48px;
          height: 48px;
          border-radius: 100%;
        `};

  &:hover {
    cursor: pointer;
    color: #ffffff;
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
`;

export { StyledButton };
