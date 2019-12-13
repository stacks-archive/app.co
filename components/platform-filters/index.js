import React from 'react';
import styled, { css } from 'styled-components';

export const Filters = styled.div`
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  // background-color: white;
  // border-radius: 5px;
`;

export const Filter = styled.a`
  min-width: 33.3%;
  display: flex;
  cursor: pointer;
  text-decoration: none;
  padding: 20px 20px;
  border-right: 1px solid #e6e6e6;
  transition: 0.5s;
  background-color: white;
  &:nth-child(3n) {
    border-right: none;
  }
  &:nth-child(1n + 4) {
    border-top: 1px solid #e6e6e6;
  }
  &:hover {
    box-shadow: 0 0 3px black;
  }
  &:nth-child(1) {
    border-radius: 5px 0 0 0;
  }
  &:nth-child(3) {
    border-radius: 0 5px 0 0;
  }
  &:nth-last-child(1) {
    border-radius: 0 0 5px 0;
  }
  &:nth-last-child(3) {
    border-radius: 0 0 0 5px;
  }
`;

export const PlatformTitle = styled.span`
  color: #142144;
  font-size: 15px;
  position: relative;
  top: 2px;
`;

export const ClearFilter = styled(Filter)`
  padding-top: 6px;
`;

export const FilterSubtitle = styled.p`
  color: rgba(20, 33, 68, 0.5);
  font-size: 14px;
  margin-bottom: 3px;
`;

export const FilterImage = styled.img`
  max-width: 24px;
  max-height: 24px;
  position: relative;
  // top: 7px;
  opacity: 0.75;
  margin-right: 10px;
`;
