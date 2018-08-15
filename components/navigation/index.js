import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import NewsletterActions from '@stores/newsletter/actions'
import { StyledTopBar } from '@components/top-bar/styled'
import Link from 'next/link'

const NavigationComponent = ({ handleClick, openNewsletterModal, ...rest }) => {
  const extraProps = handleClick ? { onClick: () => handleClick() } : {}
  return (
    <StyledTopBar.Navigation {...rest}>
      <Link href="/faq" prefetch {...extraProps}>
        <a href="/faq">Learn more</a>
      </Link>
      <a
        href="#"
        onClick={(evt) => {
          evt.preventDefault()
          openNewsletterModal()
        }}
      >
        Get Updates
      </a>
      <Link href="/submit" {...extraProps}>
        <a href="/submit">Add your app</a>
      </Link>
    </StyledTopBar.Navigation>
  )
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ ...NewsletterActions }, dispatch)

const Navigation = connect(null, mapDispatchToProps)(NavigationComponent)

export {Navigation}
