import React from 'react';
import Head from '@containers/head';
import { useSelector, useDispatch } from 'react-redux';

import { AppDirectory } from '@components/app-directory';
import { Flex, Box } from '@blockstack/ui';
import { isUserSignedIn } from '@stores/user/selectors';
import UserStore from '@stores/user';
import { selectAppList } from '@stores/maker/selectors';

import { selectUser } from '@stores/apps/selectors';
import { Page } from '@components/page';
import { SignIn } from '@components/sign-in';
import { NoAppsEmptyState } from '@components/maker/empty-state/no-apps';

const AppDirectoryPageContainer: React.FC = ({ children }) => (
  <Page background="white">
    <Head title="Select your app" />
    <Flex alignItems="center">
      <Box>{children}</Box>
    </Flex>
  </Page>
);

type AppDirectoryPage = React.FC;

const AppDirectoryPage: AppDirectoryPage = () => {
  const dispatch = useDispatch();
  const signIn = (path: string) => dispatch(UserStore.actions.signIn(path));

  const { apps, isSignedIn, user } = useSelector(state => ({
    apps: selectAppList(state),
    isSignedIn: isUserSignedIn(state),
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

export default AppDirectoryPage;
