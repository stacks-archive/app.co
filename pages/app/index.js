import React from 'react'
import { doSelectApp } from '@stores/apps'
import { selectCurrentApp } from '@stores/apps/selectors'
import { connect } from 'react-redux'
import { Page } from '@components/page'
import { AppCard } from '@components/app-card'

const mapStateToProps = (state) => ({
  app: selectCurrentApp(state)
})

class AppSinglePage extends React.PureComponent {
  static getInitialProps({ req, reduxStore }) {
    const {
      params: { slug }
    } = req

    reduxStore.dispatch(doSelectApp(slug))

    return {
      slug
    }
  }

  render() {
    const [ranking] = this.props.app.Rankings || []
    let tweets = 0
    if (ranking) {
      tweets = ranking.twitterMentions || 0
    }
    return (
      <Page>
        <Page.Section wrap>
          <AppCard {...this.props.app} tweets={tweets} homeLink mt={4} />
        </Page.Section>
      </Page>
    )
  }
}

export default connect(mapStateToProps)(AppSinglePage)
