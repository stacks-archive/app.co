import React from 'react'
import Link from 'next/link'

import { StyledTag, StyledTagLink } from '@components/tag/styled'

const Tag = ({ children, ...rest }) => (children ? <StyledTag {...rest}>{children}</StyledTag> : null)

const TagLink = ({ children, href, ...rest }) => (
  <Link href={href}>
    <StyledTagLink href={href} {...rest}>
      {children}
    </StyledTagLink>
  </Link>
)

export { Tag, TagLink }
