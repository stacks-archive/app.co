import React from 'react'
import styled from 'styled-components'
import { wrapperStyles } from '@common/styles'

const StyledPage = styled.div``

const Section = styled.div`
  display: flex;
  padding: 20px 0;
  ${({ wrap }) => wrap && wrapperStyles()};
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
