import Styled from 'styled-components'

const Table = Styled.table`
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

const Td = Styled.td`
  border-top: 1px solid #e6e9ee;
  text-align: ${props => props.textAlign || 'left'};
  padding: 2em;
`

export default {
  Table,
  Th,
  Td
}
