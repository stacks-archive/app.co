import styled, { css } from 'styled-components'
import { Box, boxProps } from '@components/box'
import { theme, wrapperStyle } from '@common/styles'

const StyledSearchBar = styled(Box)`
  display: flex;
  width: 100%;
  align-items: center;
  color: ${theme.colors.grey};
  * {
    border-bottom: 0 !important;
  }
`

const SearchResults = styled.div`
  position: fixed;
  width: 100%;
  left: 0;
  top: 65px;
  background: white;
  box-shadow: 0 1px 1px 0 rgba(20, 33, 68, 0.04), 0 1px 3px 1px rgba(20, 33, 68, 0.09);
  transition: all 135ms cubic-bezier(0.4, 0, 0.2, 1);
  transform: none;
  opacity: 1;
  max-height: calc(100vh - 65px);
  overflow: auto;
  &::before {
    content: '';
    height: 2px;
    position: absolute;
    top: -2px;
    left: 0;
    width: 100%;
    background: white;
    border-top: 1px solid ${theme.colors.border};
  }

  ${({ show }) =>
    !show &&
    css`
      pointer-events: none;
      opacity: 0;
      transform: translateY(-20px);
    `};
`

const ResultsWrapper = styled.div`
  ${wrapperStyle};
  ${boxProps};
`
const Icon = styled(Box)`
  flex-shrink: 0;
  svg {
    display: block;
  }
`
const Section = styled.div`
  ${({ grow }) => grow && `flex-grow:1;`};
`

ResultsWrapper.defaultProps = {
  pl: 100,
  py: 4
}
StyledSearchBar.Icon = Icon
StyledSearchBar.Section = Section
StyledSearchBar.Results = SearchResults
StyledSearchBar.Results.Wrapper = ResultsWrapper

export { StyledSearchBar }
