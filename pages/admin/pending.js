import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AdminLayout from '@containers/admin/layout';
import AppList from '@containers/admin/app-list';

import AppStore from '@stores/apps';
import UserStore from '@stores/user';

class PendingApps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    fetchPendingApps: PropTypes.func.isRequired,
    jwt: PropTypes.string.isRequired,
    isFetchingPending: PropTypes.bool.isRequired,
    pendingApps: PropTypes.array,
  };

  componentDidMount() {
    this.props.fetchPendingApps(this.props.jwt);
  }

  render() {
    return (
      <AdminLayout>
        {this.props.isFetchingPending && <p>Fetching pending apps...</p>}

        {this.props.pendingApps && (
          <AppList apps={this.props.pendingApps} title="Pending Apps" />
        )}
        <br />
      </AdminLayout>
    );
  }
}

const mapStateToProps = state => ({
  apps: state.apps.apps,
  selectedApp: state.apps.selectedApp,
  constants: state.apps.constants,
  user: state.user.user,
  jwt: state.user.jwt,
  isSavingApp: state.apps.isSavingApp,
  savedApp: state.apps.savedApp,
  isFetchingPending: state.apps.isFetchingPending,
  pendingApps: state.apps.pendingApps,
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
)(PendingApps);
