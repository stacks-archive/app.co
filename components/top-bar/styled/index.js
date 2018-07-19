import styled, { css } from 'styled-components'
import { wrapperStyles, theme, below } from '@common/styles'

const StyledTopBar = styled.div`
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

      ${below.md`
        display: none;
      `};
    }
    &:hover {
      color: rgba(20, 33, 68, 1);
    }
  }
  border-bottom: 1px solid ${theme.colors.border};
`

const Wrapper = styled.div`
  ${wrapperStyles()};
  height: 65px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Section = styled.div`
  display: flex;
  align-items: center;
`
StyledTopBar.Wrapper = Wrapper
StyledTopBar.Section = Section
export { StyledTopBar }
