import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Page as Container } from '@containers/page';
import { Header } from '@containers/header';
import { Hero } from '@containers/hero';
import AppList from '@containers/app-list';
import Head from '@containers/head';

import AppStore, { doSelectPlatformFilter } from '@stores/apps';
import { selectPlatformName } from '@stores/apps/selectors';
import UserStore from '@stores/user';

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
        <Head title={`${this.props.platformName} Apps`} />
        <Header />
        <Hero />
        <Container.Section wrap={1}>
          <Container.Section.Content>
            <AppList show={25} />
          </Container.Section.Content>
        </Container.Section>
      </>
    );
  }
}

const mapStateToProps = state => ({
  platformName: selectPlatformName(state),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    Object.assign({}, AppStore.actions, UserStore.actions),
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Platform);
