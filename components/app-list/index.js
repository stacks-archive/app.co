import React from 'react';
import styled from 'styled-components';
import { wrapperStyles } from '@common/styles';

const StyledAppList = styled.div`
  width: 100%;
  font-family: Lato, sans-serif;
  font-size: 14px;
  color: #282f36;
`;

const Table = styled.table`
  width: 100%;
  padding: 0px 10px;
`;

const Row = styled.tr`
  height: 60px;
`;

const Rank = styled.td`
  width: 35px;
  text-align: left;
  padding: 10px 0px;
`;

const Icon = styled.td`
  width: 45px;
  height: 45px;
`;

const IconImage = styled.img`
  width: 45px;
  height: 45px;
`;

const Name = styled.td`
  padding: 10px 10px;
  font-weight: bold;
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
  border: 1px solid rgba(40, 47, 54, 0.15);
`;

const ExpandButtonWrapper = styled.div`
  width: 150px;
  margin: 20px 10px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 2px solid #BDBDBD;
  margin-bottom: 20px;
  padding: 20px 10px;
`;

const HeaderItemLeft = styled.div`
  &:not(:first-of-type) {
    padding-left: 50px;
  }
`

const HeaderItemRight = styled.div`
  margin-left: auto;
`

const Footer = styled.div`
  display: flex;
  align-items: center;
`;

StyledAppList.Table = Table;
StyledAppList.Row = Row;
StyledAppList.Rank = Rank;
StyledAppList.Name = Name;
StyledAppList.Description = Description;
StyledAppList.Category = Category;
StyledAppList.CategoryTag = CategoryTag;
StyledAppList.Icon = Icon;
StyledAppList.IconImage = IconImage;
StyledAppList.ExpandButtonWrapper = ExpandButtonWrapper;
StyledAppList.Header = Header;
StyledAppList.HeaderItemLeft = HeaderItemLeft;
StyledAppList.HeaderItemRight = HeaderItemRight;
StyledAppList.Footer = Footer;

export { StyledAppList };
