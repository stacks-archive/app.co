import React from 'react'
import { Type } from '@components/typography'
import { StyledList } from '@components/list/styled'
import { connect } from 'react-redux'
import { selectApps, selectAppCategoriesArray } from '@stores/apps/selectors'
import { ListContainer } from '@components/list/index'
import { Box } from '@components/box'
import { Truncate } from 'rebass'
import { slugify } from '@common'
import Link from 'next/link'

const mapStateToProps = (state) => ({
  apps: selectApps(state),
  categories: selectAppCategoriesArray(state)
})

const CategoryItem = ({ category, link, ...rest }) => (
  <Link href={link.as} prefetch>
    <StyledList.ItemLink {...rest} link>
      <Box style={{ flexGrow: 1, maxWidth: '100%' }} px={2}>
        <Type.strong>
          <Truncate>{category}</Truncate>
        </Type.strong>
      </Box>
    </StyledList.ItemLink>
  </Link>
)

const CategoriesList = connect(mapStateToProps)(({ categories, apps, ...rest }) => {
  const modifiedArray = categories.slice(0, 5).map((category) => ({
    category,
    link: {
      as: `/categories/${slugify(category)}`,
      href: {
        pathname: `/categories`,
        query: {
          category: slugify(category)
        }
      }
    }
  }))
  const lastItem = {
    category: 'All Categories',
    link: {
      as: `/categories`,
      href: {
        pathname: `/categories`
      }
    }
  }
  const categoriesArray = [...modifiedArray, lastItem]

  return (
    <>
      <ListContainer items={categoriesArray} item={CategoryItem} width={[1, 1/2]} {...rest} />
    </>
  )
})

export { CategoriesList }
