import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Page } from '@containers/page';
import { Header } from '@containers/header';
import { Hero } from '@containers/hero';
import { Button } from '@components/button';
import AppList from '@containers/admin/app-list';

import AppStore from '@stores/apps';
import UserStore from '@stores/user';
import { selectApps, selectApiServer } from '@stores/apps/selectors';

import 'isomorphic-unfetch';

let AdminLayout = () => '';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // this.signInWithToken();
    AdminLayout = require('../../containers/admin/layout').default;
    this.setState({ clientSide: true });
    this.props.handleSignIn(this.props.apiServer);
  }

  render() {
    return (
      <div>
        {AdminLayout && (
          <AdminLayout>
            <h1>Apps</h1>
            <br />
            <br />
            {this.props.user.user ? (
              <AppList apps={this.props.apps} />
            ) : (
              <Button
                type="button/primary"
                onClick={() => {
                  this.props.signIn();
                }}
              >
                Sign In with Blockstack
              </Button>
            )}
          </AdminLayout>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  apps: selectApps(state),
  apiServer: selectApiServer(state),
  user: state.user,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, AppStore.actions, UserStore.actions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
