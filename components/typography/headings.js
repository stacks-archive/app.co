import React from 'react'
import styled, { css } from 'styled-components'
import Shevy from 'shevyjs'
import { color, space } from 'styled-system'
const shevy = new Shevy()
const { baseSpacing: bs, h1, h2, h3, h4, h5, h6 } = shevy

const H1 = styled.h1`
  ${color};
  ${space};
`
const H2 = styled.h2`
  ${color};
  ${space};
`
const H3 = styled.h3`
  ${color};
  ${space};
`
const H4 = styled.h4`
  ${color};
  ${space};
`
const H5 = styled.h5`
  ${color};
  ${space};
`
const H6 = styled.h6`
  ${color};
  ${space};
`

export { H1, H2, H3, H4, H5, H6 }
