import Styled from 'styled-components'

export const SidebarButton = Styled.div`
  width: 100%;
  text-align: center;
  padding: 20px 0;
  box-sizing: border-box;
  background-color: ${({ active }) => active ? '#201f6d26' : 'white'};
  &:hover {
    cursor: pointer;
    background-color: ${({ active }) => active ? '#201f6d26' : '#201f6d0d'};
  }
`
