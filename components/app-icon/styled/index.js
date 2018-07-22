import styled, { css } from 'styled-components'
import { Box } from '@components/box'
import { rgba } from 'polished'
import { theme } from '@common/styles'

const StyledAppIcon = styled(Box)`
  max-width: 100%;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
  border-radius: 15px;
  ${({ showGradient, gradient }) =>
    showGradient &&
    css`
      background: linear-gradient(60deg, ${gradient});
    `};
  & > div {
    width: ${({ size }) => size}px;
  }
`
const Image = styled.img`
  display: block;
  max-width: 100%;
  width: 100%;
`

StyledAppIcon.Image = Image

export { StyledAppIcon }
