import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectCurrentApp, selectAppMiningApps } from '@stores/apps/selectors';
import { Flex, Box } from 'blockstack-ui';
import GithubCircleIcon from 'mdi-react/GithubCircleIcon';
import TwitterCircleIcon from 'mdi-react/TwitterCircleIcon';
import { Page as Container } from '@containers/page';
import { Header } from '@containers/header';
import { Hero } from '@containers/hero';
import AppIcon from '@containers/app-icon';
import AppStore, { doSelectApp } from '@stores/apps';
import StyledApp from '@components/app-details';
import { StyledAppList } from '@components/app-list';
import { Button } from '@components/button';
import Head from '@containers/head';

import UserStore from '@stores/user';

import app from '@pages/admin/app';
import { outboundLink } from '@utils';

class AppDetails extends React.Component {
  static getInitialProps({ req, reduxStore }) {
    const {
      params: { slug }
    } = req;

    reduxStore.dispatch(doSelectApp(slug));

    return { slug };
  }

  appDetails() {
    const { selectedApp: app, appMiningApps } = this.props;

    const [ranking] = app.Rankings || [];
    let tweets = 0;
    if (ranking) {
      tweets = ranking.twitterMentions || 0;
    }

    const isAppMiningApp = appMiningApps.find(
      appMiningapp => appMiningapp.name === app.name
    );
    return (
      <Flex flexWrap>
        <Box width={[1, 1, 1 / 4, 1 / 4]}>
          <Flex>
            <Box width={1 / 3}>
              <AppIcon app={app} />
            </Box>
            <Box width={2 / 3}>
              <h2>{app.name}</h2>
            </Box>
          </Flex>
          <p>{app.description}</p>
          <Button
            type="button/primary"
            onClick={() => {
              outboundLink(app);
            }}
          >
            Visit Website
          </Button>
          <br />
          {app.openSourceUrl && app.openSourceUrl.indexOf('github.com') !== -1 && (
            <>
              <StyledApp.BrandLink href={app.openSourceUrl} target="_blank">
                <GithubCircleIcon color="currentColor" />
                View on Github
              </StyledApp.BrandLink>
              <br />
            </>
          )}

          {app.twitterHandle && (
            <>
              <StyledApp.BrandLink
                href={`https://twitter.com/${app.twitterHandle}`}
                target="_blank"
              >
                <TwitterCircleIcon color="currentColor" />
                View on Twitter
              </StyledApp.BrandLink>
            </>
          )}

          <br />
        </Box>

        <Box width={[1, 1, 1 / 2, 1 / 2]} px={[0, 0, 3, 3]} mt={[2, 2, 0, 0]}>
          <StyledApp.MainSection>
            {app.blockchain && (
              <>
                <StyledApp.TagLabel>Blockchain</StyledApp.TagLabel>
                <StyledAppList.TagGroup left>
                  <StyledAppList.Tag left>{app.blockchain}</StyledAppList.Tag>
                </StyledAppList.TagGroup>
                <br />
              </>
            )}

            {app.storageNetwork && (
              <>
                <StyledApp.TagLabel>Storage Network</StyledApp.TagLabel>
                <StyledAppList.TagGroup left>
                  <StyledAppList.Tag left>
                    {app.storageNetwork}
                  </StyledAppList.Tag>
                </StyledAppList.TagGroup>
                <br />
              </>
            )}

            {app.authentication && (
              <>
                <StyledApp.TagLabel>Authentication</StyledApp.TagLabel>
                <StyledAppList.TagGroup left>
                  <StyledAppList.Tag left>
                    {app.authentication}
                  </StyledAppList.Tag>
                </StyledAppList.TagGroup>
                <br />
              </>
            )}

            {app.category && (
              <>
                <StyledApp.TagLabel>Category</StyledApp.TagLabel>
                <StyledAppList.TagGroup left>
                  <StyledAppList.Tag left>{app.category}</StyledAppList.Tag>
                </StyledAppList.TagGroup>
              </>
            )}
          </StyledApp.MainSection>
        </Box>

        <Box width={[1, 1, 1 / 4, 1 / 4]}>
          <StyledApp.StatNumber>{tweets}</StyledApp.StatNumber>
          <StyledApp.StatLabel>
            Tweets about {app.name} in the last 7 days
          </StyledApp.StatLabel>
        </Box>
      </Flex>
    );
  }

  render() {
    const app = this.props.selectedApp;
    const smallMetaContent =
      app.tweets > 0 ? { label1: 'Tweets this Week', data1: app.tweets } : {};
    const metaContent = {
      title: `${app.name} on App.co`,
      description: app.description,
      ogImage: app.imageUrl,
      ...smallMetaContent
    };
    return (
      <>
        <Head {...metaContent} />
        <Header />
        <Hero />
        <Container.Section wrap={1}>
          <Container.Section.Content>
            {this.props.selectedApp && this.appDetails()}
          </Container.Section.Content>
        </Container.Section>
      </>
    );
  }
}

const mapStateToProps = state => ({
  selectedApp: selectCurrentApp(state),
  appMiningApps: selectAppMiningApps(state)
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { ...AppStore.actions, ...UserStore.actions},
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppDetails);
