import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Button } from '@components/button';
import AdminLayout from '@containers/admin/layout';
import AppList from '@containers/admin/app-list';

import AppStore from '@stores/apps';
import UserStore from '@stores/user';
import { selectApps } from '@stores/apps/selectors';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <AdminLayout>
        {this.props.user.user ? (
          <AppList apps={this.props.apps} title="All Apps" />
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
    );
  }
}

const mapStateToProps = state => ({
  apps: selectApps(state),
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
)(Admin);
