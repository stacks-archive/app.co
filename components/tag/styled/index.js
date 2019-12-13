import styled, { css } from 'styled-components';
import { theme } from '@common/styles';
import { boxProps } from '@components/box';
import { Box } from 'blockstack-ui';

const StyledTag = styled(Box)`
  display: inline-block;
  background-color: ${theme.colors.grey.light};
  border-radius: 5px;
  font-size: 12px;
  color: #7588a2;
  ${({ small }) =>
    small &&
    css`
      font-size: 10px;
    `};

  ${({ light }) =>
    light &&
    css`
      border: 1px solid rgba(40, 47, 54, 0.15);
      box-sizing: border-box;
      border-radius: 5px;
      background: white;
    `};
  ${boxProps};

  & + & {
    margin-left: 8px;
  }
`;

StyledTag.defaultProps = {
  px: 2,
  py: 1,
};

const StyledTagLink = styled(StyledTag).attrs({ is: 'a' })`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export { StyledTag, StyledTagLink };
