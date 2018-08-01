import Shevy from 'shevyjs'
import styled, { css } from 'styled-components'
import { color, space, fontSize } from 'styled-system'

const shevy = new Shevy()

const { h5: large, body } = shevy

const baseProps = css`
  line-height: 1.6;
  color: rgba(20, 33, 68, 0.7);
  /* Description */
`
const P = styled.p`
  ${baseProps};
  ${color};
  ${space};
  ${fontSize};
`

const Span = styled.span`
  ${baseProps};
  ${color};
  ${space};
  ${fontSize};
`

const Body = styled.div`
  ${baseProps};
  ${color};
  ${space};
`

const Strong = styled.strong`
  ${baseProps};
  font-weight: 500;
  ${color};
  ${space};
`

const Em = styled.em`
  ${color};
  ${space};
`
const Ul = styled.ul`
  ${baseProps};
  ${color};
  ${space};
`
const Ol = styled.ol`
  ${baseProps};
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
