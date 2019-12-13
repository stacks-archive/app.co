import React from 'react';
import styled, { css } from 'styled-components';

const App = {
  MainSection: styled.div`
    background: white;
    padding: 34px 27px;

    text-align: ${props => (props.center ? 'center' : 'left')};
  `,

  TagLabel: styled.p`
    font-family: Lato, sans-serif;
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    color: #002257;
    letter-spacing: 1px;
  `,

  BrandLink: styled.a`
    font-size: 14px;
    font-family: Lato, sans-serif;
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    color: #002257;
    text-decoration: none;
    display: flex;
    align-items: center;

    svg {
      margin-right: 5px;
      display: block;
    }

    &:hover {
      text-decoration: underline;
    }
  `,

  StatNumber: styled.h3`
    font-size: 36px;
    text-align: center;
    font-family: Lato, sans-serif;
  `,

  StatLabel: styled.p`
    text-align: center;
    width: 80%;
    margin-left: 10%;
    font-family: Lato, sans-serif;
  `,

  ClaimApp: styled.a`
    text-align: center;
    text-decoration: none;
    font-size: 12px;
    font-family: Lato, sans-serif;
    color: #002257;

    &:hover {
      text-decoration: underline;
    }
  `,
};

export default App;
