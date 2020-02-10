import styled, { css } from 'styled-components';
import { Box } from 'blockstack-ui';
import { theme } from '@common/styles';
import { space } from 'styled-system';

const StyledInput = styled(Box)`
  position: relative;
`;
const Action = styled(Box)`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 5px;
  opacity: 0.5;
  transition: 0.2s all ease-in-out;
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
  &:active {
    transform: translateX(2px);
  }
  svg {
    display: block;
  }
`;
const Input = styled.input`
  background: ${theme.colors.blue.light};
  border: none;
  border-radius: 40px;
  color: white;
  outline: none;
  font-size: 14px;
  min-height: 36px;
  width: 100%;
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  ${({ transparent }) =>
    transparent &&
    css`
      background: transparent;
      color: ${theme.colors.grey};
      &::placeholder {
        color: ${theme.colors.grey};
      }
    `};
  ${space};
`;

StyledInput.Input = Input;
StyledInput.Action = Action;

export { StyledInput };
