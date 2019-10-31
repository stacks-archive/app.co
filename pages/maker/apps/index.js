import React from 'react'
import { useRouter } from 'next/router'
import { Flex, Box, Type } from 'blockstack-ui'
import { connect } from 'react-redux'
import isNaN from 'lodash/isNaN'

import { selectMaker, selectAppList, selectCurrentApp, selectCompetionStatus } from '@stores/maker/selectors'
import { fetchApps, selectAppAction } from '@stores/maker/actions'
import { selectApiServer, selectUser } from '@stores/apps/selectors'
import { MakerContainer, MakerContentBox, MakerStickyStatusBox } from '@components/maker/styled'
import { Page } from '@components/page'
import Head from '@containers/head'
import Maker from '@components/maker'

const mapStateToProps = (state) => ({
  user: selectUser(state),
  apiServer: selectApiServer(state),
  maker: selectMaker(state),
  appList: selectAppList(state),
  selectedApp: selectCurrentApp(state),
  completionStatus: selectCompetionStatus(state)
})

const handleChangingApp = (event, fn) => (dispatch) => {
  event.persist()
  const id = event.target.value
  dispatch(selectAppAction(id))
  fn(id)
}

const getAppId = (params) => {
  if (!params) return undefined
  const id = parseInt(params.appId, 10)
  if (isNaN(id)) return undefined
  return id
}

const LoadingPage = ({ message = 'Loading...' }) => (
  <Page innerPadding={0} wrap>
    <Flex>
      <Box width={1}>
        <Type fontSize={5} my={7} textAlign="center">
          {message}
        </Type>
      </Box>
    </Flex>
  </Page>
)

const MakerPortal = connect()(({ maker, selectedApp, appList, appId, apiServer, completionStatus, user, dispatch }) => {
  const router = useRouter()

  const updateMakerRoute = (id) =>
    router.push('/maker/apps', `/maker/apps/${id}`, {
      shallow: true
    })

  if (maker.loading || !selectedApp) return <LoadingPage />

  return (
    <Page innerPadding={0} wrap>
      <Head title={selectedApp.name} />
      <MakerContainer>
        <Box>
          {appList.length && (
            <select onChange={(e) => handleChangingApp(e, updateMakerRoute)(dispatch)} value={appId}>
              {appList.map(({ name, id }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          )}
        </Box>
        <Type fontSize={3} fontWeight={500} mx={[4, 6]} py={6} px={[20, 0]}>
          {selectedApp.name}
        </Type>
        <Flex
          flexDirection={['column', 'column', 'row-reverse']}
          maxWidth={['unset', 'unset', 1140]}
          alignItems="flex-start"
        >
          <MakerStickyStatusBox>
            <Maker.Status app={selectedApp} apiServer={apiServer} status={completionStatus} />
          </MakerStickyStatusBox>
          <Box>
            <MakerContentBox>
              <Maker.PaymentDetails app={selectedApp} user={user} apiServer={apiServer} dispatch={dispatch} />
            </MakerContentBox>
            <MakerContentBox>
              <Maker.KYC app={selectedApp} user={user} apiServer={apiServer} />
            </MakerContentBox>
            <MakerContentBox>
              <Maker.ParticipationAgreement app={selectedApp} user={user} apiServer={apiServer} />
            </MakerContentBox>
          </Box>
        </Flex>
      </MakerContainer>
    </Page>
  )
})

MakerPortal.getInitialProps = async ({ req, reduxStore }) => {
  const { params, universalCookies } = req
  const userCookie = universalCookies.cookies.jwt
  const appId = getAppId(params)
  const apiServer = selectApiServer(reduxStore.getState())
  await fetchApps({ apiServer, user: { jwt: userCookie } })(reduxStore.dispatch)
  let selectedApp = {}
  if (appId) {
    reduxStore.dispatch(selectAppAction(appId))
    selectedApp = selectCurrentApp(reduxStore.getState())
  } else {
    const firstApp = selectAppList(reduxStore.getState())[0]
    selectedApp = firstApp
  }
  const props = mapStateToProps(reduxStore.getState())

  return { appId, ...props, selectedApp, dispatch: reduxStore.dispatch }
}

export default MakerPortal
