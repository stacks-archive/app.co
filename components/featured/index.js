import React from 'react';
import styled, { css } from 'styled-components';

const StyledFeatured = styled.div`
  position: relative;
  width: 100%;
  ${({ padding }) =>
    padding &&
    css`
      padding: ${padding};
    `};
`;

const Wrapper = styled.div`
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 992px) {
    padding: 10px 5px;
    flex-direction: column;
  }
`;

const TitleSection = styled.div`
  width: 100px;
  background: linear-gradient(#0ccaba, #0c9aa6);
  height: 260px;
  min-width: 145px;
  color: #fff;
  flex: 1 1 auto;
  text-align: left;
  border-radius: 10px;
  padding: 15px 15px;
  margin: 15px 0 0 0;
  font-weight: bold;

  p {
    font-weight: normal;
    font-size: 14px;
  }

  @media (max-width: 992px) {
    width: 98%;
    margin: 10px 1% 0 1%;
    min-height: 80px;
    height: auto;
  }
`;

const Section = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;

  @media (min-width: 992px) {
    &:not(:first-of-type) {
      padding-left: 15px;
    }
  }
`;

const Item = styled.div`
  display: flex;
  text-align: left;
  background: #fff;
  border-radius: 10px;
  padding: 15px 15px;
  width: 31%;
  min-height: 120px;
  margin: 18px 1% 0 1%;
  cursor: pointer;

  @media (max-width: 992px) {
    width: 48%;
    margin: 15px 1% 0 1%;
    min-height: 100px;
  }

  @media (max-width: 768px) {
    width: 98%;
    margin: 10px 1% 0 1%;
    min-height: 85px;
  }
`;

const Icon = styled.div`
  width: 45px;
  height: 45px;
`;

const IconImage = styled.img`
  width: 55px;
  height: 55px;
  border-radius: 9px;
`;

const DefaultIcon = styled.div`
  width: 55px;
  height: 55px;
  color: #ffffff;
  text-align: center;
  line-height: 45px;
  font-size: 20px;
  background-color: ${props => props.bgColor};
  border-radius: 3px;
`;

const Name = styled.span`
  font-weight: bold;
  font-size: 18px;
`;

const NameLink = styled.a`
  color: #282f36;
  font-weight: 700;
  text-decoration: none;
  padding-left: 20px;
  &:hover {
    text-decoration: none;
  }
`;

const Description = styled.p`
  padding: 5px 20px 5px 20px;
  margin: 0;
  font-size: 14px;
  color: #6c737a;
`;

StyledFeatured.Wrapper = Wrapper;
StyledFeatured.TitleSection = TitleSection;
StyledFeatured.Section = Section;
StyledFeatured.Item = Item;
StyledFeatured.Icon = Icon;
StyledFeatured.IconImage = IconImage;
StyledFeatured.DefaultIcon = DefaultIcon;
StyledFeatured.Name = Name;
StyledFeatured.NameLink = NameLink;
StyledFeatured.Description = Description;

export { StyledFeatured };
