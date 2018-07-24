import React from 'react'
import PropTypes from 'prop-types'
import { Type } from '@components/typography'
import { StyledList } from '@components/list/styled'
import { Button } from '@components/button'

const Items = ({ items, item: Item, limit, width }) =>
  items.map((item, i) => {
    const Component = () => <Item width={width} {...item} key={i} />
    if (limit) {
      if (i <= limit) {
        return <Component />
      } else {
        return null
      }
    }
    return <Component />
  })

const ListContainer = ({ header, items, item, limit = 7, width = [1, 1 / 2], ...rest }) => {
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
    width
  }
  return items ? (
    <StyledList mb={[4]} {...rest}>
      <Header />
      <StyledList.Body>
        <Items {...itemProps} />
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
