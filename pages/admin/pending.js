import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AppList from '@containers/admin/app-list';

import AppStore from '@stores/apps';
import UserStore from '@stores/user';

let AdminLayout = () => '';

class PendingApps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    AdminLayout = require('../../containers/admin/layout').default;
    this.setState(Object.assign({}, this.state, { clientSide: true }));
    this.props.fetchPendingApps(this.props.apiServer, this.props.jwt);
  }

  render() {
    return (
      <div>
        {AdminLayout && (
          <AdminLayout>
            <br />
            <br />
            <h1>Pending Apps</h1>
            <br />
            {this.props.isFetchingPending && <p>Fetching pending apps...</p>}

            {this.props.pendingApps && <AppList apps={this.props.pendingApps} />}
            <br />
          </AdminLayout>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  apps: state.apps.apps,
  selectedApp: state.apps.selectedApp,
  apiServer: state.apps.apiServer,
  constants: state.apps.constants,
  user: state.user.user,
  jwt: state.user.jwt,
  isSavingApp: state.apps.isSavingApp,
  savedApp: state.apps.savedApp,
  isFetchingPending: state.apps.isFetchingPending,
  pendingApps: state.apps.pendingApps,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, AppStore.actions, UserStore.actions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PendingApps);
