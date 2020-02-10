import React from 'react';
import styled, { css } from 'styled-components';
import { boxProps } from '@components/box';
import { Box, Flex } from 'blockstack-ui';
import { space } from 'styled-system';
import { theme, above, wrapperStyle } from '@common/styles';
import PropTypes from 'prop-types';

const Item = styled(Box)`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${theme.colors.border};
  flex-grow: 1;
  position: relative;
  text-decoration: none;
  border-left: 1px solid ${theme.colors.border};
  @media (max-width: 639px) {
    border-left: 0;
  }
  a {
    text-decoration: none;
  }
  ${({ link, selected }) =>
    link &&
    css`
      & > a {
        display: flex;
        align-items: center;
        max-width: 85%;
        text-decoration: none !important;
      }
      &::before {
        bottom: -1px;
        left: 0;
        width: 100%;
        height: 2px;
        content: '';
        background: ${theme.colors.blue.accent};
        position: absolute;
        transform: scaleX(0);
        transform-origin: bottom left;
        transition: all 135ms cubic-bezier(0.4, 0, 0.2, 1);
      }
      &:hover {
        * {
        }
        position: relative;

        &::before {
          transform: none;
        }
        cursor: pointer;
      }
      ${selected &&
        css`
          position: relative;
          &::before {
            transform: none;
          }
        `};
    `};
  ${({ noBorder }) =>
    noBorder &&
    css`
      border: 0 !important;
    `};

  ${boxProps};
`;

const ItemLink = props => <Item {...props} />;

const Body = styled(Box)`
  background: white;
  display: flex;
  flex-wrap: wrap;
  border-right: 1px solid ${theme.colors.border};
  flex-grow: 1;
`;

const getGradient = name => {};

const headerBgColorGenerator = ({ title }) => {
  if (!title) return null;
  if (title.includes('lockstack')) {
    return css`
      background-image: linear-gradient(-135deg, #43cbff 10%, #9708cc 180%);
    `;
  }
  if (title.includes('Hot')) {
    return css`
      background-image: linear-gradient(-135deg, #ffc600 -200%, #fd6e6a 200%);
    `;
  }
  switch (title) {
    case 'Ethereum':
      return css`
        background-image: linear-gradient(
          -135deg,
          rgb(67, 203, 255) 10%,
          rgb(151, 8, 204) 200%
        );
      `;
    case 'EOS':
      return css`
        background-image: linear-gradient(
          135deg,
          rgb(255, 246, 183) -50%,
          rgb(246, 65, 108) 200%
        );
      `;
    case 'Bitcoin':
      return css`
        background-image: linear-gradient(
          -135deg,
          rgb(82, 229, 231) 10%,
          rgb(19, 12, 183) 200%
        );
      `;
    case 'Steem':
      return css`
        background-image: linear-gradient(
          -135deg,
          rgb(94, 252, 232) 10%,
          rgb(115, 110, 254) 200%
        );
      `;
    case 'Bitcoin Cash':
      return css`
        background-image: linear-gradient(
          -135deg,
          rgb(238, 173, 146) 10%,
          rgb(96, 24, 220) 200%
        );
      `;
    case 'Civic':
      return css`
        background-image: linear-gradient(
          -135deg,
          rgb(94, 252, 232) 10%,
          rgb(115, 110, 254) 200%
        );
      `;

    case 'uPort':
      return css`
        background-image: linear-gradient(
          -135deg,
          rgb(255, 166, 183) 10%,
          rgb(30, 42, 210) 200%
        );
      `;
    case 'Gaia':
      return css`
        background-image: linear-gradient(
          -135deg,
          rgb(255, 122, 245) 10%,
          rgb(81, 49, 98) 200%
        );
      `;
    case 'ZeroNet':
      return css`
        background-image: linear-gradient(
          -135deg,
          rgb(255, 233, 133) -60%,
          rgb(250, 116, 43) 200%
        );
      `;
    case 'IPFS':
      return css`
        background-image: linear-gradient(
          -135deg,
          rgb(151, 171, 255) 10%,
          rgb(18, 53, 151) 200%
        );
      `;
    case '0x relays':
      return css`
        background-image: linear-gradient(
          -135deg,
          rgb(238, 154, 229) 10%,
          rgb(89, 97, 249) 200%
        );
      `;
    case 'DAT':
      return css`
        background-image: linear-gradient(
          135deg,
          rgb(255, 211, 165) -10%,
          rgb(253, 101, 133) 200%
        );
      `;
    case 'BitTorrent':
      return css`
        background-image: linear-gradient(
          -135deg,
          rgb(238, 154, 229) 10%,
          rgb(89, 97, 249) 200%
        );
      `;
    case 'P2P Network':
      return css`
        background-image: linear-gradient(
          -135deg,
          rgb(194, 255, 216) 10%,
          rgb(70, 94, 251) 200%
        );
      `;
    case 'Matrix':
      return css`
        background-image: linear-gradient(
          -135deg,
          rgb(94, 252, 232) 10%,
          rgb(115, 110, 254) 200%
        );
      `;
    case 'Business Tools':
      return css`
        background-image: linear-gradient(
          -135deg,
          rgb(146, 255, 192) -50%,
          rgb(0, 38, 97) 200%
        );
      `;
    case 'Developer Tools':
      return css`
        background-image: linear-gradient(
          -135deg,
          rgb(250, 215, 161) 10%,
          rgb(233, 109, 113) 200%
        );
      `;
    case 'Education & News':
      return css`
        background-image: linear-gradient(
          -135deg,
          rgb(254, 182, 146) 10%,
          rgb(234, 84, 85) 200%
        );
      `;
    case 'Financial Services':
      return css`
        background-image: linear-gradient(
          135deg,
          rgb(121, 241, 164) -50%,
          rgb(14, 92, 173) 200%
        );
      `;
    case 'Games & Digital Assets':
      return css`
        background-image: linear-gradient(
          -135deg,
          rgb(42, 250, 223) 10%,
          rgb(76, 131, 255) 200%
        );
      `;
    case 'Social Networking':
      return css`
        background-image: linear-gradient(
          -135deg,
          rgb(255, 248, 134) -80%,
          rgb(240, 114, 182) 200%
        );
      `;
    case 'Health & Fitness':
      return css`
        background-image: linear-gradient(
          -135deg,
          rgb(151, 171, 255) 10%,
          rgb(18, 53, 151) 200%
        );
      `;
    case 'Marketplaces':
      return css`
        background-image: linear-gradient(
          -135deg,
          rgb(238, 154, 229) 10%,
          rgb(89, 97, 249) 200%
        );
      `;
    case 'Music, Photo & Video':
      return css`
        background-image: linear-gradient(
          135deg,
          rgb(255, 211, 165) -10%,
          rgb(253, 101, 133) 200%
        );
      `;
    case 'Chat':
      return css`
        background-image: linear-gradient(
          -135deg,
          rgb(194, 255, 216) 10%,
          rgb(70, 94, 251) 200%
        );
      `;
    case 'Utilities & Productivity':
      return css`
        background-image: linear-gradient(
          -135deg,
          rgb(101, 253, 240) -10%,
          rgb(29, 111, 163) 200%
        );
      `;
    case 'Documents & Storage':
      return css`
        background-image: linear-gradient(
          -135deg,
          rgb(255, 122, 245) 10%,
          rgb(81, 49, 98) 200%
        );
      `;
    case 'Social Impact':
      return css`
        background-image: linear-gradient(
          -135deg,
          rgb(255, 233, 133) -60%,
          rgb(250, 116, 43) 200%
        );
      `;
    case 'Decentralized Exchanges':
      return css`
        background-image: linear-gradient(
          -135deg,
          rgb(60, 140, 231) 10%,
          rgb(0, 234, 255) 200%
        );
      `;
    case 'Ethereum Wallets':
      return css`
        background-image: linear-gradient(
          -135deg,
          rgb(255, 166, 183) 10%,
          rgb(30, 42, 210) 200%
        );
      `;
    default:
      return css`
        background-image: linear-gradient(-135deg, #e2b0ff 10%, #9f44d3 180%);
      `;
  }
};

