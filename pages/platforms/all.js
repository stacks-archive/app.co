import React from 'react'
import PropTypes from 'prop-types'
import { Page } from '@components/page'
import { doSelectPlatformFilter, doClearPlatformFilter } from '@stores/apps'
import { PlatformsList } from '@components/list/platforms'
import { Type } from '@components/typography'

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
    return (
      <Page>
        <Page.Section p={0} pl={[0, 4]} pr={[0, 4]}>
          <Page.Section wrap flexDirection={['column']} p={0}>
            <Type.h2 pb={4}>All Platforms</Type.h2>
            <PlatformsList limit={0} width={[1, 1 / 4]} noAll />
          </Page.Section>
        </Page.Section>
      </Page>
    )
  }
}

export default PlatformsPage
