import React from 'react'
import PropTypes from 'prop-types'
import { TopBar } from '@components/top-bar'
import { Footer } from '@components/footer'

import { StyledPage } from './styled'

const Page = ({ isErrorPage = false, children, admin = false, wrap, innerPadding = [2, 0], ...rest }) => (
  <StyledPage {...rest}>
    <TopBar isErrorPage={isErrorPage} admin={admin} wrap={rest.wrap} />
    <StyledPage.Section flexDirection={['column']} alignItems="center" pt={[3, 4]} px={innerPadding}>
      {children}
    </StyledPage.Section>
    <StyledPage.Section flexDirection={['column']} alignItems="center" px={[2, 0]}>
      <Footer pb={3} isErrorPage={isErrorPage} admin={admin}/>
    </StyledPage.Section>
  </StyledPage>
)

const pxProps = ({ px }) => (px ? { px: [2, 4] } : {})
const pyProps = ({ py }) => (py ? { py: [1, 4] } : {})

const Section = (props) => <StyledPage.Section {...props} {...pxProps(props)} {...pyProps(props)} />

Page.Sidebar = StyledPage.Aside
Page.Section = Section
Page.Section.Content = StyledPage.Content

Page.propTypes = {
  children: PropTypes.node.isRequired,
  isErrorPage: PropTypes.bool,
  admin: PropTypes.bool,
  wrap: PropTypes.bool
}

Page.defaultProps = {
  isErrorPage: false,
  admin: false
}
export { Page }
