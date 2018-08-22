import styled, { css } from 'styled-components'
import { rgba } from 'polished'
import { Box } from '@components/box'
import hash from 'string-hash'
import color from 'tinycolor2'

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
    max-width: 1130px;
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
  colors: {
    blue: Object.assign('#142144', {
      light: '#324476',
      accent: '#0CCABA'
    }),
    grey: Object.assign('#5B647C', {
      light: '#E6E9EE',
      mid: '#7588A2',
      dark: '#142144'
    }),
    red: Object.assign('#e74c3c'),
    border: Object.assign(rgba('#7588A2', 0.2), {
      dark: '#7588A2'
    })
  }
}

const wrapperStyle = css`
  width: 100%;
  max-width: 1130px;
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

const gradients = `
      background-image: linear-gradient(-135deg, rgb(254, 182, 146) 10%, rgb(234, 84, 85) 200%);
      background-image: linear-gradient(-135deg, rgb(255, 246, 183) 10%, rgb(246, 65, 108) 200%);
      background-image: linear-gradient(-135deg, rgb(67, 203, 255) 10%, rgb(151, 8, 204) 200%);
      background-image: linear-gradient(-135deg, rgb(94, 252, 232) 10%, rgb(115, 110, 254) 200%);
      background-image: linear-gradient(-135deg, rgb(250, 215, 161) 10%, rgb(233, 109, 113) 200%);
      background-image: linear-gradient(-135deg, rgb(146, 255, 192) 10%, rgb(0, 38, 97) 200%);
      background-image: linear-gradient(-135deg, rgb(238, 173, 146) 10%, rgb(96, 24, 220) 200%);
      background-image: linear-gradient(-135deg, rgb(82, 229, 231) 10%, rgb(19, 12, 183) 200%);
      background-image: linear-gradient(-135deg, rgb(121, 241, 164) 10%, rgb(14, 92, 173) 200%);
      background-image: linear-gradient(-135deg, rgb(42, 250, 223) 10%, rgb(76, 131, 255) 200%);
      background-image: linear-gradient(-135deg, rgb(255, 248, 134) 10%, rgb(240, 114, 182) 200%);
      background-image: linear-gradient(-135deg, rgb(151, 171, 255) 10%, rgb(18, 53, 151) 200%);
      background-image: linear-gradient(-135deg, rgb(238, 154, 229) 10%, rgb(89, 97, 249) 200%);
      background-image: linear-gradient(-135deg, rgb(255, 211, 165) 10%, rgb(253, 101, 133) 200%);
      background-image: linear-gradient(-135deg, rgb(194, 255, 216) 10%, rgb(70, 94, 251) 200%);
      background-image: linear-gradient(-135deg, rgb(101, 253, 240) 10%, rgb(29, 111, 163) 200%);
      background-image: linear-gradient(-135deg, rgb(255, 122, 245) 10%, rgb(81, 49, 98) 200%);
      background-image: linear-gradient(-135deg, rgb(255, 233, 133) 10%, rgb(250, 116, 43) 200%);
      background-image: linear-gradient(-135deg, rgb(255, 166, 183) 10%, rgb(30, 42, 210) 200%);
      background-image: linear-gradient(-135deg, rgb(255, 170, 133) 10%, rgb(179, 49, 95) 200%);
      background-image: linear-gradient(-135deg, rgb(114, 237, 242) 10%, rgb(81, 81, 229) 200%);
      background-image: linear-gradient(-135deg, rgb(255, 157, 108) 10%, rgb(187, 78, 117) 200%);
      background-image: linear-gradient(-135deg, rgb(59, 38, 103) 10%, rgb(188, 120, 236) 200%);
      background-image: linear-gradient(-135deg, rgb(60, 140, 231) 10%, rgb(0, 234, 255) 200%);
      background-image: linear-gradient(-135deg, rgb(250, 178, 255) 10%, rgb(25, 4, 229) 200%);
      `

export { wrapper, wrapperStyles, wrapperStyle, theme, gradientFromString }
