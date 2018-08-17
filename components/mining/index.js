import * as React from 'react'
import system from 'system-components'
import tag from 'clean-tag'
import { animated } from 'react-spring'

const Box = system(
  {
    is: animated(tag)
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
  'display',
  'backgroundImage',
  'backgroundPosition',
  'backgroundRepeat',
  'backgroundSize',
  'zIndex',
  'overflow'
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
const Img = system(
  {
    is: tag.img
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
const Input = system(
  {
    is: tag.input
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

const Flex = (props) => <SystemFlex display="flex" {...props} />

export { Box, Flex, Img, Input }
