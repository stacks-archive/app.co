import styled, { css } from 'styled-components'
import { wrapperStyle, theme, below, above } from '@common/styles'

const Navigation = styled.div`
  display: flex;
  ${({ mobile }) =>
    mobile
      ? below.md`
        display: none;
      `
      : above.md`
        display: none;
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
`

const Wrapper = styled.div`
  ${wrapperStyle};
  height: 65px;
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
