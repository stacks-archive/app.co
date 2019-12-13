import Styled from 'styled-components';

export const Text = Styled.span`
  font-size: 12px;
  font-weight: 400;
`;

export const Badge = Styled.div`
  display: inline-block;
  margin-left: 5px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ background }) => background};
`;
