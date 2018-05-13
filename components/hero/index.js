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

  background: linear-gradient(rgba(254, 33, 113, 0.06), rgba(255, 255, 255, 1));
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), #fff);

  &::before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
  }

  h1 {
    color: #142144;
    margin-top: 50px;
    font-size: 48px;
    max-width: 300px;
  }

  h3 {
    margin-top: 15px;
  }

  @media (max-width: 768px) {
    height: 50vh;

    h1 {
      max-width: 760px;
      margin-top: 100px;
      font-size: 30px;
    }
  }

  @media (max-width: 768px) {
    h1 {
      margin-top: 50px;
    }
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  ${wrapperStyles()};

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;

  &::before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
  }

  background-image: url('/static/images/hero-illustration/illustration@3x.png');
  background-repeat: no-repeat;
  background-size: 75%;
  background-position-x: center;

  @media (max-width: 768px) {
    height: 50vh;
    background-size: 150%;
    background-position: -20px 0px;
  }

  @media (min-width: 1300px) {
    background-size: 70%;
  }

  @media (min-width: 1500px) {
    background-size: 55%;
  }

  @media (min-width: 1800px) {
    background-size: 50%;
  }
`

StyledHero.Content = Content;
StyledHero.Inner = Inner;
export { StyledHero };
