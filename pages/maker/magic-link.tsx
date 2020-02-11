import React from 'react';
import { connect } from 'react-redux';
import { Flex, Box, Text, Button } from '@blockstack/ui';
import { bindActionCreators } from 'redux';
import Link from 'next/link';
import UserStore from '@stores/user';
import { fetchApps } from '@stores/maker/actions';
import { selectUser } from '@stores/apps/selectors';
import { Page } from '@components/page';
import Head from '@containers/head';
import { AppIcon } from '@components/app-icon';
import { App } from '@models/app';
import { MakerNav } from '@containers/maker-nav';

const MagicLinkClaimed = ({ app, user }) => (
  <>
    <Text display="block" color="ink" fontSize={4}>
      {app.name} is now owned by{' '}
      <Text color="ink.600">
        {app.adminBlockstackID || user.user.blockstackUsername}
      </Text>
    </Text>
    <Text display="block" mt={5}>
      Your Magic Link is now no longer functional. Instead, you will use your
      Blockstack ID to manage your app.
    </Text>
    <Link href="/maker/apps" passHref>
      <Button mt={5}>Continue to Developer Portal</Button>
    </Link>
  </>
);

const MagicLinkUnclaimed = ({
  app,
  loading,
  isSignedIn,
  user,
  handleSignIn,
  handleClaim,
}) => (
  <>
    <Text display="block" color="ink" fontSize={4}>
      {isSignedIn ? (
        <Text>
          Claim the app with{' '}
          <Text color="ink.600">{user.blockstackUsername}</Text>
        </Text>
      ) : (
        `Sign in with Blockstack to claim ${app.name}`
      )}
    </Text>
    <Text display="block" mt={5}>
      You will use this Blockstack ID to manage your app, and remove or modify
      your listing in the future.
    </Text>
    {isSignedIn ? (
      <Button mt={5} onClick={handleClaim}>
        Claim app
      </Button>
    ) : (
      <Button mt={5} onClick={handleSignIn}>
        {loading ? 'Loading...' : 'Sign in with Blockstack'}
      </Button>
    )}
  </>
);

interface MakerMagicLinkProps {
  app: App;
  user: any;
  accessToken: string;
  signIn(path: string): void;
  fetchApps({ user: any }): void;
}

class MakerMagicLink extends React.Component<MakerMagicLinkProps> {
  static async getInitialProps({ query }) {
    const { accessToken } = query;
    const appResult = await fetch(
      `${process.env.API_SERVER}/api/magic-link/${accessToken}`
    );
    console.log(appResult);
    const { app } = await appResult.json();

    return {
      app,
      accessToken,
    };
  }

  state = {
    loading: false,
    claimed: false,
  };

  claim = async user => {
    this.setState({
      loading: true,
    });
    const uri = `${process.env.API_SERVER}/api/magic-link/${this.props.accessToken}`;
    await fetch(uri, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user.jwt}`,
      },
    });
    this.setState({
      loading: false,
      claimed: true,
    });
    this.props.fetchApps({ user });
  };

  async signIn() {
    const path = document.location.pathname.slice(1);
    this.setState({ loading: true });
    this.props.signIn(path);
  }

  render() {
    const { app, user } = this.props;
    const { loading, claimed } = this.state;

    const isClaimed = app.adminBlockstackID || claimed;

    return (
      <Page fullHeight subNav={<MakerNav />} background="white">
        <Head title={`${app.name} - Maker Portal`} />
        <Page.Section flexDirection="column" px>
          <Flex>
            <Box maxWidth="550px" mx="auto" py={48} mb={7} textAlign="center">
              <AppIcon
                src={app.imgixImageUrl}
                size={48}
                alt={app.name}
                mx="auto"
                mb={5}
              />
              {isClaimed ? (
                <MagicLinkClaimed app={app} user={user} />
              ) : (
                <MagicLinkUnclaimed
                  app={app}
                  user={user.user}
                  isSignedIn={user && user.jwt}
                  loading={loading}
                  handleClaim={() => this.claim(user)}
                  handleSignIn={() => this.signIn()}
                />
              )}
            </Box>
          </Flex>
        </Page.Section>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  user: selectUser(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...UserStore.actions, fetchApps }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MakerMagicLink);
