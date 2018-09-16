import Styled, { css } from 'styled-components'
import { space, fontSize } from 'styled-system'

export const Section = Styled.section`
  ${space}
  width: 100%;
  background: white;
  h1 {
    font-size: 1.2em;
  }
  h1, h2 {
    padding: 32px;
    line-height: 1.2em;
  }
`

export const Content = Styled.div`
  border-top: 1px solid #e6e9ee;
  padding: 2em;
  ${space}
  ${fontSize}
  ${({ errors }) => errors && css`
    background: linear-gradient(white, #fffbea);
  `}
`

export default { 
  Section, 
  Content 
}
