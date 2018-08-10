import React from 'react'
import PropTypes from 'prop-types'
import sortBy from 'lodash/sortBy'

import { connect } from 'react-redux'

import { selectApps } from '@stores/apps/selectors'

import { ListContainer } from '@components/list/index'
import AppItem from './item'

class FeaturedListComponent extends React.Component {
  static propTypes = {
    allApps: PropTypes.array.isRequired,
    appNames: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    query: PropTypes.string,
    filterBy: PropTypes.string,
    href: PropTypes.string
  }

  getFilteredApps() {
    const { allApps, appNames } = this.props
    let filtered = allApps.filter((app) => appNames.indexOf(app.name) !== -1)
    filtered = sortBy(filtered, (app) => appNames.indexOf(app.name))
    return filtered
  }

  render() {
    const { title, href, filterBy, query } = this.props
    const link = href
      ? {
          as: `/${filterBy}/${query}`,
          href: {
            pathname: `/${filterBy}`,
            query: {
              [filterBy]: query
            }
          }
        }
      : {}
    const header = {
      title,
      white: true,
      ...link
    }

    if (href) {
      header.action = { label: 'View All' }
    }
    return (
      <ListContainer
        header={header}
        items={this.getFilteredApps()}
        item={AppItem}
        width={[1, 1 / 2, 1 / 3]}
        single={false}
        href={href}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  allApps: selectApps(state)
})

const FeaturedList = connect(mapStateToProps)(FeaturedListComponent)

export default FeaturedList
