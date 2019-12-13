import React from 'react';
import styled, { css, StyledComponent } from 'styled-components';
import { wrapperStyle } from '@common/styles';
import { display, textAlign, alignItems, justifyContent } from 'styled-system';
import { Flex } from 'blockstack-ui';

export const Navigation = styled(({ mobile, ...rest }) => <Flex {...rest} />)`
  display: flex;
  ${display};
  ${textAlign};
  ${alignItems};
  ${justifyContent};
  ${({ mobile }) =>
    mobile &&
    css`
      position: fixed;
      top: 60px;
      height: calc(100vh - 60px);
      background: white;
      width: 100%;
      left: 0;
      flex-direction: column;
      justify-content: flex-start;
      padding: 20px;
      a {
        font-size: 25px !important;
        text-align: left;
        width: 100%;
        display: block;
      }
    `};
  ${({ footer }) =>
    footer &&
    css`
      flex-direction: column;
    `};
  ${({ variant }) =>
    variant === 'main' &&
    css`
      @media (min-width: 640px) {
        height: 100%;
      }
    `};

  @media (min-width: 640px) {
    a:last-child {
      padding-right: 0 !important;
    }
  }
`;

interface AnchorProps {
  topNav?: boolean;
  mobile?: boolean;
  footer?: boolean;
  active?: boolean;
}

// const anchor: StyledFunction<AnchorProps & React.HTMLProps<HTMLAnchorElement>> = styled.a

export const StyledAnchor = styled.a<AnchorProps>`
  white-space: nowrap;
  &:link,
  &:visited,
  &:active {
    padding: 10px;
    font-size: 14px;
    color: rgba(20, 33, 68, 0.7);
    text-decoration: none;
    font-weight: 400;
  }
  &:hover {
    color: rgba(20, 33, 68, 1);
  }
  ${({ mobile }) =>
    mobile &&
    css`
      font-size: 25px !important;
      text-align: right;
      width: 100%;
      display: block;
    `};
  ${({ footer }) =>
    footer &&
    css`
      display: inline-block;
    `};
  ${({ active }) =>
    active &&
    css`
      @media (min-width: 640px) {
        position: relative;
        &::before {
          content: '';
          position: absolute;
          height: 1px;
          width: 100%;
          background: #000;
          bottom: 0;
          left: 0;
        }
      }
    `};

  ${({ topNav }) =>
    topNav &&
    css`
      @media (min-width: 640px) {
        line-height: 45px;
        height: 100%;
      }
    `};
`;

interface RawDivProps {
  wrap: boolean;
}

const RawDiv: React.FC<RawDivProps & React.HTMLAttributes<HTMLDivElement>> = ({
  wrap,
  ...props
}) => {
  return <div {...props} />;
};

export const Wrapper = styled(RawDiv)`
  ${wrapperStyle};
  ${({ wrap }) =>
    wrap === false &&
    css`
      max-width: none;
    `} height: 65px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface SectionProps {
  grow?: boolean;
  fullHeight?: boolean;
}

export const Section = styled(({ fullHeight, grow, ...rest }) => (
  <div {...rest} />
))<SectionProps>`
  display: flex;
  align-items: center;
  ${({ grow }) => grow && `flex-grow:1;`};
  ${({ fullHeight }) => fullHeight && `height: 100%`};
`;

interface TopBar {
  Wrapper?: typeof Wrapper;
  Section?: typeof Section;
  Navigation?: typeof Navigation;
}

const StyledTopBar: TopBar &
  StyledComponent<'div', any, {}, never> = styled.div`
  width: 100%;
  top: 0;
  left: 0;
  z-index: 99;
  position: relative;
  background: white;
  box-shadow: 0 1px 1px 0 rgba(20, 33, 68, 0.04),
    0 1px 3px 1px rgba(20, 33, 68, 0.09);
`;

StyledTopBar.Wrapper = Wrapper;
StyledTopBar.Section = Section;
StyledTopBar.Navigation = Navigation;

export { StyledTopBar };
