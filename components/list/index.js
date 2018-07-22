import React from 'react'
import { Type } from '@components/typography'
import { StyledList } from '@components/list/styled'
import { Button } from '@components/button'


const listItems = (items, Component, limit, width) =>
  items.map(
    (item, i) =>
      limit ? (
        i <= limit ? (
          <Component width={width} {...item} key={i} />
        ) : null
      ) : (
        <Component width={width} {...item} key={i} />
      )
  )

const ListContainer = ({ header, items, item, limit, width = [1, 1 / 2], ...rest }) => {
  const Header = () =>
    header ? (
      <StyledList.Header p={4}>
        <Type.h2>{header.title}</Type.h2>
        {header.action ? <Button dark>View All</Button> : null}
      </StyledList.Header>
    ) : null

  return items ? (
    <StyledList mb={[4]} {...rest}>
      <Header />
      <StyledList.Body>{listItems(items, item, limit, width)}</StyledList.Body>
    </StyledList>
  ) : null
}


export { ListContainer, listItems }
