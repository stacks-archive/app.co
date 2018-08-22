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

const baseProps = {
  lineHeight: '1.65'
}

const Mdx = ({ children }) => (
  <MDXProvider
    components={{
      h1: (props) => <H1 mt={5} mb={4} {...props} />,
      h2: (props) => <H2 {...props} />,
      h3: (props) => <H3 {...props} />,
      h4: (props) => <Type.h4 {...props} />,
      h5: (props) => <Type.h5 {...props} />,
      h6: (props) => <Type.h6 {...props} />,
      p: (props) => <Type.p {...baseProps} {...props} />,
      pre: (props) => <Type.pre {...baseProps} {...props} />,
      ol: (props) => <Type.ol mt={3} display="inline-block" {...baseProps} {...props} />,
      ul: (props) => <Type.ul mt={3} display="inline-block" {...baseProps} {...props} />,
      li: (props) => <Type.li my="2px" {...baseProps} {...props} />
    }}
  >
    {children}
  </MDXProvider>
)

export { Mdx }
