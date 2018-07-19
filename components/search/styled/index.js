import styled from 'styled-components'
import { Box } from '@components/box'
import { theme } from '@common/styles'

const StyledSearchBar = styled(Box)`
  display: flex;
  align-items: center;
  color: ${theme.colors.grey};
`
const Icon = styled.div`
  flex-shrink: 0;
  svg {
    display: block;
  }
`
const Section = styled.div``

StyledSearchBar.Icon = Icon
StyledSearchBar.Section = Section

export { StyledSearchBar }
