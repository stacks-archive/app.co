import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import NewsletterActions from '@stores/newsletter/actions'
import { StyledTopBar, StyledAnchor } from '@components/top-bar/styled'

const NavigationComponent = ({ children, mobile, display, variant }) => {
  return (
    <StyledTopBar.Navigation display={display} mobile={mobile} variant={variant}>
      {children}
    </StyledTopBar.Navigation>
  )
}


const mapDispatchToProps = dispatch => bindActionCreators({ ...NewsletterActions }, dispatch)

const Navigation = connect(null, mapDispatchToProps)(NavigationComponent)

export { Navigation }
