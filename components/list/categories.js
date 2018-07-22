import React from 'react'
import { Type } from '@components/typography'
import { StyledList } from '@components/list/styled'
import { connect } from 'react-redux'
import { selectApps, selectAppCategoriesArray } from '@stores/apps/selectors'
import { ListContainer } from '@components/list/index'
import { Box } from '@components/box'

const mapStateToProps = (state) => ({
  apps: selectApps(state),
  categories: selectAppCategoriesArray(state)
})

const CategoryItem = ({ category, ...rest }) => (
  <StyledList.Item {...rest} link>
    <Box style={{ flexGrow: 1 }} px={0}>
      <Type.strong>{category}</Type.strong>
    </Box>
  </StyledList.Item>
)

const CategoriesList = connect(mapStateToProps)(({ categories, apps, ...rest }) => {
  const modifiedArray = categories.slice(0, 5).map((category) => ({ category }))
  const lastItem = {
    category: 'All Categories'
  }
  const categoriesArray = [...modifiedArray, lastItem]

  return (
    <>
      <ListContainer items={categoriesArray} item={CategoryItem} width={[1 / 2, 1 / 3]} {...rest} />
    </>
  )
})

export { CategoriesList }
