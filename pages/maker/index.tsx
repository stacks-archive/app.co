import React from 'react'
import Head from '@containers/head'
import { connect } from 'react-redux'
import { AppDirectory } from '@components/app-directory'
import { Flex, Box } from '@blockstack/ui'

import { Page } from '@components/page'


const SAMPLE_APPS = [
  {
    name: 'Sigle',
    id: 1
  },
  {
    name: 'XorDrive',
    id: 2
  }
]

const AppDirectoryPage = () => (
  <Page fullHeight background="white">
    <Head title="Select your app" />
    <Flex height={[null, null, '70vh']} alignItems="center">
      <Box>
        <AppDirectory apps={SAMPLE_APPS} />
      </Box>
    </Flex>
  </Page>
)

export default connect(state => state)(AppDirectoryPage)
