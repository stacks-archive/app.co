import styled, { injectGlobal } from 'styled-components'
import { Box } from '@components/mining'

injectGlobal`
html, body{
  background: #212d37;
}
`
const StyledMiningPage = styled(Box)`
  background: #212d37;
  overflow: hidden;
  min-height: 100vh;
  width: 100%;

  a {
    &:link,
    &:visited,
    &:active {
      text-decoration: underline;
      color: currentColor;
    }
    &:hover {
      text-decoration: none;
    }
  }
`

export { StyledMiningPage }
