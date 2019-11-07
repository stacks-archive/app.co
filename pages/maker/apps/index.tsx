import React, { useEffect } from 'react'
import Head from '@containers/head'
import { bindActionCreators } from 'redux'
import { connect, useSelector } from 'react-redux'

import { AppDirectory } from '@components/app-directory'
import { ThemeProvider, theme, Flex, Box } from '@blockstack/ui'
import { isUserSignedIn } from '@stores/user/selectors'
import UserStore from '@stores/user'
import { selectAppList } from '@stores/maker/selectors'

import { selectApiServer } from '@stores/apps/selectors'
import { Page } from '@components/page'
import { SignIn } from '@components/sign-in'

interface AppDirectoryPageProps {
  handleSignIn(server: string): any;
  signIn: any;
}

const AppDirectoryPage: React.FC<AppDirectoryPageProps> = ({ signIn, handleSignIn }) => {
  const { apps, isSignedIn, apiServer } = useSelector(state => ({
    apps: selectAppList(state),
    isSignedIn: isUserSignedIn(state),
    apiServer: selectApiServer(state)
  }))

  useEffect(() => {
    async function signInCheck () {
      await handleSignIn(apiServer)
    }
    signInCheck()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Page fullHeight background="white">
        <Head title="Select your app" />
        <Flex alignItems="center">
          <Box>
            {
              isSignedIn
                ? <AppDirectory apps={apps} />
                : <SignIn handleSignIn={() => signIn('maker/apps')} />
            }
          </Box>
        </Flex>
      </Page>
    </ThemeProvider>
  )
}

const mapDispatchToProps = (dispatch: any) => bindActionCreators({ ...UserStore.actions }, dispatch)

export default connect(null, mapDispatchToProps)(AppDirectoryPage)
