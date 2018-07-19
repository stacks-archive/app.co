import React from 'react'
import styled from 'styled-components'
import { wrapperStyles } from '@common/styles'
import { Box } from '@components/box'

const StyledPage = styled(Box)``

const Section = styled(Box)`
  display: flex;
  flex-direction: column;
  ${props => wrapperStyles(props)};
`
const Content = styled.div`
  flex-grow: 1;
`
const Aside = styled.aside`
  max-width: 250px;
  width: 100%;
  flex-shrink: 0;
  padding: 0 10px;
`

StyledPage.Section = Section
StyledPage.Content = Content
StyledPage.Aside = Aside

export { StyledPage }
