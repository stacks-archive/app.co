import React from 'react'
import { selectApiServer } from '@stores/apps/selectors'
import { Flex, Box, Type } from 'blockstack-ui'
import { Section, Content } from '@components/mining-admin/month'
import { Page } from '@components/page'
import Head from '@containers/head'
import Maker from '@components/maker'

const SECTIONS = {
  PAYMENT: 'payment',
  ID: 'identity',
  ESIGN: 'esign',
  STATUS: 'status',
  info: 'info'
}

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

  state = {
    section: SECTIONS.PAYMENT
  }

  render() {
    const { app, apiServer, accessToken } = this.props
    const { section } = this.state
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
                <Box width="200px" style={{ borderRight: '1px solid #e4e4e4', minWidth: '200px' }}>
                  <Maker.SidebarButton
                    active={section === SECTIONS.PAYMENT}
                    onClick={() => this.setState({ section: SECTIONS.PAYMENT })}
                  >
                    Payment Details
                  </Maker.SidebarButton>
                  <Maker.SidebarButton
                    active={section === SECTIONS.ID}
                    onClick={() => this.setState({ section: SECTIONS.ID })}
                  >
                    Identity Verification
                  </Maker.SidebarButton>
                  <Maker.SidebarButton
                    active={section === SECTIONS.ESIGN}
                    onClick={() => this.setState({ section: SECTIONS.ESIGN })}
                  >
                    Document Signing
                  </Maker.SidebarButton>
                  <Maker.SidebarButton
                    active={section === SECTIONS.STATUS}
                    onClick={() => this.setState({ section: SECTIONS.STATUS })}
                  >
                    App Mining Status
                  </Maker.SidebarButton>
                  {/* <Maker.SidebarButton
                    active={section === SECTIONS.INFO}
                    onClick={() => this.setState({ section: SECTIONS.INFO })}
                  >
                    General Information
                  </Maker.SidebarButton> */}
                </Box>
                <Box flexGrow={1}>
                  <Type fontSize={3} fontWeight={500} py={6} px={6}>
                    {app.name}
                  </Type>
                  <Content>
                    <Maker.PaymentDetails
                      app={app}
                      apiServer={apiServer}
                      accessToken={accessToken}
                      display={section === SECTIONS.PAYMENT}
                    />
                    <Maker.ParticipationAgreement
                      app={app}
                      apiServer={apiServer}
                      accessToken={accessToken}
                      display={section === SECTIONS.ESIGN}
                    />
                    <Maker.KYC
                      app={app}
                      apiServer={apiServer}
                      accessToken={accessToken}
                      display={section === SECTIONS.ID}
                    />
                    <Maker.Status
                      app={app}
                      apiServer={apiServer}
                      accessToken={accessToken}
                      display={section === SECTIONS.STATUS}
                    />
                    {/* <Maker.Info display={section === SECTIONS.INFO} /> */}
                    <Type mt={7} display="block" is="a" fontSize={1} href="https://www.sec.gov/Archives/edgar/data/1693656/000110465919039476/a18-15736_1partiiandiii.htm">SEC Participation Agreement</Type>
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
