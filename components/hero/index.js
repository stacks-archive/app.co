import React from 'react';
import styled from 'styled-components';
import { wrapperStyles } from '@common/styles';

const StyledHero = styled.div`
  height: 40vh;
  min-height: 400px;
  display: flex;
  align-items: center;
  position: relative;

  background-image: linear-gradient(
    to bottom,
    rgba(240, 229, 232, 1) 0%,
    rgba(255, 255, 255, 1) 100%
  );

  &::before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
  }

  @media (max-width: 768px) {
    height: 45vh;
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

  padding-top: 50px;

  background-image: url('/static/images/hero-illustration/illustration@3x.png');
  background-repeat: no-repeat;
  background-size: 80%;
  background-position-x: center;

  h1 {
    color: #142144;
    font-size: 48px;
    max-width: 300px;
    padding-top: 90px;
  }

  h3 {
    margin-top: 15px;
  }

  @media (max-width: 768px) {
    background-size: 150%;
    background-position: -40px 0px;
    h1 {
      max-width: 760px;
      font-size: 30px;
      padding-top: 0px;
    }
  }

  @media (min-width: 1300px) {
    background-size: 70%;
    h1 {
      padding-top: 120px;
    }
  }

  @media (min-width: 1500px) {
    background-size: 60%;
    h1 {
      padding-top: 120px;
    }
  }

  @media (min-width: 1800px) {
    background-size: 50%;
  }
`;

StyledHero.Content = Content;
StyledHero.Inner = Inner;
export { StyledHero };
