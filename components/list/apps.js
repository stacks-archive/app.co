import React from 'react'
import { Type } from '@components/typography'
import { StyledList } from '@components/list/styled'
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
import { ListContainer } from '@components/list/index'
import { Tag } from '@components/tag'
import { slugify } from '@common'
import PropTypes from 'prop-types'
import { Truncate } from 'rebass'
import Link from 'next/link'

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
  const AppTags = () => (
    <Type.span style={{ fontSize: '11px' }}>
      <Tag>{authentication}</Tag>
      <Tag>{storageNetwork}</Tag>
    </Type.span>
  )
  return (
    <StyledList.Item {...rest} link>
      <Link href={`/app/${rest.Slugs[0].value}`}>
        <a>
          <AppIcon src={imageUrl} alt={name} size={48} />
          <Box style={{ flexGrow: 1, maxWidth: '85%' }} px={3}>
            <Type.h4>{name}</Type.h4>
            <Type.p p={0} my={2}>
              <Truncate>{description}</Truncate>
            </Type.p>
          </Box>
        </a>
      </Link>
    </StyledList.Item>
  )
}

AppItem.propTypes = {
  imageUrl: PropTypes.string,
  blockchain: PropTypes.string,
  name: PropTypes.string,
  authentication: PropTypes.string,
  description: PropTypes.string,
  storageNetwork: PropTypes.string
}

const AppsList = connect(mapStateToProps)(({ filterBy = 'category', single, limit, apps, ...rest }) => {
  console.log(single, rest[filterBy])
  const items = single ? rest[filterBy].filter((filter) => slugify(filter) === single) : rest[filterBy]
  return (
    items &&
    items.map((filter, i) => {
      const filteredList = apps.filter((app) => app[returnCorrectKey(filterBy)] === filter)
      return filteredList.length > 0 ? (
        <ListContainer
          key={i}
          header={{ title: filter, action: { label: 'View All' }, white: true }}
          items={filteredList}
          item={AppItem}
          width={[1, 1 / 2, 1 / 3]}
          {...rest}
        />
      ) : null
    })
  )
})

AppsList.propTypes = {
  filterBy: PropTypes.string,
  single: PropTypes.string,
  limit: PropTypes.number,
  apps: PropTypes.array.isRequired
}

export { AppsList, AppItem }
