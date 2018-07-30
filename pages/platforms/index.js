import React from 'react'
import PropTypes from 'prop-types'

import { Page } from '@components/page'
import { Newsletter } from '@components/newsletter'
import { AppsList } from '@components/list/apps'
import { CategoriesList } from '@components/list/categories'
import { PlatformsList } from '@components/list/platforms'
import Modal from '@containers/modals/app'
import Head from '@containers/head'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import AppStore, { doSelectPlatformFilter } from '@stores/apps'
import {
  selectPlatformName, 
  selectAllPlatforms
} from '@stores/apps/selectors'

class PlatformsPage extends React.PureComponent {
  propTypes = {
    platformName: PropTypes.string,
    platforms: PropTypes.array.isRequired
  }

  static async getInitialProps({ query, reduxStore }) {
    const { platform } = query

    if (platform) {
      reduxStore.dispatch(doSelectPlatformFilter(platform))
    }

    return {
      platform
    }
  }

  render() {
    const { platformName } = this.props
    return (
      <Page>
        <Head title={platformName ? `${platformName} Apps` : 'All Platforms'} />
        <Page.Section flexDirection="column" px>
          <AppsList single={!!platformName} sectionKeys={this.props.platforms} limit={platformName ? undefined : 7} filterBy='platform' />
        </Page.Section>
        <Modal />
      </Page>
    )
  }
}

const mapStateToProps = (state) => ({
  platformName: selectPlatformName(state),
  platforms: selectAllPlatforms(state)
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, AppStore.actions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PlatformsPage)
