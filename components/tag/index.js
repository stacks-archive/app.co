import React from 'react'
import { StyledTag } from '@components/tag/styled'

const Tag = ({ children, ...rest }) => (children ? <StyledTag {...rest}>{children}</StyledTag> : null)

export { Tag }
