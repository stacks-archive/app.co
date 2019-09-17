import styled from 'styled-components'

export const SidebarButton = styled.div`
  width: 100%;
  // text-align: center;
  padding: 20px;
  box-sizing: border-box;
  background-color: ${({ active }) => active ? '#201f6d26' : 'white'};
  &:hover {
    cursor: pointer;
    background-color: ${({ active }) => active ? '#201f6d26' : '#201f6d0d'};
  }
`

export const MakerCardHeader = styled.h2`
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: #0F1117;
  margin-bottom: 16px;
`

export const MakerCardText = styled.h2`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #677282;
  margin-bottom: 16px;
`

export const MakerRadioListLabel = styled.label`
  display: block;
  margin: 8px 0;
  > input {
    margin-right: 12px;
  }
`