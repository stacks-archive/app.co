import React from 'react'
import Shevy from 'shevyjs'
import styled, { css } from 'styled-components'
import { color, space } from 'styled-system'
const shevy = new Shevy()

const { h5: large, body } = shevy

const P = styled.p`
  ${color};
  ${space};
`

const Span = styled.span`
  ${color};
  ${space};
`

const Body = styled.div`
  ${color};
  ${space};
`

const Strong = styled.strong`
  font-weight: 500;
  ${color};
  ${space};
`

const Em = styled.em`
  ${color};
  ${space};
`
const Ul = styled.ul`
  ${color};
  ${space};
`
const Ol = styled.ol`
  ${color};
  ${space};
`

const Li = styled.li`
  ${color};
  ${space};
`

const Pre = styled.pre`
  ${color};
  ${space};
`

Body.p = P
Body.span = Span
Body.strong = Strong
Body.em = Em
Body.ul = Ul
Body.ol = Ol
Body.li = Li
Body.oli = Li
Body.pre = Pre

export default Body
