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
  'borders'
)

const Flex = system(
  {
    is: Box
  },
  { display: 'flex' },
  'flexWrap',
  'flexDirection',
  'alignItems',
  'justifyContent'
)

export { Box, Flex }
