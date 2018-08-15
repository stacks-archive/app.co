import React from 'react'
import { MDXProvider } from '@mdx-js/tag'
import { Type } from '@components/typography'
import { slugify } from '@common'

const H1 = ({ children, ...rest }) => {
  const id = slugify(children.toString())
  return (
    <Type.h1 id={id} {...rest}>
      {children}
    </Type.h1>
  )
}
const H2 = ({ children, ...rest }) => {
  const id = slugify(children.toString())
  return (
    <Type.h2 id={id} {...rest}>
      {children}
    </Type.h2>
  )
}
const H3 = ({ children, ...rest }) => {
  const id = slugify(children.toString())
  return (
    <Type.h3 id={id} {...rest}>
      {children}
    </Type.h3>
  )
}

const Mdx = ({ children }) => (
  <MDXProvider
    components={{
      h1: H1,
      h2: H2,
      h3: H3,
      h4: Type.h4,
      h5: Type.h5,
      h6: Type.h6,
      p: Type.p,
      pre: Type.pre,
      ol: Type.ol,
      ul: Type.ul,
      li: Type.li
    }}
  >
    {children}
  </MDXProvider>
)

export { Mdx }
