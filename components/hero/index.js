import React from 'react';
import styled from 'styled-components';
import { wrapperStyles } from '@common/styles';
import { headerHeight } from '@common/constants';

const StyledHero = styled.div`
  height: 40vh;
  min-height: 400px;
  display: flex;
  align-items: center;
  position: relative;
  padding-top: ${headerHeight};

  &::before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(179.82deg, #fe2171 21.44%, #ff8d38 100.55%);
    opacity: 0.15;
    z-index: 1;
  }

  h1 {
    color: #fe4f74;
    font-size: 48px;
    max-width: 400px;
  }
`;
const Content = styled.div`
  position: relative;
  z-index: 10;
  ${wrapperStyles()};
`;

StyledHero.Content = Content;
export { StyledHero };
