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
  ${({ card }) =>
    card &&
    css`
      background: #ffffff;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
      border-radius: 3px;
    `};
  ${boxProps};
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
