import Styled from 'styled-components'

export const Table = Styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
`

const Th = Styled.th`
  text-align: ${props => props.textAlign || 'left'};
  background: linear-gradient(white, #f7f8fb);
  padding: 16px 32px;
  border: none;
  color: rgba(0, 0, 0, 0.5)
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

export const FormTd = Styled.td`
  padding: 32px;
  border-top: 1px solid #e6e9ee;
  text-align: ${props => props.textAlign || 'left'};
`

export default {
  Table,
  Th,
  Td
}
