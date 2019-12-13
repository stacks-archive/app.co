import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Page } from '@components/page';
import Head from '@containers/head';

import AppStore from '@stores/apps';
import UserStore from '@stores/user';

class AdminHome extends React.Component {
  componentDidMount() {
    if (this.props.jwt) {
      this.props.fetchAdminApps(this.props.jwt);
    }
  }

  render() {
    return (
      <Page admin>
        <Head />
        <Page.Section flexDirection="column" pl={[0, 6]} pr={[0, 6]}>
          {this.props.children}
        </Page.Section>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  apps: state.apps.apps,
  jwt: state.user.jwt,
  user: state.user,
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
)(AdminHome);
