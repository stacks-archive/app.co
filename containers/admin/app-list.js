import React from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TableTree from '@atlaskit/table-tree';

const Name = ({ name }) => <span>{name}</span>;

const transformApps = (apps) =>
  apps.map((app) => ({
    content: app,
  }));

const AppList = ({ apps }) => <TableTree headers={['Name']} columns={[Name]} items={transformApps(apps)} />;

const mapAppListStateToProps = (state) => ({
  apps: state.apps.apps,
  apiServer: state.apps.apiServer,
  user: state.user,
});

export default connect(mapAppListStateToProps)(AppList);
