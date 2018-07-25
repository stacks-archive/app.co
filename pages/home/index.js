import React from 'react'
import { Page } from '@components/page'
import { Newsletter } from '@components/newsletter'
import { AppsList } from '@components/list/apps'
import { CategoriesList } from '@components/list/categories'
import { doSelectApp } from '@stores/apps'
import { PlatformsList } from '@components/list/platforms'
import { Modal } from '@components/modal'
import Head from 'next/head'
class HomePage extends React.PureComponent {
  state = {
    filterBy: 'category'
  }

  static getInitialProps({ req, reduxStore }) {
    if (req) {
      const {
        params: { appSlug }
      } = req

      reduxStore.dispatch(doSelectApp(appSlug))

      return {
        appSlug
      }
    }

    return {}
  }

  render() {
    return (
      <Page>
        <Head>
          <title>App.co - The Universal Dapp Store</title>
        </Head>
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
          <AppsList filterBy={this.state.filterBy} />
        </Page.Section>
        <Modal />
      </Page>
    )
  }
}

export { HomePage }
