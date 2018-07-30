import React from 'react'

import { Page } from '@components/page'
import { Newsletter } from '@components/newsletter'
import { AppsList } from '@components/list/apps'
import { CategoriesList } from '@components/list/categories'
import { PlatformsList } from '@components/list/platforms'
import { Modal } from '@components/modal'
import Head from '@containers/head'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import AppStore from '@stores/apps'
import { doSelectPlatformFilter } from '@stores/apps'
import { selectPlatformFilter, selectPlatformName } from '@stores/apps/selectors'

class PlatformsPage extends React.PureComponent {
  static async getInitialProps({ query, reduxStore }) {
    const { platform } = query

    reduxStore.dispatch(doSelectPlatformFilter(platform))

    return {
      platform
    }
  }

  render() {
    return (
      <Page>
        <Head title={`${this.props.platformName} Apps`} />
        <Page.Section px>
          <Newsletter wrap />
        </Page.Section>
        <Page.Section p={0} px>
          <Page.Section wrap flexDirection={['column', 'column', 'row']} p={0}>
            <PlatformsList mr={[0, 3]} />
            <CategoriesList />
          </Page.Section>
        </Page.Section>
        <Page.Section flexDirection="column" px>
          <AppsList single/>
        </Page.Section>
        <Modal />
      </Page>
    )
  }
}

const mapStateToProps = (state) => ({
  platformFilter: selectPlatformFilter(state),
  platformName: selectPlatformName(state)
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, AppStore.actions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PlatformsPage)
