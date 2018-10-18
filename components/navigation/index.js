import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import NewsletterActions from '@stores/newsletter/actions'
import { StyledTopBar } from '@components/top-bar/styled'
import Link from 'next/link'

const ErrorPageLink = ({ isErrorPage, children, ...props }) =>
  isErrorPage ? children : <Link {...props}>{children}</Link>

const NavigationComponent = ({ handleClick, isErrorPage, openNewsletterModal, footer, admin, ...rest }) => {
  const extraProps = handleClick ? { onClick: () => handleClick() } : {}
  return (
    <StyledTopBar.Navigation {...rest}>
      {admin ? (
        <>
          <Link href="/admin">
            <a>Apps</a>
          </Link>
          <Link href="/admin/pending">
            <a>Pending</a>
          </Link>
          <Link href="/admin/mining/months">
            <a>Mining</a>
          </Link>
        </>
      ) : (
        <>
          <ErrorPageLink isErrorPage={isErrorPage} href="/all">
            <a href="/all">All apps</a>
          </ErrorPageLink>
          <ErrorPageLink isErrorPage={isErrorPage} href="/faq" prefetch {...extraProps}>
            <a href="/faq">Learn more</a>
          </ErrorPageLink>
          <ErrorPageLink isErrorPage={isErrorPage} href="/mining" prefetch {...extraProps}>
            <a href="/mining">App Mining</a>
          </ErrorPageLink>
          <a
            href="#"
            onClick={(evt) => {
              evt.preventDefault()
              openNewsletterModal()
            }}
          >
            Get updates
          </a>
          <ErrorPageLink isErrorPage={isErrorPage} href="/submit" {...extraProps}>
            <a href="/submit">Add your app</a>
          </ErrorPageLink>
        </>
      )}
    </StyledTopBar.Navigation>
  )
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ ...NewsletterActions }, dispatch)

const Navigation = connect(
  null,
  mapDispatchToProps
)(NavigationComponent)

export { Navigation }
