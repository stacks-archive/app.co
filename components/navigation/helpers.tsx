import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { StyledAnchor } from '@components/top-bar/styled';
import { NavLink } from '@common/constants';

interface ErrorPageLinkProps {
  isErrorPage: boolean;
  href: string;
  [prop: string]: any;
}

type ErrorPageLink = React.FC<ErrorPageLinkProps>;

export const ErrorPageLink: ErrorPageLink = ({
  isErrorPage,
  children,
  href,
  ...props
}) =>
  isErrorPage ? (
    <>{children}</>
  ) : (
    <Link href={href} {...props}>
      {children}
    </Link>
  );

interface LinkListProps {
  list: NavLink[];
  isErrorPage: boolean;
  activeRoute?: string;
}

export const LinkList: React.FC<LinkListProps> = ({ list, isErrorPage }) => (
  <>
    {list.map(({ name, href }) => (
      <ErrorPageLink key={name} isErrorPage={isErrorPage} href={href}>
        <StyledAnchor href={href}>{name}</StyledAnchor>
      </ErrorPageLink>
    ))}
  </>
);

export const ActiveLinkList: React.FC<LinkListProps> = ({
  list,
  isErrorPage,
}) => {
  const { pathname } = useRouter();
  return (
    <>
      {list.map(({ name, href }) => {
        const isActiveRoute = href === pathname;
        return (
          <ErrorPageLink key={name} isErrorPage={isErrorPage} href={href}>
            <StyledAnchor topNav href={href} active={isActiveRoute}>
              {name}
            </StyledAnchor>
          </ErrorPageLink>
        );
      })}
    </>
  );
};
