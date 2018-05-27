import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import queryString from 'query-string';
import findBy from 'lodash/find';
import { FieldTextStateless as TextField } from '@atlaskit/field-text';
import { CheckboxStateless as Checkbox } from '@atlaskit/checkbox';

import { enumSelect } from '@utils';
import Form from '@components/form';

import AppStore from '@stores/apps';
import UserStore from '@stores/user';

let AdminLayout = () => '';

class App extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      name: '',
      contact: '',
      website: '',
      description: '',
      imageUrl: '',
      category: null,
      blockchain: null,
      authentication: null,
      storageNetwork: null,
      submitted: false,
      submitting: false,
      openSourceUrl: '',
      registrationIsOpen: false,
      twitterHandle: '',
    };
  }

  componentDidMount() {
    AdminLayout = require('../../containers/admin/layout').default;
    if (this.props.apps) {
      const parsed = queryString.parse(document.location.search);
      const app = findBy(this.props.apps, (app) => app.id === parseInt(parsed.id, 10));
      this.props.selectApp(app);
      console.log(parsed, app);
      this.setState(Object.assign({}, this.state, app));
      setTimeout(() => {
        this.forceUpdate();
      }, 100);
    }
  }

  appDetails() {
    const app = this.props.selectedApp;
    const constants = this.props.constants.appConstants;
    if (!app) {
      return <h1>Loading</h1>;
    }
    return (
      <div>
        <h1>{app.name}</h1>
        <br />
        <br />
        <Form.Wrapper>
          <TextField
            value={this.state.name || ''}
            onChange={(e) => this.setState({ name: e.target.value })}
            label="Dapp Name"
          />
          <TextField
            value={this.state.description || ''}
            onChange={(e) => this.setState({ description: e.target.value })}
            label="Short description (~50 characters)"
            maxLength={50}
          />
          <TextField
            value={this.state.website || ''}
            onChange={(e) => this.setState({ website: e.target.value })}
            label="Website"
          />
          <TextField
            value={this.state.contact || ''}
            onChange={(e) => this.setState({ contact: e.target.value })}
            label="Contact Email"
          />
          <TextField
            value={this.state.imageUrl || ''}
            onChange={(e) => this.setState({ imageUrl: e.target.value })}
            label="Image URL"
          />
          <TextField
            value={this.state.openSourceUrl || ''}
            onChange={(e) => this.setState({ openSourceUrl: e.target.value })}
            label="Open Source URL"
          />
          <TextField
            value={this.state.twitterHandle || ''}
            onChange={(e) => this.setState({ twitterHandle: e.target.value })}
            label="Twitter Handle"
          />
          <br />
          <Checkbox
            isChecked={this.state.registrationIsOpen}
            onChange={() => this.setState({ registrationIsOpen: !this.state.registrationIsOpen })}
            label="Registration is open to all users"
          />
        </Form.Wrapper>
        {/* {enumSelect(constants.categoryEnums, 'Category', { value: this.state.category })}
        {enumSelect(constants.blockchainEnums, 'Blockchain', { value: this.state.blockchain })}
        {enumSelect(constants.storageEnums, 'Storage', { apiAttr: 'storageNetwork', value: this.state.storage })}
        {enumSelect(constants.authenticationEnums, 'Authentication', {
          menuPlacement: 'top',
          value: this.state.authentication,
        })} */}
      </div>
    );
  }

  render() {
    return (
      <div>
        {AdminLayout && (
          <AdminLayout>
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
  constants: state.apps.constants,
  user: state.user,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, AppStore.actions, UserStore.actions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
