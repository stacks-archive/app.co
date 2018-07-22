import React from 'react'
import PropTypes from 'prop-types'
import { TopBar } from '@components/top-bar'
import { StyledPage } from './styled'
import { Box } from '@components/box'

const Page = ({ children, ...rest }) => (
  <StyledPage {...rest}>
    <TopBar />
    <StyledPage.Section flexDirection={['column']} alignItems="center" pt={[0, 4]}>
      {children}
    </StyledPage.Section>
  </StyledPage>
)

const pxProps = ({ px }) => (px ? { px: [0, 4] } : {})
const pyProps = ({ py }) => (py ? { py: [0, 4] } : {})

const Section = (props) => <StyledPage.Section {...props} {...pxProps(props)} {...pyProps(props)} />

Page.Sidebar = StyledPage.Aside
Page.Section = Section
Page.Section.Content = StyledPage.Content

Page.propTypes = {
  children: PropTypes.node.isRequired
}
export { Page }
