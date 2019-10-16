import React, { useEffect } from 'react'
import { Flex, Box, Type } from 'blockstack-ui'
import { connect } from 'react-redux'

import { selectMaker } from '@stores/maker/reducer'
import { fetchApps } from '@stores/maker/actions'
import { selectApiServer, selectUser } from '@stores/apps/selectors'
import { Page } from '@components/page'
import Head from '@containers/head'
import Maker from '@components/maker'
import { MakerContainer, MakerContentBox, MakerStickyStatusBox } from '@components/maker/styled'


const MakerPortal = ({ apiServer, user, maker, loading, errorMessage, dispatch }) => {

  useEffect(() => {
    fetchApps({ apiServer, user })(dispatch)
  }, [])

  const app = maker.appEntities[maker.appIds[0]]
  if (loading || !app) {
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
  console.log(app)
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
              status={maker.status}
            />
          </MakerStickyStatusBox>
          <Box>
            <MakerContentBox>
              <Maker.PaymentDetails
                app={app}
                user={user}
                apiServer={apiServer}
                dispatch={dispatch}
                // onPaymentDetailsComplete={() => dispatch(setPaymentDetailsComplete())}
              />
            </MakerContentBox>
            <MakerContentBox>
              <Maker.KYC
                app={app}
                user={user}
                apiServer={apiServer}
                // onKycComplete={() => dispatch(setKycComplete())}
              />
            </MakerContentBox>
            <MakerContentBox>
              <Maker.ParticipationAgreement
                app={app}
                user={user}
                apiServer={apiServer}
                // onLegalComplete={() => dispatch(setLegalComplete())}
              />
            </MakerContentBox>
          </Box>
        </Flex>
      </MakerContainer>
    </Page>
  )
}

const mapStateToProps = (state) => ({
  user: selectUser(state),
  apiServer: selectApiServer(state),
  maker: selectMaker(state)
})

export default connect(mapStateToProps)(MakerPortal)
