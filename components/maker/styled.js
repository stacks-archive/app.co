import Styled from 'styled-components'

export const SidebarButton = Styled.div`
  width: 100%;
  text-align: center;
  padding: 20px 0;
  box-sizing: border-box;
  background-color: ${({ active }) => active ? '#e5e5ff' : 'white'};
  &:hover {
    cursor: pointer;
    background-color: ${({ active }) => active ? '#e5e5ff' : '#f8f8ff'};
  }
`
