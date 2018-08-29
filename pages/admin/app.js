import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { FieldTextStateless as TextField } from '@atlaskit/field-text'
import { FieldTextAreaStateless as TextArea } from '@atlaskit/field-text-area'
import { CheckboxStateless as Checkbox } from '@atlaskit/checkbox'
import Button from '@atlaskit/button'
import Select from '@atlaskit/select'
import NotificationSystem from 'react-notification-system'

import { enumSelect, appStatuses, appStatusFromValue, appRoute } from '@utils'
import Form from '@components/form'
import AppIcon from '@containers/app-icon'

import AppStore from '@stores/apps'
import UserStore from '@stores/user'
import {
  selectAppConstants,
  selectCurrentApp,
  selectApps,
  selectAppCategories,
  selectApiServer,
  selectBlockchainCategories,
  selectStorageCategories,
  selectAuthenticationCategories
} from '@stores/apps/selectors'

let AdminLayout = () => ''

class App extends React.Component {
  static propTypes = {
    apps: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    doSelectApp: PropTypes.func.isRequired,
    selectedApp: PropTypes.object.isRequired,
    saveApp: PropTypes.func.isRequired,
    jwt: PropTypes.string.isRequired,
    apiServer: PropTypes.string.isRequired,
    authentications: PropTypes.array.isRequired,
    blockchains: PropTypes.array.isRequired,
    storageNetworks: PropTypes.array.isRequired,
    isSavingApp: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props)
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
      twitterHandle: ''
    }
    this.save = this.save.bind(this)
  }

  componentDidMount() {
    AdminLayout = require('../../containers/admin/layout').default
    if (this.props.apps) {
      const parsed = queryString.parse(document.location.search)
      this.props.doSelectApp(parseInt(parsed.id, 10))
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedApp && this.state.id !== nextProps.selectedApp.id) {
      this.setState(Object.assign({}, this.state, nextProps.selectedApp))
    }
  }

  save() {
    this.props.saveApp(this.state, this.props.apiServer, this.props.jwt)
    this.notifications.addNotification({
      message: `${this.state.name} was saved successfully.`,
      level: 'success'
    })
  }

  appDetails() {
    const app = this.props.selectedApp
    const { categories, authentications, storageNetworks, blockchains } = this.props 
    if (!app) {
      return <h1>Loading</h1>
    }
    const appPage = appRoute(app)
    const ranking = app.Rankings[0]
    return (
      <div>
        <AppIcon app={app} />
        <h1>{app.name}</h1>
        <br />
        <br />
        <p><a href={appPage}>{appPage}</a></p>
        {ranking ? (
          <>
            <p>
              Twitter mentions in the last 7 days:{' '}
              <strong>{ranking.twitterMentions}</strong>
            </p>
            <p>
              Monthly visits:{' '}
              <strong>{Math.round(ranking.monthlyVisitsCount)}</strong>
            </p>
            <p>
              Monthly bounce rate:{' '}
              <strong>{((ranking.monthlyBounceRate || 0) * 100).toFixed(1)}%</strong>
            </p>
            <p>
              Monthly page views:{' '}
              <strong>{Math.round(ranking.monthlyPageViews)}</strong>
            </p>
            <p>
              Monthly visit duration:{' '}
              <strong>{Math.round(ranking.monthlyVisitDuration)} seconds</strong>
            </p>
          </>
        ) : (
          <p>No rankings data yet.</p>
        )}
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
          />
          <small>Currently {this.state.description.length} characters</small>
          <TextField
            value={this.state.website || ''}
            onChange={(e) => this.setState({ website: e.target.value })}
            label="Website"
          />
          <small><a href={this.state.website} target="_blank">Visit website</a></small>
          {this.state.website.indexOf('http') !== 0 && (
            <>
              <br/>
              <small>Website URL is not valid</small>
            </>
          )}
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
          <br />
          <TextArea
            label="Admin Notes"
            value={this.state.notes || ''}
            onChange={(e) => this.setState({ notes: e.target.value })}
          />
        </Form.Wrapper>
        <br />
        {enumSelect(categories, 'Category', {
          value: this.state.category,
          onChange: (data) => {
            this.setState(data)
          }
        })}
        {enumSelect(blockchains, 'Blockchain', {
          value: this.state.blockchain,
          onChange: (data) => {
            this.setState(data)
          }
        })}
        {enumSelect(storageNetworks, 'Storage', {
          apiAttr: 'storageNetwork',
          value: this.state.storageNetwork,
          onChange: (data) => {
            this.setState(data)
          }
        })}
        {enumSelect(authentications, 'Authentication', {
          menuPlacement: 'top',
          value: this.state.authentication,
          onChange: (data) => {
            this.setState(data)
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
      </div>
    )
  }

  render() {
    return (
      <div>
        <NotificationSystem
          ref={(c) => {
            this.notifications = c
          }}
        />
        {AdminLayout && (
          <AdminLayout>
            <br />
              <br />
            {this.appDetails()}
              <br />
                <br />
          </AdminLayout>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  apps: selectApps(state),
  selectedApp: selectCurrentApp(state),
  apiServer: selectApiServer(state),
  constants: selectAppConstants(state),
  categories: selectAppCategories(state),
  blockchains: selectBlockchainCategories(state),
  authentications: selectAuthenticationCategories(state),
  storageNetworks: selectStorageCategories(state),
  user: state.user.user,
  jwt: state.user.jwt,
  isSavingApp: state.apps.isSavingApp,
  savedApp: state.apps.savedApp
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, AppStore.actions, UserStore.actions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
