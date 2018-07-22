import styled, { css } from 'styled-components'
import { space, color, fontSize, width, flex, flexDirection, flexWrap, alignContent, alignItems } from 'styled-system'

const boxProps = css`
  ${space}
  ${width}
  ${fontSize}
  ${color}
  ${flex}
  ${flexDirection}
  ${flexWrap}
  ${alignContent}
  ${alignItems}
`

const Box = styled.div`
  ${space}
  ${width}
  ${fontSize}
  ${color}
  ${flex}
  ${flexDirection}
  ${flexWrap}
`
Box.propTypes = {
  ...space.propTypes,
  ...width.propTypes,
  ...fontSize.propTypes,
  ...flex.propTypes,
  ...flexDirection.propTypes,
  ...flexWrap.propTypes,
  ...alignContent.propTypes,
  ...alignItems.propTypes,
  ...color.propTypes
}

export { Box, boxProps }
