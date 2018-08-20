import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import NewsletterActions from '@stores/newsletter/actions'
import { StyledTopBar } from '@components/top-bar/styled'
import Link from 'next/link'

const ErrorPageLink = ({isErrorPage, children, ...props}) => isErrorPage ? (
    children
  ) : (
    <Link {...props}>
      {children}
    </Link>
  )

const NavigationComponent = ({ handleClick, isErrorPage, openNewsletterModal, footer, ...rest }) => {
  const extraProps = handleClick ? { onClick: () => handleClick() } : {}
  console.log('error page', isErrorPage)
  return (
    <StyledTopBar.Navigation {...rest}>
      <ErrorPageLink isErrorPage={isErrorPage} href="/all">
        <a href="/all">All Apps</a>
      </ErrorPageLink>
      <ErrorPageLink isErrorPage={isErrorPage} href="/faq" prefetch {...extraProps}>
        <a href="/faq">Learn more</a>
      </ErrorPageLink>
      <a
        href="#"
        onClick={(evt) => {
          evt.preventDefault()
          openNewsletterModal()
        }}
      >
        Get Updates
      </a>
      <ErrorPageLink isErrorPage={isErrorPage} href="/submit" {...extraProps}>
        <a href="/submit">Add your app</a>
      </ErrorPageLink>
    </StyledTopBar.Navigation>
  )
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ ...NewsletterActions }, dispatch)

const Navigation = connect(null, mapDispatchToProps)(NavigationComponent)

export {Navigation}
