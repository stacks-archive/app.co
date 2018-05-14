import React from 'react';
import Modal from '@atlaskit/modal-dialog';
import TextField from '@atlaskit/field-text';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Select from '@atlaskit/select';
import 'isomorphic-unfetch';

import Form from '@components/form';

export default class SubmitDapp extends React.Component {
  constructor(props) {
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
    };
    this.submit = this.submit.bind(this);
  }

  async submit() {
    const { apiServer } = this.props;
    const url = `${apiServer}/api/submit`;
    this.setState({ submitting: true });
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    });
    this.props.close();
    this.setState({ submitted: true, submitting: false });
  }

  render() {
    const { constants } = this.props;

    const enumSelect = (enums, placeholder, props) => {
      const options = _.map(_.keys(enums), (opt) => ({ label: opt, value: opt }));
      const onChange = (option) => {
        this.setState({ [props.apiAttr || placeholder.toLowerCase()]: option.value });
      };
      return (
        <div>
          <br />
          <Select
            options={options}
            placeholder={placeholder}
            className="react-select"
            menuPlacement="bottom"
            onChange={onChange}
            isSearchable={false}
            {...props}
          />
          <br />
        </div>
      );
    };

    const actions = [{ text: 'Close', onClick: () => this.props.close() }];
    if (!this.state.submitted && !this.state.submitting) {
      actions.unshift({ text: 'Submit', onClick: () => this.submit() });
    }

    if (!this.props.open) {
      return '';
    }
    return (
      <div>
        <Modal heading="Submit your Dapp" actions={actions} in={this.props.open} onClose={this.props.close}>
          {this.state.submitted || this.state.submitting ? (
            <p>Thanks for your submission! We'll get back to you soon.</p>
          ) : (
            <div>
              Please submit this form, and we'll get back to you when your dapp is approved.
              <Form.Wrapper>
                <TextField
                  value={this.state.name}
                  onChange={(e) => this.setState({ name: e.target.value })}
                  label="Name"
                />
                <TextField
                  value={this.state.description}
                  onChange={(e) => this.setState({ description: e.target.value })}
                  label="Description"
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
              </Form.Wrapper>
              {enumSelect(constants.categoryEnums, 'Category')}
              {enumSelect(constants.blockchainEnums, 'Blockchain')}
              {enumSelect(constants.storageEnums, 'Storage', { apiAttr: 'storageNetwork' })}
              {enumSelect(constants.authenticationEnums, 'Authentication', { menuPlacement: 'top' })}
            </div>
          )}
        </Modal>
      </div>
    );
  }
}

SubmitDapp.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};
