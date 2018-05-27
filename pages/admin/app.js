import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import queryString from 'query-string';
import findBy from 'lodash/find';

import AppStore from '@stores/apps';
import UserStore from '@stores/user';

let AdminLayout = () => '';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    AdminLayout = require('../../containers/admin/layout').default;
    console.log('mounting app');
    if (this.props.apps) {
      const parsed = queryString.parse(document.location.search);
      const app = findBy(this.props.apps, (app) => app.id === parseInt(parsed.id, 10));
      this.props.selectApp(app);
      console.log(parsed, app);
    }
    this.setState({ clientSide: true });
  }

  appDetails() {
    const app = this.props.selectedApp;
    if (!app) {
      return '';
    }
    return <span>{app.name}</span>;
  }

  render() {
    return (
      <div>
        {AdminLayout && (
          <AdminLayout>
            <h1>App</h1>
            <br />
            <br />
            {this.appDetails()}
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
  user: state.user,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, AppStore.actions, UserStore.actions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
