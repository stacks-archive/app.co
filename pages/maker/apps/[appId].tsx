import React from 'react'
import { useRouter } from 'next/router'
import { Flex, Box, Type } from 'blockstack-ui'
import { connect } from 'react-redux'
import isNaN from 'lodash/isNaN'

import { selectMaker, selectAppList, selectCurrentApp } from '@stores/maker/selectors'
import { fetchApps, selectAppAction } from '@stores/maker/actions'
import { selectApiServer, selectUser } from '@stores/apps/selectors'
import { MakerContainer, MakerContentBox, MakerStickyStatusBox } from '@components/maker/styled'
import { Page } from '@components/page'
import { MakerNav } from '@components/maker/nav/maker-nav'
import Head from '@containers/head'
import Maker from '@components/maker'
import UserStore from '@stores/user'


const mapStateToProps = (state: any) => ({
  user: selectUser(state),
  apiServer: selectApiServer(state),
  maker: selectMaker(state),
  appList: selectAppList(state),
  selectedApp: selectCurrentApp(state)
})

const handleChangingApp = (event: any, fn: any) => (dispatch: any) => {
  event.persist()
  const id = event.target.value
  dispatch(selectAppAction(id))
  fn(id)
}

const getAppId = (params: any) => {
  if (!params) return undefined
  const id = parseInt(params.appId, 10)
  if (isNaN(id)) return undefined
  return id
}

const LoadingPage = ({ message = 'Loading...' }) => (
  <Page innerPadding={[0]} wrap>
    <Flex>
      <Box width={1}>
        <Type fontSize={5} my={7} textAlign="center">
          {message}
        </Type>
      </Box>
    </Flex>
  </Page>
)

const MakerPortal = connect()(({ maker, selectedApp, appList, apiServer, user, dispatch }: any) => {
  const router = useRouter()

  const updateMakerRoute = (id: number) => router.push(`/maker/apps/${id}`)

  if (maker.loading || !selectedApp) return <LoadingPage />

  const subNav = (
    <MakerNav
      apps={appList}
      userId="kyranjamie.id"
      selectedAppId={selectedApp.id}
      handleSignOut={() => {
        dispatch(UserStore.actions.signOut())
        localStorage.clear()
        window.location.href = '/'
      }}
      onChange={e => handleChangingApp(e, updateMakerRoute)(dispatch)}
    />
  )

  return (
    <Page innerPadding={[0]} subNav={subNav} wrap>
      <Head title={selectedApp.name} />
      <MakerContainer>
        <Type fontSize={3} fontWeight={500} mx={[4, 6]} py={6} px={[20, 0]}>
          {selectedApp.name}
        </Type>
        <Flex flexDirection={['column', 'column', 'row-reverse']}>
          <MakerStickyStatusBox>
            <Maker.Status app={selectedApp} />
          </MakerStickyStatusBox>
          <Box>
            <MakerContentBox>
              <Maker.PaymentDetails app={selectedApp} user={user} apiServer={apiServer} accessToken={user.jwt} dispatch={dispatch} />
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
  const { params } = req
  const appId = getAppId(params)
  if (selectAppList(reduxStore.getState()).length === 0) {
    const { universalCookies } = req
    const userCookie = universalCookies.cookies.jwt
    const apiServer = selectApiServer(reduxStore.getState())
    await fetchApps({ apiServer, user: { jwt: userCookie } })(reduxStore.dispatch)
  }
  reduxStore.dispatch(selectAppAction(appId))
  const selectedApp = selectCurrentApp(reduxStore.getState())
  const props = mapStateToProps(reduxStore.getState())
  return { appId, selectedApp, ...props, dispatch: reduxStore.dispatch }
}

export default MakerPortal
