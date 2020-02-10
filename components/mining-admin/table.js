import Styled from 'styled-components';
import { space, width, display } from 'styled-system';

export const Table = Styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
`;

export const Th = Styled.th`
  ${width};
  ${display};
  text-align: ${props => props.textAlign || 'left'};
  background: linear-gradient(white, #f7f8fb);
  padding: 16px 32px;
  border: none;
  color: rgba(0, 0, 0, 0.5);
  font-size: 12px;
  font-weight: normal;
`;

export const Thead = Styled.thead`
  border-top: 1px solid #e6e9ee;
`;

export const ClickableTr = Styled.tr`
  cursor: pointer;
  &:hover {
    background: #f3f5f9;
  }
`;

export const Td = Styled.td`
  ${width};
  ${display};
  border-top: 1px solid #e6e9ee;
  text-align: ${props => props.textAlign || 'left'};
  > a {
    padding: 0 2em;
    display: block;
    height: 100%;
    width: 100%;
    text-decoration: none;
    color: inherit;
    // border-bottom: 1px solid rgba(205, 214, 239, 0.7);
  }
`;

export const SpacedTd = Styled(Td)`
  padding: 16px 32px;
  text-align: ${({ textAlign }) => textAlign || 'left'}
`;

export const FormTd = Styled.td`
  padding: 32px;
  font-size: 14px;
  border-top: 1px solid #e6e9ee;
`;

export const UnderlineLink = Styled.a`
  ${space}
  display: inline-block;
  text-decoration: underline !important;
  text-decoration-color: rgba(205, 214, 239, 0.7);
`;

export const SubReward = Styled.span`
  display: block;
  font-size: 0.7em;
  opacity: 0.7;
  margin-top: 1em;
`;

export default {
  Table,
  Th,
  Td,
  SpacedTd,
};
