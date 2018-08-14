import React from 'react'
import PropTypes from 'prop-types'
import sortBy from 'lodash/sortBy'
import { dedupe } from '@common'

import { connect } from 'react-redux'

import {
  selectApps,
  selectAppCategoriesArray,
  selectBlockchainCategories,
  selectStorageCategories,
  selectAuthenticationCategories,
  selectFilteredApps,
  selectPlatformFilter,
  selectCategoryFilter,
  selectPlatformName,
  selectCategoryName
} from '@stores/apps/selectors'
import { selectAppsForPlatform } from '@stores/apps'
import { slugify } from '@common'

import { ListContainer } from '@components/list/index'
import AppItem from './item'

const getTwitterMentions = (app) => {
  const [ranking] = app.Rankings
  if (ranking) {
    return ranking.twitterMentions || 0
  }
  return 0
}

const mapStateToProps = (state) => ({
  apps: selectApps(state),
  category: selectAppCategoriesArray(state),
  blockchain: selectBlockchainCategories(state),
  storage: selectStorageCategories(state),
  authentication: selectAuthenticationCategories(state),
  platformFilter: selectPlatformFilter(state),
  filteredApps: selectFilteredApps(state),
  categoryFilter: selectCategoryFilter(state),
  platformName: selectPlatformName(state),
  categoryName: selectCategoryName(state)
})

const getApps = (props) => {
  const hasFilter = props.platformFilter || props.categoryFilter
  const isAll = hasFilter === 'all'
  const apps = hasFilter && !isAll ? props.filteredApps : props.apps
  const sortedApps = sortBy(apps, (app) => -getTwitterMentions(app))
  return sortedApps
}

class AppsListComponent extends React.Component {
  static propTypes = {
    filterBy: PropTypes.string,
    single: PropTypes.string,
    limit: PropTypes.number,
    apps: PropTypes.array.isRequired,
    sectionKeys: PropTypes.array,
    categoryName: PropTypes.string,
    platformName: PropTypes.string
  }

  constructor(props) {
    super(props)
    const sortedApps = getApps(props)
    this.state = {
      sortedApps
    }
  }

  componentWillReceiveProps(nextProps) {
    const sortedApps = getApps(nextProps)
    this.setState({ sortedApps })
  }

  render() {
    return this.props.single ? this.singleTable() : this.multilist()
  }

  multilist() {
    const { filterBy = 'category', single, limit, apps, sectionKeys, ...rest } = this.props
    const items = dedupe(sectionKeys) || rest[filterBy]

    return (
      items &&
      items.map((filter) => {
        let filteredList
        let path
        if (filterBy === 'category') {
          filteredList = apps.filter((app) => app.category === filter)
          path = `/categories`
        } else {
          filteredList = selectAppsForPlatform(apps, filter)
          path = `/platforms`
        }

        const link = {
          as: `${path}/${slugify(filter)}`,
          href: {
            pathname: path,
            query: {
              [filterBy]: slugify(filter)
            }
          }
        }

        return filteredList.length > 0 ? (
          <ListContainer
            key={filter}
            header={{ title: filter, action: { label: 'View All' }, white: true, ...link }}
            items={filteredList}
            item={AppItem}
            width={[1, 1 / 2, 1 / 3]}
            limit={limit}
            single={false}
            href={path + '/' + slugify(filter)}
            {...rest}
          />
        ) : null
      })
    )
  }

  singleTable() {
    const { single, platformName, categoryName, title, limit, ...rest } = this.props
    const { sortedApps } = this.state
    return (
      <ListContainer
        header={{ title: title || platformName || categoryName, white: true }}
        items={sortedApps}
        item={AppItem}
        width={[1, 1 / 2, 1 / 3]}
        limit={limit}
        single
        {...rest}
      />
    )
  }
}

const AppsList = connect(mapStateToProps)(AppsListComponent)

export default AppsList
