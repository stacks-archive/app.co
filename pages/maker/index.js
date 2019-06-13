import React from 'react'
import { selectApiServer } from '@stores/apps/selectors'
import { Flex, Box, Type } from 'blockstack-ui'
import { Section, Content } from '@components/mining-admin/month'
import { Page } from '@components/page'
import Head from '@containers/head'
import Maker from '@components/maker'

export default class MakerPortal extends React.Component {
  static async getInitialProps({ query, reduxStore }) {
    const { accessToken } = query

    const apiServer = selectApiServer(reduxStore.getState())

    const appResult = await fetch(`${apiServer}/api/maker/app?accessToken=${accessToken}`)
    const { app } = await appResult.json()

    return {
      app,
      apiServer,
      accessToken
    }
  }

  render() {
    const { app, apiServer, accessToken } = this.props
    return (
      <Page wrap={false}>
        <Head title={app.name} />
        <Flex
          width={1}
          px={[1, 3]}
          mb={5}
          flexDirection={['column', 'column', 'column', 'row']}
          justifyContent="space-between"
          flexWrap="wrap"
        >
          <Box width={1}>
            <Section>
              <Flex>
                <Box width="200px">
                  <Maker.SidebarButton>
                    Payment Details
                  </Maker.SidebarButton>
                  <Maker.SidebarButton>
                    Identity Verification
                  </Maker.SidebarButton>
                  <Maker.SidebarButton>
                    Document Signing
                  </Maker.SidebarButton>
                </Box>
                <Box flexGrow={1}>
                  <Content>
                    <Type fontSize={3} fontWeight={500}>{app.name}</Type>
                    <Maker.PaymentDetails app={app} apiServer={apiServer} accessToken={accessToken} />
                  </Content>
                </Box>
              </Flex>
            </Section>
          </Box>
        </Flex>
      </Page>
    )
  }
}
