import Styled from 'styled-components'

export const Section = Styled.section`
  background: white;
  margin-top: 32px;
  h2 {
    font-size: 1em;
    padding: 24px 64px 32px 64px;
  } 
`

export const Caret = Styled.div`
  border-top: 12px solid rgba(20, 33, 68, 0.7);
  border-bottom: none;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  content: ' ';
  transform: ${({open}) => open ? 'none' : 'rotate(-90deg)'};
  transition: transform 0.5s;
  left: -32px;
  position: relative;
  top: 15px;
  width: 0;
  height: 0;
`
