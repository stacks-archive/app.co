import React from 'react';
import styled from 'styled-components';
import { wrapperStyles } from '@common/styles';

const StyledAppList = styled.table`
  width: 100%;
  padding: 0px 10px;
  font-family: Lato, sans-serif;
  font-size: 14px;
  color: #282F36;
`;

const Row = styled.tr`
  height: 60px;
`;

const Rank = styled.td`
  width: 45px;
  text-align: center;
  padding: 10px 5px;
`;

const Icon = styled.td`
  width:45px;
  height:45px;
`

const IconImage = styled.img`
  width:45px;
  height:45px;
`

const Name = styled.td`
  padding: 10px 5px;
`;

const Description = styled.td`
  padding: 10px 5px;
  color: #6c737a;
`;

const Category = styled.td`
  padding: 10px 5px;
  text-align: center;
`;

const CategoryTag = styled.div`
  display: inline-block;
  text-align: center;
  padding: 10px 20px;
  border-radius: 10px;
  border: 1px solid rgba(40, 47, 54, 0.15)
`

StyledAppList.Row = Row;
StyledAppList.Rank = Rank;
StyledAppList.Name = Name;
StyledAppList.Description = Description;
StyledAppList.Category = Category;
StyledAppList.CategoryTag = CategoryTag;
StyledAppList.Icon = Icon;
StyledAppList.IconImage = IconImage;

export { StyledAppList };
