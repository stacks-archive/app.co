import styled, { css } from 'styled-components'
import { Box } from '@components/box'
import { theme, below } from '@common/styles'

const StyledNewsletter = styled(Box)`
  background-color: ${theme.colors.blue};
  border-radius: 6px;
  overflow: hidden;
  min-height: 75px;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`
const Section = styled(Box)`
  flex-grow: 1;
  flex-shrink: 1;
  position: relative;
  z-index: 3;
  ${below.md`
    & + & {
      margin-top: 20px;
    }
   `};
`
const SvgBackgroundElement = styled.div`
  position: absolute;
  ${({ top }) =>
    top &&
    css`
      top: ${top}px;
    `};
  ${({ left }) =>
    left &&
    css`
      left: ${left}px;
    `};
  ${({ right }) =>
    right &&
    css`
      right: ${right}px;
    `};
  ${({ bottom }) =>
    bottom &&
    css`
      bottom: ${bottom}px;
    `};
`

StyledNewsletter.Svg = SvgBackgroundElement
StyledNewsletter.Section = Section

export { StyledNewsletter }
