import React from 'react'
import Head from '@containers/head'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { AppDirectory } from '@components/app-directory'
import { Flex, Box } from '@blockstack/ui'
import { isUserSignedIn } from '@stores/user/selectors'
import UserStore from '@stores/user'

import { selectApiServer } from '@stores/apps/selectors'
import { Page } from '@components/page'
import { SignIn } from '@components/sign-in'

const SAMPLE_APPS = [
  {
    name: 'Sigle',
    id: 28
  },
  {
    name: 'XorDrive',
    id: 2
  }
]

interface AppDirectoryPageProps {
  isSignedIn: boolean;
  apiServer: string;
  handleSignIn(server: string): any;
  signIn: any;
}

const AppDirectoryPage: React.FC<AppDirectoryPageProps> = ({ isSignedIn, apiServer, signIn, handleSignIn }) => {
  handleSignIn(apiServer)
  return (
    <Page fullHeight background="white">
      <Head title="Select your app" />
      <Flex height={[null, null, '70vh']} alignItems="center">
        <Box>
          {
            isSignedIn
              ? <AppDirectory apps={SAMPLE_APPS} />
              : <SignIn handleSignIn={() => signIn('maker/apps')} />
          }
        </Box>
      </Flex>
    </Page>
  )
}

const mapStateToProps = (state: any) => ({
  isSignedIn: isUserSignedIn(state),
  apiServer: selectApiServer(state)
})

const mapDispatchToProps = (dispatch: any) => bindActionCreators({ ...UserStore.actions }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AppDirectoryPage)
