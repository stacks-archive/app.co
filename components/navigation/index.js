import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NewsletterActions from '@stores/newsletter/actions';
import { StyledTopBar } from '@components/top-bar/styled';
import Link from 'next/link';

const ErrorPageLink = ({ isErrorPage, children, onClick, ...props }) =>
  isErrorPage ? children : <Link {...props}>{children}</Link>;

const NavigationComponent = ({
  handleClick,
  isErrorPage,
  openNewsletterModal,
  footer,
  admin,
  display,
  ...rest
}) => {
  const extraProps = handleClick ? { onClick: () => handleClick() } : {};
  return (
    <StyledTopBar.Navigation
      flexWrap={footer ? 'wrap' : undefined}
      display={display}
    >
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
          <ErrorPageLink
            isErrorPage={isErrorPage}
            href={{ pathname: '/platforms', query: { platform: 'blockstack' } }}
            as="/blockstack"
          >
            <a href="/blockstack">All apps</a>
          </ErrorPageLink>
          <ErrorPageLink isErrorPage={isErrorPage} href="/faq" {...extraProps}>
            <a href="/faq">Learn more</a>
          </ErrorPageLink>
          <a
            href="https://blog.app.co"
            target="_blank"
            rel="noopener noreferrer"
          >
            Blog
          </a>
          <a
            href="#"
            onClick={evt => {
              evt.preventDefault();
              openNewsletterModal();
            }}
          >
            Get updates
          </a>
          {footer && (
            <>
              <ErrorPageLink isErrorPage={isErrorPage} href="/privacy">
                <a href="/privacy">Privacy Policy</a>
              </ErrorPageLink>
              <ErrorPageLink isErrorPage={isErrorPage} href="/terms">
                <a href="/terms">Terms of Use</a>
              </ErrorPageLink>
            </>
          )}
          <ErrorPageLink
            isErrorPage={isErrorPage}
            href="/submit"
            {...extraProps}
          >
            <a href="/submit">Add your app</a>
          </ErrorPageLink>
        </>
      )}
    </StyledTopBar.Navigation>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...NewsletterActions }, dispatch);

const Navigation = connect(
  null,
  mapDispatchToProps
)(NavigationComponent);

export { Navigation };
