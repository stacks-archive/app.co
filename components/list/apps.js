import React from 'react'
import { Type } from '@components/typography'
import { StyledList } from '@components/list/styled'
import { Button } from '@components/button'
import { connect } from 'react-redux'
import {
  selectApps,
  selectAppCategoriesArray,
  selectBlockchainCategories,
  selectStorageCategories,
  selectAuthenticationCategories
} from '@stores/apps/selectors'
import { AppIcon } from '@components/app-icon'
import { Box } from '@components/box'
import { ArrowRightIcon } from 'mdi-react'
import { ListContainer } from '@components/list/index'
import { Tag } from '@components/tag'

const mapStateToProps = (state) => ({
  apps: selectApps(state),
  category: selectAppCategoriesArray(state),
  blockchain: selectBlockchainCategories(state),
  storage: selectStorageCategories(state),
  authentication: selectAuthenticationCategories(state)
})

const returnCorrectKey = (filter) => {
  switch (filter) {
    case 'storage':
      return 'storageNetwork'
    default:
      return filter
  }
}

const AppItem = ({ imageUrl, blockchain, name, authentication, description, storageNetwork, ...rest }) => {
  return (
    <StyledList.Item {...rest}>
      <AppIcon src={imageUrl} alt={name} />
      <Box style={{ flexGrow: 1 }} px={3}>
        <Type.h4>{name}</Type.h4>
        <Type.p p={0} my={2}>
          {description}
        </Type.p>
        <Type.span style={{ fontSize: '11px' }}>
          <Tag>{authentication}</Tag>
          <Tag>{storageNetwork}</Tag>
        </Type.span>
      </Box>
      <div>
        <Button light condensed icon={ArrowRightIcon} />
      </div>
    </StyledList.Item>
  )
}

const AppsList = connect(mapStateToProps)(({ filterBy = 'category', limit, apps, ...rest }) => {
  return (
    rest[filterBy] &&
    rest[filterBy].map((filter, i) => {
      const filteredList = apps.filter((app) => app[returnCorrectKey(filterBy)] === filter)
      return filteredList.length > 0 ? (
        <ListContainer
          key={i}
          header={{ title: filter, action: { label: 'View All' } }}
          items={filteredList}
          item={AppItem}
          {...rest}
        />
      ) : null
    })
  )
})

export { AppsList, AppItem }
