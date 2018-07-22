import styled, { css } from 'styled-components'
import { theme } from '@common/styles'
import { Box, boxProps } from '@components/box'

const StyledTag = styled.div`
  display: inline-block;
  background-color: ${theme.colors.grey.light};
  border-radius: 5px;
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
