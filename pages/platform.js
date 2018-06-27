import React from 'react';

import Page, { Grid, GridColumn } from '@atlaskit/page';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Head from 'next/head';

import { Page as Container } from '@containers/page';
import { Header } from '@containers/header';
import { Hero } from '@containers/hero';
import AppList from '@containers/app-list';

import AppStore from '@stores/apps';
import { doSelectPlatformFilter } from '@stores/apps';
import { selectPlatformFilter } from '@stores/apps/selectors';
import UserStore from '@stores/user';

import { capitalize } from '@utils';

class Platform extends React.Component {
  static getInitialProps({ req, reduxStore }) {

    const {
      params: { platform },
    } = req;

    reduxStore.dispatch(doSelectPlatformFilter(platform));

    return { platform };
  }

  render() {
    return (
      <>
        <Head>
          <title>{capitalize(this.props.platformFilter)} Apps on App.co - The Universal Dapp Store</title>
        </Head>
        <Header />
        <Hero />
        <Container.Section wrap={1}>
          <Container.Section.Content>
            <AppList show={25} />
          </Container.Section.Content>
        </Container.Section>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  platformFilter: selectPlatformFilter(state),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, AppStore.actions, UserStore.actions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Platform);