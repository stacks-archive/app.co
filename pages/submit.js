import React from 'react'
import TextField from '@atlaskit/field-text'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Select from '@atlaskit/select'
import { CheckboxStateless as Checkbox } from '@atlaskit/checkbox'
import 'isomorphic-unfetch'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Page } from '@containers/page'
import { Header } from '@containers/header'
import { Hero } from '@containers/hero'
import { Button } from '@components/button'
import Form from '@components/form'

import { selectAppConstants, selectApiServer } from '@stores/apps/selectors'

class SubmitDapp extends React.Component {
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
      twitterHandle: '',
    }
    this.submit = this.submit.bind(this)
  }

  async submit() {
    const { apiServer } = this.props
    const url = `${apiServer}/api/submit`
    this.setState({ submitting: true })
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    })
    this.setState({ submitted: true, submitting: false })
  }

  render() {
    const { appConstants, apiServer } = this.props

    const enumSelect = (enums, placeholder, props = {}) => {
      const options = _.map(_.keys(enums), (opt) => ({ label: opt, value: opt }))
      const onChange = (option) => {
        this.setState({ [props.apiAttr || placeholder.toLowerCase()]: option.value })
      }
      return (
        <div>
          <br />
          <Select
            options={options}
            placeholder={placeholder}
            className="react-select"
            onChange={onChange}
            isSearchable={false}
            menuPlacement={props.menuPlacement || 'bottom'}
          />
          <br />
        </div>
      )
    }

    const actions = [{ text: 'Close', onClick: () => this.props.close() }]
    if (!this.state.submitted && !this.state.submitting) {
      actions.unshift({ text: 'Submit', onClick: () => this.submit() })
    }

    return (
      <div>
        <Header data={this.props.data} />
        <Hero />
        <Page.Section wrap={1}>
          <Page.Section.Content>
            {this.state.submitted || this.state.submitting ? (
              <p>Thanks for your submission! We'll get back to you soon.</p>
            ) : (
              <div>
                Please share some details. We will review and approve your submission shortly.
                <Form.Wrapper>
                  <TextField
                    value={this.state.name}
                    onChange={(e) => this.setState({ name: e.target.value })}
                    label="Dapp Name"
                  />
                  <TextField
                    value={this.state.description}
                    onChange={(e) => this.setState({ description: e.target.value })}
                    label="Short description (~50 characters)"
                    maxLength={50}
                  />
                  <TextField
                    value={this.state.website}
                    onChange={(e) => this.setState({ website: e.target.value })}
                    label="Website"
                  />
                  <TextField
                    value={this.state.contact}
                    onChange={(e) => this.setState({ contact: e.target.value })}
                    label="Contact Email"
                  />
                  <TextField
                    value={this.state.imageUrl}
                    onChange={(e) => this.setState({ imageUrl: e.target.value })}
                    label="Image URL"
                  />
                  <TextField
                    value={this.state.openSourceUrl}
                    onChange={(e) => this.setState({ openSourceUrl: e.target.value })}
                    label="Open Source URL"
                  />
                  <TextField
                    value={this.state.twitterHandle}
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
                {enumSelect(appConstants.categoryEnums, 'Category')}
                {enumSelect(appConstants.blockchainEnums, 'Blockchain')}
                {enumSelect(appConstants.storageEnums, 'Storage', { apiAttr: 'storageNetwork' })}
                {enumSelect(appConstants.authenticationEnums, 'Authentication', { menuPlacement: 'top' })}
                <br />
                <Button onClick={this.submit} type="button/primary">
                  Submit
                </Button>
              </div>
            )}
          </Page.Section.Content>
        </Page.Section>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  appConstants: selectAppConstants(state),
  apiServer: selectApiServer(state),
})

export default connect(mapStateToProps)(SubmitDapp)
