import React from 'react'
import PropTypes from 'prop-types'
import sortBy from 'lodash/sortBy'

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

const mapStateToProps = (state) => ({
  allApps: selectApps(state)
})

const getApps = ({ allApps, appNames }) => {
  let filtered = allApps.filter((app) => appNames.indexOf(app.name) !== -1)
  console.log(appNames.length, filtered.length)
  filtered = sortBy(filtered, (app) => appNames.indexOf(app.name))
  return filtered
}

class FeaturedListComponent extends React.Component {
  static propTypes = {
    allApps: PropTypes.array.isRequired,
    appNames: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired
  }

  // constructor(props) {
  //   super(props)
  //   const filteredApps = getApps(props)
  //   this.state = {
  //     filteredApps
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    const sortedApps = getApps(nextProps)
    this.setState({ sortedApps })
  }

  render() {
    const { title } = this.props
    const filteredApps = getApps(this.props)
    return (
      <ListContainer
        header={{ title, white: true }}
        items={filteredApps}
        item={AppItem}
        width={[1, 1 / 2, 1 / 3]}
        // limit={filtered}
        single={false}
      // href={path + slugify(filter)}
      // {...rest}
      />
    )


    // return (
    //   items &&
    //   items.map((filter) => {
    //     let filteredList
    //     let path
    //     if (filterBy === 'category') {
    //       filteredList = apps.filter((app) => app.category === filter)
    //       path = `/categories/`
    //     } else {
    //       filteredList = selectAppsForPlatform(apps, filter)
    //       path = `/platforms/`
    //     }
    //     return filteredList.length > 0 ? (
    //       <ListContainer
    //         key={filter}
    //         header={{ title: filter, action: { label: 'View All' }, white: true }}
    //         items={filteredList}
    //         item={AppItem}
    //         width={[1, 1 / 2, 1 / 3]}
    //         limit={limit}
    //         single={false}
    //         href={path + slugify(filter)}
    //         {...rest}
    //       />
    //     ) : null
    //   })
    // )
  }

  singleTable() {
    const { single, platformName, categoryName, limit, ...rest } = this.props
    const { sortedApps } = this.state
    return (
      <ListContainer
        header={{ title: platformName || categoryName, white: true }}
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

const FeaturedList = connect(mapStateToProps)(FeaturedListComponent)

export default FeaturedList
