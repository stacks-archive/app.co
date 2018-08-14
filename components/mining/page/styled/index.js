import styled from 'styled-components'
import { Box } from '@components/mining'

const StyledMiningPage = styled(Box)`
  background: #212d37;
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
