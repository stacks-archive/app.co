import styled, { css } from 'styled-components'
import { rgba } from 'polished'
import { Box } from '@components/box'
import hash from 'string-hash'
import color from 'tinycolor2'
import { theme as SystemTheme } from 'blockstack-ui'

const sizes = {
  xl: 1170,
  lg: 960,
  md: 638,
  sm: 400
}

// iterate through the sizes and create a media template
export const below = Object.keys(sizes).reduce((accumulator, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const emSize = sizes[label] / 16
  accumulator[label] = (...args) => css`
    @media (max-width: ${emSize}em) {
      ${css(...args)};
    }
  `
  return accumulator
}, {})
// iterate through the sizes and create a media template
export const above = Object.keys(sizes).reduce((accumulator, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const emSize = sizes[label] / 16
  accumulator[label] = (...args) => css`
    @media (min-width: ${emSize}em) {
      ${css(...args)};
    }
  `
  return accumulator
}, {})

const wrapperStyles = () => (props) =>
  props &&
  props.wrap &&
  css`
    width: 100%;
    max-width: 1216px;
    margin-right: auto;
    margin-left: auto;
    z-index: 10;
    position: relative;
  `

const theme = {
  fontSizes: [12, 14, 16, 24, 32, 48, 64, 96, 128],
  space: [
    // margin and padding
    0,
    3,
    6,
    12,
    24,
    48,
    72,
    256
  ],
  fonts: {
    default: SystemTheme.fonts.default,
    brand: SystemTheme.fonts.default
  },
  colors: {
    blue: Object.assign('#142144', {
      light: '#324476',
      accent: '#0CCABA'
    }),
    grey: Object.assign('#5B647C', {
      light: '#F9F9FC',
      mid: '#7588A2',
      dark: '#142144'
    }),
    red: Object.assign('#e74c3c', {}),
    border: Object.assign(rgba('#7588A2', 0.2), {
      dark: '#7588A2'
    })
  }
}

const wrapperStyle = css`
  width: 100%;
  max-width: 1216px;
  margin-right: auto;
  margin-left: auto;
  z-index: 10;
  position: relative;
  padding-left: 20px;
  padding-right: 20px;
  ${below.md`
    padding-left: 20px;
    padding-right: 20px;
  `};
`

const wrapper = styled(Box)`
  ${wrapperStyle};
`

const gradientFromString = (string, stop1 = 0, stop2 = 100) => {
  const n = hash(string)
  const c1 = color({ h: n % 360, s: 0.95, l: 0.5 })
  const c1_ = c1.toHexString()
  const c2 = c1.triad()[1].toHexString()

  return `${c1_} ${stop1}%, ${c2} ${stop2}%`
}

export { wrapper, wrapperStyles, wrapperStyle, theme, gradientFromString }
