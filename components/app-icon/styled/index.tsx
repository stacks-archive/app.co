import React from 'react';
import styled, { css } from 'styled-components';
import { Box } from 'blockstack-ui';

const StyledAppIcon = styled(({ showGradient, ...props }) => (
  <Box {...props} />
))`
  max-width: 100%;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
  border-radius: 10px;
  box-shadow: 0 1px 5px 0 rgba(20, 33, 68, 0.04),
    0 1px 6px 1px rgba(20, 33, 68, 0.09);
  ${({ showGradient, gradient }) =>
    showGradient &&
    css`
      background: linear-gradient(60deg, ${gradient});
    `};
  ${({ hover }) =>
    hover &&
    css`
      cursor: pointer;
    `};
  & > div {
    width: ${({ size }) => size}px;
  }
`;
const StyledAppIconImage = styled.img`
  display: block;
  max-width: 100%;
  width: 100%;
`;

export { StyledAppIcon, StyledAppIconImage };
