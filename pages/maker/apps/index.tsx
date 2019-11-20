import React from 'react';
import Head from '@containers/head';
import { bindActionCreators } from 'redux';
import { connect, useSelector } from 'react-redux';

import Head from '@containers/head';
import { AppDirectory } from '@components/app-directory';
import { Flex, Box } from '@blockstack/ui';
import { isUserSignedIn } from '@stores/user/selectors';
import UserStore from '@stores/user';
import { selectAppList } from '@stores/maker/selectors';

import { selectApiServer, selectUser } from '@stores/apps/selectors';
import { Page } from '@components/page';
import { SignIn } from '@components/sign-in';
import { NoAppsEmptyState } from '@components/maker/empty-state/no-apps';

interface AppDirectoryPageProps {
  signIn: any;
}

const AppDirectoryPageContainer: React.FC = ({ children }) => (
  <Page background="white">
    <Head title="Select your app" />
    <Flex alignItems="center">
      <Box>{children}</Box>
    </Flex>
  </Page>
);

type AppDirectoryPage = React.FC<AppDirectoryPageProps>;

const AppDirectoryPage: AppDirectoryPage = ({ signIn }) => {

  const { apps, isSignedIn, user } = useSelector(state => ({
    apps: selectAppList(state),
    isSignedIn: isUserSignedIn(state),
    apiServer: selectApiServer(state),
    user: selectUser(state)
  }));

  if (isSignedIn && apps.length === 0) {
    return (
      <AppDirectoryPageContainer>
        <NoAppsEmptyState username={user.user.blockstackUsername} />
      </AppDirectoryPageContainer>
    );
  }

  return (
    <AppDirectoryPageContainer>
      {isSignedIn ? (
        <AppDirectory apps={apps} />
      ) : (
        <SignIn handleSignIn={() => signIn('maker/apps')} />
      )}
    </AppDirectoryPageContainer>
  );
};

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({ ...UserStore.actions }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(AppDirectoryPage);
