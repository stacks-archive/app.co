import * as React from 'react'
import system from 'system-components'
import tag from 'clean-tag'

const Box = system(
  {
    is: tag
  },
  'width',
  'space',
  'fontSize',
  'color',
  'flex',
  'order',
  'alignSelf',
  'opacity',
  'position',
  'top',
  'right',
  'left',
  'bottom',
  'minHeight',
  'borderRadius',
  'maxHeight',
  'maxWidth',
  'minWidth',
  'borders',
  'display'
)

const SystemFlex = system(
  {
    is: Box
  },
  'flexWrap',
  'flexDirection',
  'alignItems',
  'justifyContent'
)

const Flex = (props) => <SystemFlex display="flex" {...props} />

export { Box, Flex }
