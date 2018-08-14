import * as React from 'react'
import { Flex, Box } from '@components/mining/index'

const MiningListItem = ({ ...rest }) => <Flex {...rest} />
const RenderItems = ({ items, ...rest }) => (
  <>
    {items.map((item, i) => {
      const isLast = i + 1 === items.length
      return item.children ? (
        <MiningListItem key={i} {...item} {...rest} />
      ) : (
        <MiningListItem key={i} borderBottom={isLast ? '0' : '1px solid white'} {...rest}>
          {item}
        </MiningListItem>
      )
    })}
  </>
)

const MiningList = ({ items, children, ...rest }) => (
  <Box border="1px solid white" {...rest}>
    {items ? <RenderItems items={items} /> : null}
    {children}
  </Box>
)

export { MiningList, MiningListItem }
