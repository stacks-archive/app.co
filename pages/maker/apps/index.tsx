import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Head from '@containers/head';
import { AppDirectory } from '@components/app-directory';
import { Flex, Box } from '@blockstack/ui';
import { isUserSignedIn } from '@stores/user/selectors';
import UserStore from '@stores/user';
import { selectAppList } from '@stores/maker/selectors';

import { selectUser } from '@stores/apps/selectors';
import { Page } from '@components/page';
import { SignIn } from '@components/sign-in';
import { NoAppsEmptyState } from '@components/maker/empty-state/no-apps';
import { MakerNav } from '@containers/maker-nav';

interface AppDirectoryContainerProps {
  nav?: React.ReactNode;
}

type AppDirectoryContainer = React.FC<AppDirectoryContainerProps>;

const AppDirectoryContainer: AppDirectoryContainer = ({ children, nav }) => (
  <Page background="white" subNav={nav}>
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
    user: selectUser(state),
  }));

  const nav = isSignedIn ? <MakerNav /> : null;

  if (isSignedIn && apps.length === 0) {
    return (
      <AppDirectoryContainer nav={nav}>
        <NoAppsEmptyState
          username={user && user.user && user.user.blockstackUsername}
        />
      </AppDirectoryContainer>
    );
  }

  return (
    <AppDirectoryContainer nav={nav}>
      {isSignedIn ? (
        <AppDirectory apps={apps} />
      ) : (
        <SignIn handleSignIn={() => signIn('maker/apps')} />
      )}
    </AppDirectoryContainer>
  );
};

export default AppDirectoryPage;
