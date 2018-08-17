import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { Flex, Box } from 'rebass'
import Router from 'next/router'

import { Type } from '@components/typography'
import { StyledList } from '@components/list/styled'
import { Button } from '@components/button'

const HeaderItem = (props) => <StyledList.TableItem width={[0, 0.5 / 4]} height={['0px', '50px']} {...props} />

const ListTableHeader = () => (
  <StyledList.Body.Header height={['0px', '50px']}>
    <Flex px={3} py={[0, 3]} width={[0, 1]}>
      <Box width={[0, 0.5]} style={{ overflow: 'hidden' }}>
        Rank
      </Box>
      <HeaderItem>Auth</HeaderItem>
      <HeaderItem>Storage</HeaderItem>
      <HeaderItem>Blockchain</HeaderItem>
      <HeaderItem style={{ textAlign: 'right' }}>Tweets/Week</HeaderItem>
    </Flex>
  </StyledList.Body.Header>
)

const Items = ({ items, item: Item, limit, width, selectedItem, ...rest }) =>
  items.map((item, i) => {
    const isSelected = item.slug && item.slug === selectedItem ? true : undefined
    const Component = () => <Item width={width} {...item} key={i} rank={i + 1} {...rest} selected={isSelected} />
    if (limit && limit !== 0) {
      if (i <= limit) {
        return <Component />
      } else {
        return null
      }
    }
    return <Component />
  })

const ListContainer = ({ header, items, item, limit, href, as, width = [1, 1 / 2], selectedItem, ...rest }) => {
  const HeaderWrapper = (props) =>
    !header.action ? (
      <StyledList.Header {...props} />
    ) : (
      <StyledList.Header
        {...props}
        onClick={() =>
          Router.push(
            {
              ...header.href
            },
            header.as || as
          ).then(() => window.scrollTo(0, 0))
        }
      />
    )

  const hasBackgroundImage = header && header.background && header.background[0]
  const hasVisibleActionButton = header && header.action && header.href
  // background-position: calc(100% + 100px) 0%;
  // background-size: 1230px;
  const backgroundProps = hasBackgroundImage
    ? {
        backgroundImage: [header.background[0], header.background[1]],
        backgroundSize: ['cover', '1230px'],
        backgroundPosition: ['center right', hasVisibleActionButton ? '100% 50%' : 'calc(100% + 100px) center'],
        backgroundRepeat: 'no-repeat',
        alignItems: ['flex-start', 'center'],
        minHeight: ['150px', '100px']
      }
    : { alignItems: 'center', minHeight: ['100px'] }
  const buttonVariant = hasBackgroundImage ? { light: true } : { dark: true }
  const Header = () =>
    header ? (
      <HeaderWrapper py={4} px={[3, 4]} title={header.title} {...backgroundProps}>
        <>
          <Type.h2 maxWidth={[hasBackgroundImage ? '160px' : '100%', '100%']}>{header.title}</Type.h2>
          {header.action &&
            header.href && (
              <Link href={header.href ? header.href : href} as={header.as ? header.as : as}>
                <Button {...buttonVariant} style={{ marginLeft: 32 }} href={header.as ? header.as : as}>
                  View All
                </Button>
              </Link>
            )}
        </>
      </HeaderWrapper>
    ) : null

  const itemProps = {
    items,
    item,
    limit,
    width: rest.single ? [1] : width,
    dispatch: rest.dispatch,
    selectedItem
  }
  return items ? (
    <StyledList mb={[3, 4]} {...rest}>
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
  width: PropTypes.arrayOf(PropTypes.number.isRequired),
  href: PropTypes.string,
  as: PropTypes.string
}

export { ListContainer, Items }
