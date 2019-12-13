import styled, { css } from 'styled-components';
import { Box, boxProps } from '@components/box';
import { theme, wrapperStyle } from '@common/styles';

const StyledSearchBar = styled(Box)`
  display: flex;
  width: 100%;
  align-items: center;
  color: ${theme.colors.grey};
  * {
    border-bottom: 0 !important;
  }
  ${({ focused }) =>
    !focused &&
    css`
      opacity: 0.75;
    `};
`;

const SearchResults = styled.div`
  position: fixed;
  width: 100%;
  left: 0;
  top: 65px;
  background: white;
  box-shadow: 0 1px 1px 0 rgba(20, 33, 68, 0.04),
    0 1px 3px 1px rgba(20, 33, 68, 0.09);
  transition: all 135ms cubic-bezier(0.4, 0, 0.2, 1);
  transform: none;
  opacity: 1;
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
`;

const ResultsWrapper = styled.div`
  max-height: calc(80vh - 65px);
  overflow: auto;
  ${wrapperStyle};
  ${boxProps};
  padding-right: 100px;
  @media (max-width: 40em) {
    padding: 16px 32px;
    max-height: calc(100vh - 65px);
  }
`;
const Icon = styled(Box)`
  flex-shrink: 0;
  ${({ focused }) =>
    !focused &&
    css`
      opacity: 0.25;
    `};
  svg {
    display: block;
  }
`;

const CloseIcon = styled(Box)`
  color: ${theme.colors.blue};
  width: 28px;
  height: 28px;
  opacity: 0.5;
  padding: 2px 0 0 2px;
  position: absolute;
  top: -4px;
  right: 40px;
  z-index: 10;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;

const Section = styled.div`
  ${({ grow }) => grow && `flex-grow:1;`};
  position: relative;
`;

const Backdrop = styled.div`
  position: fixed;
  height: calc(100vh - 65px);
  top: calc(65px);
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  max-height: 100vh;
  z-index: -1;
  &::before {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    opacity: 0.85;
    content: '';
    background: ${theme.colors.blue};
  }
`;

const Input = styled.input`
  border: none;
  width: 100%;
  height: 100%;

  &:focus {
    box-shadow: none;
    outline: none;
  }

  &::placeholder {
    color: #a1a7b3;
    font-size: 14px;
  }
`;

ResultsWrapper.defaultProps = {
  pl: 100,
  py: 3,
};
StyledSearchBar.Backdrop = Backdrop;
StyledSearchBar.Icon = Icon;
StyledSearchBar.Section = Section;
StyledSearchBar.Results = SearchResults;
StyledSearchBar.Results.Wrapper = ResultsWrapper;
StyledSearchBar.CloseIcon = CloseIcon;
StyledSearchBar.Input = Input;

export { StyledSearchBar };
