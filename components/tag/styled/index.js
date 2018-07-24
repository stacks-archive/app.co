import styled, { css } from 'styled-components'
import { theme } from '@common/styles'
import { boxProps } from '@components/box'

const StyledTag = styled.div`
  display: inline-block;
  background-color: ${theme.colors.grey.light};
  border-radius: 5px;
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
`

StyledTag.defaultProps = {
  px: 2,
  py: 1
}

export { StyledTag }
