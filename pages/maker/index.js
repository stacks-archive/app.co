import React from 'react'
import styled from 'styled-components'
import { Flex, Box, Type } from 'blockstack-ui'

import { selectApiServer } from '@stores/apps/selectors'
import { Section, Content } from '@components/mining-admin/month'
import { Page } from '@components/page'
import Head from '@containers/head'
import Maker from '@components/maker'

import { MakerContainer, StyledBox } from './maker-layout'

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
      <Page innerPadding={0} wrap={true}>
        <Head title={app.name} />
        <MakerContainer>
          <Type fontSize={3} fontWeight={500} mx={[4, 6]} py={6} px={[20, 0]}>
            {app.name}
          </Type>
          <Flex flexDirection={['column', 'column', 'row-reverse']} maxWidth={[null, null, 1140]}>
            <Box>
              <Maker.Status app={app} apiServer={apiServer} accessToken={accessToken} display={true} />
            </Box>
            <Box>
              <StyledBox>
                <Maker.PaymentDetails app={app} apiServer={apiServer} accessToken={accessToken} display={true} />
              </StyledBox>
              <StyledBox>
                <Maker.KYC app={app} apiServer={apiServer} accessToken={accessToken} display={true} />
              </StyledBox>
              <StyledBox>
                <Maker.ParticipationAgreement app={app} apiServer={apiServer} accessToken={accessToken} display={true} />
              </StyledBox>
            </Box>
          </Flex>
        </MakerContainer>
      </Page>
    )
  }
}
