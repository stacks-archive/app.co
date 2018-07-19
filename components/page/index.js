import React from 'react'
import PropTypes from 'prop-types'
import { TopBar } from '@components/top-bar'
import { StyledPage } from './styled'

const Page = ({ children, ...rest }) => (
  <StyledPage {...rest}>
    <TopBar />
    <StyledPage.Section pt={[3, 4]} wrap>{children}</StyledPage.Section>
  </StyledPage>
)

Page.Sidebar = StyledPage.Aside
Page.Section = StyledPage.Section
Page.Section.Content = StyledPage.Content

Page.propTypes = {
  children: PropTypes.node.isRequired
}
export { Page }
