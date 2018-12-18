import styled, { css } from 'styled-components'
import { wrapperStyle } from '@common/styles'
import { display, textAlign, alignItems, justifyContent } from 'styled-system'
import { Flex } from 'blockstack-ui'

const Navigation = styled(Flex)`
  display: flex;
  a {
    &:link,
    &:visited,
    &:active {
      display: block;
      padding: 10px;

      font-size: 14px;
      color: rgba(20, 33, 68, 0.7);
      text-decoration: none;
      font-weight: 600;
    }
    &:hover {
      color: rgba(20, 33, 68, 1);
    }
  }
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
        text-align: right;
        width: 100%;
        display: block;
      }
    `};
  ${({ footer }) =>
    footer &&
    css`
      flex-direction: column;
    `};
`
const StyledTopBar = styled.div`
  width: 100%;
  top: 0;
  left: 0;
  z-index: 99;
  position: relative;
  background: white;
  box-shadow: 0 1px 1px 0 rgba(20, 33, 68, 0.04), 0 1px 3px 1px rgba(20, 33, 68, 0.09);
`

const Wrapper = styled.div`
  ${wrapperStyle};
  ${({ wrap }) =>
    wrap === false &&
    css`
      max-width: none;
    `} height: 65px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Section = styled.div`
  display: flex;
  align-items: center;
  ${({ grow }) => grow && `flex-grow:1;`};
`
StyledTopBar.Wrapper = Wrapper
StyledTopBar.Section = Section
StyledTopBar.Navigation = Navigation
export { StyledTopBar }
