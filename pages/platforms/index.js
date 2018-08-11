import React from 'react'
import PropTypes from 'prop-types'
import { Page } from '@components/page'
import { AppsList } from '@components/list/apps'
import Modal from '@containers/modals/app'
import Head from '@containers/head'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AppStore, { doSelectPlatformFilter, doClearPlatformFilter } from '@stores/apps'
import { selectPlatformName, selectAllPlatforms } from '@stores/apps/selectors'
import { PlatformsList } from '@components/list/platforms'
import Platform from '@pages/platform'

const mapStateToProps = (state) => ({
  platformName: selectPlatformName(state),
  platforms: selectAllPlatforms(state)
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, AppStore.actions), dispatch)
}

/**
 * We are using connect on this component and not the class
 * because the class cannot run getInitialProps if it's connected
 */
const PageContent = connect(mapStateToProps, mapDispatchToProps)(
  ({ platformName, platform = 'all', platforms, ...rest }) => (
    <>
      <Head title={platformName ? `${platformName} Apps` : 'All Platforms'} />
      <Page.Section flexDirection="column" px>
        <AppsList
          single={!!platform}
          sectionKeys={platforms}
          limit={platform ? undefined : 7}
          filterBy="platform"
          {...rest}
        />
      </Page.Section>
      <Modal />
    </>
  )
)

class PlatformsPage extends React.PureComponent {
  propTypes = {
    platformName: PropTypes.string,
    platforms: PropTypes.array.isRequired
  }
  static async getInitialProps({ req, query, reduxStore }) {
    if (req) {
      /**
       * On the server we need to check the req object for the param
       */
      const {
        params: { platform }
      } = req

      if (platform) {
        reduxStore.dispatch(doSelectPlatformFilter(platform))
        return { platform }
      } else {
        reduxStore.dispatch(doClearPlatformFilter())
      }
    }
    if (query) {
      /**
       * On the client we need to check the query param for what category we're trying to display
       */
      const { platform } = query
      if (platform) {
        reduxStore.dispatch(doSelectPlatformFilter(platform))
        return { platform }
      } else {
        reduxStore.dispatch(doClearPlatformFilter())
      }
    }
    return {}
  }

  render() {
    const extraProps = !this.props.platform
      ? {
          title: 'All Platforms'
        }
      : {}
    return (
      <Page>
        <PlatformsList limit={0} width={[1, 1 / 3]} selectedItem={this.props.platform || 'all-platforms'} />
        <PageContent {...this.props} {...extraProps} />
      </Page>
    )
  }
}

export default PlatformsPage
