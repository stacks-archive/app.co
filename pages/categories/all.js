import React from 'react'
import { CategoriesList } from '@components/list/categories'
import { Page } from '@components/page'
import { Type } from '@components/typography'

const CategoriesAllPage = (props) => (
  <Page {...props}>
    <Page.Section p={0} pl={[0, 4]} pr={[0, 4]}>
      <Page.Section wrap flexDirection={['column']} p={0}>
        <Type.h2 pb={4}>All Categories</Type.h2>
        <CategoriesList limit={0} width={[1, 1 / 4]} noAll />
      </Page.Section>
    </Page.Section>
  </Page>
)
export default CategoriesAllPage
