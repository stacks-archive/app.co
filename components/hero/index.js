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
  z-index: 100;
  padding-top: ${headerHeight};

  &::before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
    opacity: 0.15;
    z-index: 1;
  }

  h1 {
    color: #142144;
    font-size: 48px;
    max-width: 400px;
  }
`;
const Content = styled.div`
  position: relative;
  z-index: 100;
  ${wrapperStyles()};
`;

StyledHero.Content = Content;
export { StyledHero };
