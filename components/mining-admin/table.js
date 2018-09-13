import Styled from 'styled-components'
import { space } from 'styled-system'

export const Table = Styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
`

export const Th = Styled.th`
  text-align: ${props => props.textAlign || 'left'};
  background: linear-gradient(white, #f7f8fb);
  padding: 16px 32px;
  border: none;
  color: rgba(0, 0, 0, 0.5);
  font-size: 12px;
  font-weight: normal;
`

export const Thead = Styled.thead`
  border-top: 1px solid #e6e9ee;
`

export const Td = Styled.td`
  border-top: 1px solid #e6e9ee;
  text-align: ${props => props.textAlign || 'left'};
  a {
    padding: 2em;
    display: block;
    height: 100%;
    width: 100%;
    text-decoration: none;
    color: inherit;
    // border-bottom: 1px solid rgba(205, 214, 239, 0.7);
  }
`

export const SpacedTd = Styled(Td)`
  padding: 32px;
  font-weight: 600;
`

export const FormTd = Styled.td`
  padding: 32px;
  border-top: 1px solid #e6e9ee;
  text-align: ${props => props.textAlign || 'left'};
`

export const UnderlineLink = Styled.a`
  ${space}
  display: inline-block;
  text-decoration: underline !important;
  text-decoration-color: rgba(205, 214, 239, 0.7);
`

export default {
  Table,
  Th,
  Td,
  SpacedTd
}
