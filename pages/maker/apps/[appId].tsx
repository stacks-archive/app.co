import React from 'react';
import { useRouter } from 'next/router';
import { Flex, Box, Text } from '@blockstack/ui';
import { useSelector, useDispatch } from 'react-redux';

import { selectMaker, selectCurrentApp } from '@stores/maker/selectors';
import { selectUser } from '@stores/apps/selectors';
import {
  MakerContainer,
  MakerContentBox,
  MakerStickyStatusBox,
} from '@components/maker/styled';
import { Page } from '@components/page';
import { MakerNav } from '@containers/maker-nav';
import Head from '@containers/head';
import Maker from '@components/maker';

const LoadingPage = ({ message = 'Loading...' }) => (
  <Page innerPadding={[0]} wrap>
    <Flex>
      <Box width={1}>
        <Text fontSize={5} my={7} textAlign="center">
          {message}
        </Text>
      </Box>
    </Flex>
  </Page>
);

const MakerPortal = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { user, maker, selectedApp } = useSelector(state => ({
    user: selectUser(state),
    maker: selectMaker(state),
    selectedApp: selectCurrentApp(state),
  }));

  if (selectedApp.authentication.toLowerCase() !== 'blockstack') {
    router.replace('/maker/apps/blockstack-only');
    return <></>;
  }

  if (maker.loading || !selectedApp) return <LoadingPage />;

  return (
    <Page
      innerPadding={[0]}
      align="flex-start"
      subNav={
        <MakerNav
          selectedAppId={selectedApp.id}
          onSignOut={() => {
            window.location.href = '/';
          }}
        />
      }
      wrap
    >
      <Head title={selectedApp.name} />
      <MakerContainer>
        <Box>
          <Text
            as="h1"
            display="block"
            fontSize={4}
            color="ink"
            fontWeight={500}
            mx={[4, 6, 0]}
            pt={6}
            pb={[0, 6]}
            px={[4, 0]}
          >
            App Mining submission
          </Text>
        </Box>
        <Flex
          flexDirection={['column', 'column', 'row-reverse']}
          justifyContent="flex-end"
        >
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
              <Maker.Kyc app={selectedApp} user={user} />
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
