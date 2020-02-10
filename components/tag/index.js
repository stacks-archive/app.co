import React from 'react';
import Link from 'next/link';

import { StyledTag, StyledTagLink } from '@components/tag/styled';

const Tag = ({ children, ...rest }) =>
  children ? <StyledTag {...rest}>{children}</StyledTag> : null;

const TagLink = ({ children, href, as, ...rest }) => (
  <Link href={href} as={as}>
    <StyledTagLink href={as} {...rest}>
      {children}
    </StyledTagLink>
  </Link>
);

export { Tag, TagLink };