const Header = styled(Flex)`
  //background: white;
  ${({ onClick }) =>
    onClick &&
    css`
      &:hover {
        cursor: pointer;
      }
    `};
  ${({ backgroundImage }) =>
    !backgroundImage &&
    css`
      background: white;
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        color: ${theme.colors.blue} !important;
        text-shadow: none !important;
      }
      border: 1px solid ${theme.colors.border};
    `};
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: white;
    text-shadow: rgba(0, 0, 0, 0.15) 1px 1px;
  }
`;

const StyledListTableHeader = styled(Box)`
  border: 1px solid ${theme.colors.border};
  border-top: 0;
  border-right: 0;
  width: 100%;
  font-size: 13px;
  overflow: hidden;
  @media (max-width: 40em) {
    display: none;
  }
`;

const StyledList = styled(Box)`
  box-shadow: 0 1px 1px 0 rgba(20, 33, 68, 0.04),
    0 1px 3px 1px rgba(20, 33, 68, 0.09);
  display: flex;
  flex-direction: column;
  * {
    text-decoration: none;
  }
  border-radius: 6px;
  overflow: hidden;

  ${above.md`
    ${wrapperStyle};
    padding: 0;
  `};
  ${space};

  ${({ gutter }) =>
    gutter &&
    css`
      @media (min-width: 832px) {
        margin-left: 16px !important;
      }
    `};
`;

const Image = styled.img`
  height: 24px;
  position: relative;
  top: 5px;
  margin-right: 10px;
  opacity: 0.8;
`;

const TableItem = styled(Box)`
  text-align: left;
  overflow: hidden;
`;

Item.defaultProps = {
  px: [2, 3],
  py: 3,
};
StyledList.propTypes = {
  gutter: PropTypes.bool,
};

StyledList.Header = Header;
StyledList.Body = Body;
StyledList.Body.Header = StyledListTableHeader;
StyledList.Item = Item;
StyledList.Image = Image;
StyledList.ItemLink = ItemLink;
StyledList.TableItem = TableItem;

export { StyledList };
