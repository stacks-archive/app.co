import React from 'react'
import { Page } from '@components/page'
import { AppsList } from '@components/list/apps'
import Modal from '@containers/modals/app'
import Head from '@containers/head'

class AllAppsPage extends React.PureComponent {

  render() {
    return (
      <Page>
        <Head title='All Apps' />
        <Page.Section flexDirection="column" px>
          <AppsList single title="All Apps" />
        </Page.Section>
        <Modal />
      </Page>
    )
  }
}

export default AllAppsPage
