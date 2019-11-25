import React from 'react';
import { useRouter } from 'next/router';
import { Flex, Box, Type } from 'blockstack-ui';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectMaker,
  selectAppList,
  selectCurrentApp
} from '@stores/maker/selectors';
import { selectAppAction } from '@stores/maker/actions';
import { selectUser } from '@stores/apps/selectors';
import {
  MakerContainer,
  MakerContentBox,
  MakerStickyStatusBox
} from '@components/maker/styled';
import { Page } from '@components/page';
import { MakerNav } from '@components/maker/nav/maker-nav';
import Head from '@containers/head';
import Maker from '@components/maker';
import UserStore from '@stores/user';

const handleChangingApp = (event: any, fn: any) => (dispatch: Dispatch) => {
  event.persist();
  const id = event.target.value;
  dispatch(selectAppAction(id));
  fn(id);
};

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
);

const MakerPortal = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { user, maker, selectedApp, appList } = useSelector(state => ({
    user: selectUser(state),
    maker: selectMaker(state),
    selectedApp: selectCurrentApp(state),
    appList: selectAppList(state)
  }));

  const updateMakerRoute = (id: number) => router.push(`/maker/apps/${id}`);

  if (maker.loading || !selectedApp) return <LoadingPage />;

  const subNav = (
    <MakerNav
      apps={appList}
      userId={user && user.user && user.user.blockstackUsername}
      selectedAppId={selectedApp.id}
      handleSignOut={() => {
        dispatch(UserStore.actions.signOut());
        localStorage.clear();
        window.location.href = '/';
      }}
      onChange={e => handleChangingApp(e, updateMakerRoute)(dispatch)}
    />
  );

  return (
    <Page innerPadding={[0]} subNav={subNav} wrap>
      <Head title={selectedApp.name} />
      <MakerContainer>
        <Type fontSize={3} fontWeight={500} mx={[4, 6]} py={6} px={[20, 0]}>
          App Mining submission
        </Type>
        <Flex flexDirection={['column', 'column', 'row-reverse']}>
          <MakerStickyStatusBox>
            <Maker.Status app={selectedApp} />
          </MakerStickyStatusBox>
          <Box>
            <MakerContentBox>
              <Maker.PaymentDetails
                app={selectedApp}
                user={user}
                accessToken={user.jwt}
                dispatch={dispatch}
              />
            </MakerContentBox>
            <MakerContentBox>
              <Maker.KYC app={selectedApp} user={user} />
            </MakerContentBox>
            <MakerContentBox>
              <Maker.ParticipationAgreement app={selectedApp} user={user} />
            </MakerContentBox>
          </Box>
        </Flex>
      </MakerContainer>
    </Page>
  );
};

export default MakerPortal;
