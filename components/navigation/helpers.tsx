import React from 'react'
import Link from 'next/link'

import { StyledAnchor } from '@components/top-bar/styled'
import { NavLink } from '@common/constants';

export const ErrorPageLink: React.FC<any> = ({ isErrorPage, children, onClick, href, ...props }) =>
  isErrorPage
    ? children
    : <Link href={href} {...props}>{children}</Link>

interface LinkListProps {
  list: NavLink[];
  isErrorPage: boolean;
}

export const LinkList = ({ list, isErrorPage }: LinkListProps) => (
  <>
    {
      list.map(({ name, href }) => (
        <ErrorPageLink key={name} isErrorPage={isErrorPage} href={href} >
          <StyledAnchor href={href} >{name}</StyledAnchor>
        </ErrorPageLink>
      ))
    }
  </>
)
