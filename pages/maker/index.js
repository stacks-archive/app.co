import React from 'react'
import { Flex, Box, Type } from 'blockstack-ui'
import { connect } from 'react-redux'

import { selectApiServer, selectUser } from '@stores/apps/selectors'
import { Page } from '@components/page'
import Head from '@containers/head'
import Maker from '@components/maker'
import { MakerContainer, MakerContentBox, MakerStickyStatusBox } from '@components/maker/styled'

class MakerPortal extends React.Component {

  state = {
    loading: true,
    apps: [],
    errorMessage: null,
    status: {
      paymentDetailsComplete: false,
      kycComplete: false,
      legalComplete: false
    }
  }

  componentDidMount() {
    this.fetchApps()
  }

  async fetchApps() {
    const { apiServer, user } = this.props

    if (!(user && user.jwt)) {
      this.setState({
        ...this.state,
        loading: false,
        errorMessage: 'Please sign in to access the maker portal.'
      })
      return
    }

    const uri = `${apiServer}/api/maker/apps`
    const response = await fetch(uri, {
      headers: {
        Authorization: `Bearer ${user.jwt}`
      }
    })
    const { apps } = await response.json()
    this.setState({
      loading: false,
      apps
    })
  }

  updateStatus (props) {
    this.setState({ ...this.state, status: { ...this.state.status, ...props } })
  }

  setPaymentDetailsComplete () {
    this.updateStatus({ paymentDetailsComplete: true })
  }

  setKycComplete () {
    this.updateStatus({ kycComplete: true })
  }

  setLegalComplete () {
    this.updateStatus({ legalComplete: true })
  }

  render() {
    const { apiServer, user } = this.props

    const { loading, errorMessage, apps } = this.state
    const [app] = apps // TODO: this is for now until we handle multiple apps

    if (loading || errorMessage) {
      return (
        <Page innerPadding={0} wrap>
          <Flex>
            <Box width={1}>
              <Type fontSize={5} my={7} textAlign="center">{loading ? 'Loading...' : errorMessage}</Type>
            </Box>
          </Flex>
        </Page>
      )
    }

    return (
      <Page innerPadding={0} wrap>
        <Head title={app.name} />
        <MakerContainer>
          <Type fontSize={3} fontWeight={500} mx={[4, 6]} py={6} px={[20, 0]}>
            {app.name}
          </Type>
          <Flex flexDirection={['column', 'column', 'row-reverse']} maxWidth={[null, null, 1140]} alignItems="flex-start">
            <MakerStickyStatusBox>
              <Maker.Status
                app={app}
                apiServer={apiServer}
                status={this.state.status}
              />
            </MakerStickyStatusBox>
            <Box>
              <MakerContentBox>
                <Maker.PaymentDetails
                  app={app}
                  user={user}
                  apiServer={apiServer}
                  onPaymentDetailsComplete={() => this.setPaymentDetailsComplete()}
                />
              </MakerContentBox>
              <MakerContentBox>
                <Maker.KYC
                  app={app}
                  user={user}
                  apiServer={apiServer}
                  onKycComplete={() => this.setKycComplete()}
                />
              </MakerContentBox>
              <MakerContentBox>
                <Maker.ParticipationAgreement
                  app={app}
                  user={user}
                  apiServer={apiServer}
                  onLegalComplete={() => this.setLegalComplete()}
                />
              </MakerContentBox>
            </Box>
          </Flex>
        </MakerContainer>
      </Page>
    )
  }
}

const mapStateToProps = (state) => ({
  user: selectUser(state),
  apiServer: selectApiServer(state)
})

export default connect(mapStateToProps)(MakerPortal)
