import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import queryString from 'query-string';

import Page, { Grid, GridColumn } from '@atlaskit/page';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faGithub from '@fortawesome/fontawesome-free-brands/faGithub';

import { Page as Container } from '@containers/page';
import { Header } from '@containers/header';
import { Hero } from '@containers/hero';
import AppIcon from '@containers/app-icon';

import StyledApp from '@components/app-details';
import { StyledAppList } from '@components/app-list';
import { Button } from '@components/button';

import AppStore from '@stores/apps';
import UserStore from '@stores/user';

class AppDetails extends React.Component {
  componentDidMount() {
    const parsed = queryString.parse(document.location.search);
    this.props.selectApp(parseInt(parsed.id, 10));
  }

  appDetails() {
    const app = this.props.selectedApp;
    const [ranking] = app.Rankings || [];
    let tweets = 0;
    if (ranking) {
      tweets = ranking.twitterMentions || 0;
    }
    return (
      <div>
        <Page>
          <Grid layout="fluid">
            <GridColumn medium={3}>
              <Grid>
                <GridColumn medium={1}>
                  <AppIcon app={app} />
                </GridColumn>
                <GridColumn medium={2}>
                  <h2>{app.name}</h2>
                </GridColumn>
              </Grid>
              <p>{app.description}</p>
              <Button type="button/primary">Visit Website</Button>
              <br />
              {app.openSourceUrl &&
                app.openSourceUrl.indexOf('github.com') !== -1 && (
                  <StyledApp.BrandLink href={app.openSourceUrl}>
                    <FontAwesomeIcon icon={faGithub} />
                    View on Github
                  </StyledApp.BrandLink>
                )}

              <br />
              <StyledApp.MainSection center>
                <StyledApp.ClaimApp href={`mailto:hello@app.co?subject=I want to claim ${app.name}`}>
                  Is this your app? Claim it now.
                </StyledApp.ClaimApp>
              </StyledApp.MainSection>
            </GridColumn>

            <GridColumn medium={6}>
              <StyledApp.MainSection>
                <StyledApp.TagLabel>Blockchain</StyledApp.TagLabel>
                <StyledAppList.TagGroup left>
                  <StyledAppList.Tag left>{app.blockchain}</StyledAppList.Tag>
                </StyledAppList.TagGroup>

                <br />

                <StyledApp.TagLabel>Storage Network</StyledApp.TagLabel>
                <StyledAppList.TagGroup left>
                  <StyledAppList.Tag left>{app.storageNetwork}</StyledAppList.Tag>
                </StyledAppList.TagGroup>

                <br />

                <StyledApp.TagLabel>Authentication</StyledApp.TagLabel>
                <StyledAppList.TagGroup left>
                  <StyledAppList.Tag left>{app.authentication}</StyledAppList.Tag>
                </StyledAppList.TagGroup>

                <br />

                <StyledApp.TagLabel>Category</StyledApp.TagLabel>
                <StyledAppList.TagGroup left>
                  <StyledAppList.Tag left>{app.category}</StyledAppList.Tag>
                </StyledAppList.TagGroup>
              </StyledApp.MainSection>
            </GridColumn>

            <GridColumn medium={3}>
              <StyledApp.StatNumber>{tweets}</StyledApp.StatNumber>
              <StyledApp.StatLabel>Tweets about {app.name} in the last 7 days</StyledApp.StatLabel>
            </GridColumn>
          </Grid>
        </Page>
      </div>
    );
  }

  render() {
    console.log('App details page', this.props);
    return (
      <div>
        <Header />
        <Hero />
        <Container.Section wrap={1}>
          <Container.Section.Content>{this.props.selectedApp && this.appDetails()}</Container.Section.Content>
        </Container.Section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedApp: state.apps.selectedApp,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, AppStore.actions, UserStore.actions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppDetails);
