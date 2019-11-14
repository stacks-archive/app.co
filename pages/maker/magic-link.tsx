import React from 'react';
import { connect } from 'react-redux';
import { Flex, Box, Type, Button } from 'blockstack-ui';
import { bindActionCreators } from 'redux';
import Link from 'next/link';
import UserStore from '@stores/user';
import { selectApiServer, selectUser } from '@stores/apps/selectors';
import { Page } from '@components/page';
import Head from '@containers/head';
import { AppIcon } from '@components/app-icon';

class MakerMagicLink extends React.Component {
  static async getInitialProps({ query, reduxStore }) {
    const { accessToken } = query;
    const apiServer = selectApiServer(reduxStore.getState());
    const appResult = await fetch(`${apiServer}/api/magic-link/${accessToken}`);
    console.log(appResult);
    const { app } = await appResult.json();

    return {
      app,
      apiServer,
      accessToken
    };
  }

  state = {
    loading: false,
    claimed: false
  };

  componentDidMount() {
    this.props.handleSignIn(this.props.apiServer);
    if (this.props.user && !this.props.app.adminBlockstackId) {
      this.claim(this.props.user);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { user } = this.props;
    if (!user && nextProps.user) {
      this.claim(user);
    }
  }

  claim = async user => {
    this.setState({
      loading: true
    });
    const { apiServer } = this.props;
    const uri = `${apiServer}/api/magic-link/${this.props.accessToken}`;
    await fetch(uri, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user.jwt}`
      }
    });
    this.setState({
      loading: false,
      claimed: true
    });
  };

  async signIn() {
    const path = document.location.pathname.slice(1);
    this.setState({ loading: true });
    this.props.signIn(path);
  }

  render() {
    const { app, user } = this.props;
    const { loading, claimed } = this.state;

    const isClaimed = app.adminBlockstackId || claimed;

    return (
      <Page fullHeight background="white">
        <Head title={`${app.name} - Maker Portal`} />
        <Page.Section flexDirection="column" px>
          <Flex>
            <Box
              width={1}
              maxWidth="550px"
              mx="auto"
              py={7}
              mb={7}
              textAlign="center"
            >
              <AppIcon
                src={app.imgixImageUrl}
                size={48}
                alt={app.name}
                mx="auto"
                mb={5}
              />
              {isClaimed ? (
                <>
                  <Type fontSize={4} fontWeight="500">
                    {app.name} is now owned by{' '}
                    {app.adminBlockstackId || user.user.blockstackUsername}
                  </Type>
                  <Type mt={5}>
                    Your Magic Link is now no longer functional. Instead, you
                    will use your Blockstack ID to sign in to the developer
                    portal.
                  </Type>
                  <Link href="/maker" passHref>
                    <Button mt={5}>Continue to Developer Portal</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Type fontSize={4} fontWeight="500">
                    Sign in with Blockstack to claim {app.name}
                  </Type>
                  <Type mt={5}>
                    You will use this Blockstack ID to make changes to your app,
                    and remove or modify your listing in the future.
                  </Type>
                  <Button mt={5} onClick={() => this.signIn()}>
                    {loading ? 'Loading...' : 'Sign in with Blockstack'}
                  </Button>
                </>
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
  apiServer: selectApiServer(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...UserStore.actions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MakerMagicLink);
