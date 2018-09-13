import Styled from 'styled-components'
import { space, fontSize } from 'styled-system'

const Section = Styled.section`
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

const Content = Styled.div`
  border-top: 1px solid #e6e9ee;
  padding: 2em;
  ${space}
  ${fontSize}
`

export default { 
  Section, 
  Content 
}
