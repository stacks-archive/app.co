import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { FieldTextStateless as TextField } from '@atlaskit/field-text';
import { FieldTextAreaStateless as TextArea } from '@atlaskit/field-text-area';
import { CheckboxStateless as Checkbox } from '@atlaskit/checkbox';
import Button from '@atlaskit/button';
import Select from '@atlaskit/select';
import NotificationSystem from 'react-notification-system';

import Form from '@components/form';
import AppIcon from '@containers/app-icon';
import { Section, Content } from '@components/mining-admin/month';
import AdminLayout from '@containers/admin/layout';

import AppStore from '@stores/apps';
import UserStore from '@stores/user';
import {
  selectAppConstants,
  selectCurrentApp,
  selectApps,
  selectAppCategoriesArray,
  selectBlockchainCategories,
  selectStorageCategories,
  selectAuthenticationCategories
} from '@stores/apps/selectors';
import { enumSelect, appStatuses, appStatusFromValue, appRoute } from '@utils';

const Strong = Styled.strong`
  font-weight: 800;
`;

class App extends React.Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    selectedApp: PropTypes.object,
    saveApp: PropTypes.func.isRequired,
    jwt: PropTypes.string.isRequired,
    authentications: PropTypes.array.isRequired,
    blockchains: PropTypes.array.isRequired,
    storageNetworks: PropTypes.array.isRequired,
    isSavingApp: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      contactEmail: '',
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
      isKYCVerified: false,
      BTCAddress: '',
      stacksAddress: '',
      hasCollectedKYC: false,
      hasAcceptedSECTerms: false,
      hasAcceptedTerms: false
    };
    this.save = this.save.bind(this);
  }

  componentDidMount() {
    this.fetchApp();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      nextProps.selectedApp &&
      this.state.id !== nextProps.selectedApp.id &&
      nextProps.selectedApp.status
    ) {
      this.setState({ ...this.state, ...nextProps.selectedApp});
    }
  }

  async fetchApp() {
    const qs = queryString.parse(document.location.search);
    if (qs.id && this.props.jwt) {
      const request = await fetch(
        `${process.env.API_SERVER}/api/admin/apps/${qs.id}`,
        {
          method: 'GET',
          headers: new Headers({
            Authorization: `Bearer ${this.props.jwt}`,
            'Content-Type': 'application/json'
          })
        }
      );
      const app = await request.json();
      this.setState(state => ({
        ...state,
        ...app
      }));
    }
  }

  async resetIDVerification() {
    const qs = queryString.parse(document.location.search);
    await fetch(
      `${process.env.API_SERVER}/api/admin/apps/${qs.id}/reset-id-verification`,
      {
        method: 'POST',
        headers: new Headers({
          Authorization: `Bearer ${this.props.jwt}`,
          'Content-Type': 'application/json'
        })
      }
    );
    this.setState({
      jumioTransactionID: null
    });
    this.notifications.addNotification({
      message: 'ID Verification has been reset.',
      level: 'success'
    });
  }

  async resetParticipationAgreement() {
    const qs = queryString.parse(document.location.search);
    await fetch(
      `${process.env.API_SERVER}/api/admin/apps/${qs.id}/reset-participation-agreement`,
      {
        method: 'POST',
        headers: new Headers({
          Authorization: `Bearer ${this.props.jwt}`,
          'Content-Type': 'application/json'
        })
      }
    );
    this.setState({
      hasAcceptedSECTerms: null
    });
    this.notifications.addNotification({
      message: 'Participation agreement signing has been reset.',
      level: 'success'
    });
  }

  save() {
    this.props.saveApp(this.state, this.props.jwt);
    this.notifications.addNotification({
      message: `${this.state.name} was saved successfully.`,
      level: 'success'
    });
  }

  appDetails() {
    // const app = this.props.selectedApp
    // const { name } = this.state;
    const app = this.state;
    if (!app.name) {
      return <h1>Loading</h1>;
    }
    const appPage = appRoute(this.state);
    const ranking = app.Rankings[0];
    return (
      <Section>
        <h1>{app.name}</h1>
        <Content>
          <AppIcon app={app} />
          <p>
            <a href={appPage}>{appPage}</a>
          </p>
          {ranking ? (
            <>
              <p>
                Twitter mentions in the last 7 days:{' '}
                <Strong>{ranking.twitterMentions}</Strong>
              </p>
              <p>
                Monthly visits:{' '}
                <Strong>{Math.round(ranking.monthlyVisitsCount)}</Strong>
              </p>
              <p>
                Monthly bounce rate:{' '}
                <Strong>
                  {((ranking.monthlyBounceRate || 0) * 100).toFixed(1)}%
                </Strong>
              </p>
              <p>
                Monthly page views:{' '}
                <Strong>{Math.round(ranking.monthlyPageViews)}</Strong>
              </p>
              <p>
                Monthly visit duration:{' '}
                <Strong>
                  {Math.round(ranking.monthlyVisitDuration)} seconds
                </Strong>
              </p>
            </>
          ) : (
            <p>No rankings data yet.</p>
          )}
          <p>
            How did you hear about us? <code>{app.referralSource}</code>
          </p>
          <p>
            Are you submitting your own app?{' '}
            <code>{app.isSubmittingOwnApp ? 'Yes' : 'No'}</code>
          </p>
          <p>
            Submitted By: <code>{app.submitterName}</code>
          </p>
          <p>
            Referral Code: <code>{app.referralCode}</code>
          </p>
          <p>
            Referral Source: <code>{app.refSource}</code>
          </p>
          <p>
            Access Token: <code>{app.accessToken}</code>
          </p>
          <p>
            Magic link:{' '}
            <a
              href={`/maker/${app.accessToken}`}
            >{`/maker/${app.accessToken}`}</a>
          </p>
          <p>
            Maker portal:{' '}
            <a href={`/maker/apps/${app.id}`}>{`/maker/apps/${app.id}`}</a>
          </p>

          <Form.Wrapper>
            <TextField
              value={this.state.name || ''}
              onChange={e => this.setState({ name: e.target.value })}
              label="Dapp Name"
            />
            <TextField
              value={this.state.description || ''}
              onChange={e => this.setState({ description: e.target.value })}
              label="Short description (~50 characters)"
            />
            {this.state.description && (
              <small>
                Currently {this.state.description.length} characters
              </small>
            )}
            <TextField
              value={this.state.website || ''}
              onChange={e => this.setState({ website: e.target.value })}
              label="Website"
            />
            <small>
              <a
                href={this.state.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit website
              </a>
            </small>
            {this.state.website.indexOf('http') !== 0 && (
              <>
                <br />
                <small>Website URL is not valid</small>
              </>
            )}
            <TextField
              value={this.state.contactEmail || ''}
              onChange={e => this.setState({ contactEmail: e.target.value })}
              label="Contact Email"
            />
            <TextField
              value={this.state.imageUrl || ''}
              onChange={e => this.setState({ imageUrl: e.target.value })}
              label="Image URL"
            />
            <TextField
              value={this.state.openSourceUrl || ''}
              onChange={e => this.setState({ openSourceUrl: e.target.value })}
              label="Open Source URL"
            />
            <TextField
              value={this.state.twitterHandle || ''}
              onChange={e => this.setState({ twitterHandle: e.target.value })}
              label="Twitter Handle"
            />
            <br />
            <Checkbox
              isChecked={this.state.registrationIsOpen}
              onChange={() =>
                this.setState({
                  registrationIsOpen: !this.state.registrationIsOpen
                })
              }
              label="Registration is open to all users"
            />
            <br />
            <TextArea
              label="Admin Notes"
              value={this.state.notes || ''}
              onChange={e => this.setState({ notes: e.target.value })}
            />
            <br />
            <h3>App Mining</h3>
            <TextField
              value={this.state.BTCAddress || ''}
              onChange={e => this.setState({ BTCAddress: e.target.value })}
              label="BTC Address"
            />
            <br />
            <TextField
              value={this.state.stacksAddress || ''}
              onChange={e => this.setState({ stacksAddress: e.target.value })}
              label="Stacks Address"
            />
            <br />
            <TextField
              value={this.state.adminBlockstackID || ''}
              onChange={e =>
                this.setState({ adminBlockstackID: e.target.value })
              }
              label="Admin Blockstack ID"
            />
            <br />
            <Checkbox
              isChecked={this.state.isKYCVerified}
              onChange={() =>
                this.setState({ isKYCVerified: !this.state.isKYCVerified })
              }
              label="Tax information is collected"
            />
            <br />
            <Checkbox
              isChecked={this.state.hasCollectedKYC}
              onChange={() =>
                this.setState({ hasCollectedKYC: !this.state.hasCollectedKYC })
              }
              label="KYC Completed"
            />
            <br />
            <Checkbox
              isChecked={this.state.hasAcceptedSECTerms}
              onChange={() =>
                this.setState({
                  hasAcceptedSECTerms: !this.state.hasAcceptedSECTerms
                })
              }
              label="Participation agreement signed"
            />
            <br />
            {this.state.jumioTransactionID && (
              <>
                <Button
                  appearance="primary"
                  is="a"
                  href={`https://portal.netverify.com/merchant/idscan/${this.state.jumioTransactionID}`}
                  target="_blank"
                >
                  View in Jumio
                </Button>
                {!this.state.hasCollectedKYC && (
                  <>
                    <br />
                    <br />
                    <Button
                      appearance="danger"
                      onClick={() => this.resetIDVerification()}
                    >
                      Reset ID Verification
                    </Button>
                  </>
                )}
              </>
            )}

            {this.state.eversignDocumentID && (
              <>
                <br />
                <Button
                  appearance="primary"
                  is="a"
                  href={`https://blockstack.eversign.com/documents/${this.state.eversignDocumentID}`}
                  target="_blank"
                >
                  View in Eversign
                </Button>
                <br />
                <br />
                <Button
                  appearance="danger"
                  onClick={() => this.resetParticipationAgreement()}
                >
                  Reset Participation Agreement
                </Button>
              </>
            )}
            <br />
            <Checkbox
              isChecked={this.state.hasAcceptedTerms}
              onChange={() =>
                this.setState({
                  hasAcceptedTerms: !this.state.hasAcceptedTerms
                })
              }
              label="Terms accepted"
            />
          </Form.Wrapper>
          <br />
          {enumSelect(this.props.categories, 'Category', {
            required: true,
            value: this.state.category,
            onChange: data => {
              this.setState(data);
            }
          })}
          {enumSelect(this.props.blockchains, 'Blockchain', {
            value: this.state.blockchain,
            onChange: data => {
              this.setState(data);
            }
          })}
          {enumSelect(this.props.storageNetworks, 'Storage', {
            apiAttr: 'storageNetwork',
            value: this.state.storageNetwork,
            onChange: data => {
              this.setState(data);
            }
          })}
          {enumSelect(this.props.authentications, 'Authentication', {
            menuPlacement: 'top',
            value: this.state.authentication,
            onChange: data => {
              this.setState(data);
            }
          })}
          <br />
          <h3>Status:</h3>
          <br />
          <Select
            className="react-select"
            options={appStatuses}
            value={appStatusFromValue(this.state.status)}
            onChange={({ value }) => this.setState({ status: value })}
          />
          <br />
          <br />
          {this.props.isSavingApp ? (
            <p>Saving {this.state.name}...</p>
          ) : (
            <Button appearance="primary" onClick={this.save}>
              Save
            </Button>
          )}
        </Content>
      </Section>
    );
  }

  render() {
    return (
      <AdminLayout>
        <NotificationSystem
          ref={c => {
            this.notifications = c;
          }}
        />
        {this.appDetails()}
      </AdminLayout>
    );
  }
}

const mapStateToProps = state => ({
  apps: selectApps(state),
  selectedApp: selectCurrentApp(state),
  constants: selectAppConstants(state),
  categories: selectAppCategoriesArray(state),
  blockchains: selectBlockchainCategories(state),
  authentications: selectAuthenticationCategories(state),
  storageNetworks: selectStorageCategories(state),
  user: state.user.user,
  jwt: state.user.jwt,
  isSavingApp: state.apps.isSavingApp,
  savedApp: state.apps.savedApp
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { ...AppStore.actions, ...UserStore.actions},
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
