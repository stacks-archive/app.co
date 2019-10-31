import React from 'react';
import Link from 'next/link'

import { StyledAnchor } from '@components/top-bar/styled'
import { NavLink } from '@common/constants';

export const ErrorPageLink: React.FC<any> = ({ isErrorPage, children, onClick, href, ...props }) =>
  isErrorPage
    ? children
    : <Link href={href} {...props}>{children}</Link>


export const generateLinkList = (list: NavLink[]) => ({ isErrorPage }) => (
  <>
  {
    list.map(({ name, href }) => (
      <ErrorPageLink key= { name } isErrorPage = { isErrorPage } href = { href } >
        <StyledAnchor href={ href } >{ name } </StyledAnchor>
      </ErrorPageLink>
    ))
  }
  </>
)
