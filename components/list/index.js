import React from 'react'
import PropTypes from 'prop-types'
import { Type } from '@components/typography'
import { StyledList } from '@components/list/styled'
import { Button } from '@components/button'
import { Flex, Box } from 'rebass'

const HeaderItem = (props) => <Box width={[0, 0.5 / 4]} style={{ textAlign: 'left', overflow: 'hidden' }} {...props} />

const ListTableHeader = (props) => (
  <StyledList.Body.Header>
    <Flex px={3} pt={3} width={1}>
      <Box width={0.5}>Rank</Box>
      <HeaderItem>Auth</HeaderItem>
      <HeaderItem>Storage</HeaderItem>
      <HeaderItem>Blockchain</HeaderItem>
      <HeaderItem style={{textAlign: 'right'}}>Tweets/Week</HeaderItem>
    </Flex>
  </StyledList.Body.Header>
)

const Items = ({ items, item: Item, limit, width, ...rest }) =>
  items.map((item, i) => {
    const Component = () => <Item width={width} {...item} key={i} rank={i + 1} {...rest} />
    if (limit) {
      if (i <= limit) {
        return <Component />
      } else {
        return null
      }
    }
    return <Component />
  })

const ListContainer = ({ header, items, item, limit, width = [1, 1 / 2], ...rest }) => {
  const Header = () =>
    header ? (
      <StyledList.Header p={4}>
        <Type.h2>{header.title}</Type.h2>
        {header.action ? <Button dark>View All</Button> : null}
      </StyledList.Header>
    ) : null

  const itemProps = {
    items,
    item,
    limit,
    width: rest.single ? [1] : width,
    dispatch: rest.dispatch
  }
  return items ? (
    <StyledList mb={[4]} {...rest}>
      <Header />
      <StyledList.Body>
        {rest.single ? <ListTableHeader /> : null}
        <Items {...itemProps} single={rest.single} />
      </StyledList.Body>
    </StyledList>
  ) : null
}
ListContainer.defautProps = {
  limit: 7,
  width: [1, 1 / 2]
}
ListContainer.propTypes = {
  header: PropTypes.shape({
    title: PropTypes.node.isRequired,
    action: PropTypes.func
  }),
  items: PropTypes.arrayOf(PropTypes.object),
  item: PropTypes.node,
  limit: PropTypes.number.isRequired,
  width: PropTypes.arrayOf(PropTypes.number.isRequired)
}

export { ListContainer, Items }
