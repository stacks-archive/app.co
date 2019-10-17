import React, { useEffect } from 'react'
import { Flex, Box, Type } from 'blockstack-ui'
import { connect } from 'react-redux'

import { selectMaker, selectAppList, selectCurrentApp } from '@stores/maker/reducer'
import { fetchApps, selectAppAction } from '@stores/maker/actions'
import { selectApiServer, selectUser } from '@stores/apps/selectors'
import { Page } from '@components/page'
import Head from '@containers/head'
import Maker from '@components/maker'
import { MakerContainer, MakerContentBox, MakerStickyStatusBox } from '@components/maker/styled'

const MakerPortal = ({ apiServer, user, maker, loading, errorMessage, appList, selectedApp, dispatch }) => {

  useEffect(() => {
    fetchApps({ apiServer, user })(dispatch)
  }, [])

  const app = selectedApp

  function handleChangingApp (event) {
    event.persist()
    const id = event.target.value
    dispatch(selectAppAction(id))
  }

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

  return (
    <Page innerPadding={0} wrap>
      <Head title={app.name} />
      <MakerContainer>
        <Box>
          <select onChange={handleChangingApp}>
            {appList.map(({ name, id }) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>
        </Box>
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
  maker: selectMaker(state),
  appList: selectAppList(state),
  selectedApp: selectCurrentApp(state)
})

export default connect(mapStateToProps)(MakerPortal)
