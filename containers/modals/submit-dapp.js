import React from 'react';
import Modal from '@atlaskit/modal-dialog';
import TextField from '@atlaskit/field-text';
import PropTypes from 'prop-types';
import { CheckboxStateless as Checkbox } from '@atlaskit/checkbox';
import Form from '@components/form';
import 'isomorphic-unfetch';
import { enumSelect } from '@utils';

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
      openSourceUrl: '',
      registrationIsOpen: false,
      twitterHandle: '',
    };
    this.submit = this.submit.bind(this);
  }

  async submit() {
    const url = `${process.env.API_SERVER}/api/submit`;
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

    const actions = [{ text: 'Close', onClick: () => this.props.close() }];
    if (!this.state.submitted && !this.state.submitting) {
      actions.unshift({ text: 'Submit', onClick: () => this.submit() });
    }

    if (!this.props.open) {
      return '';
    }
    return (
      <div>
        <Modal
          heading="Add your Dapp"
          actions={actions}
          in={this.props.open}
          onClose={this.props.close}
        >
          {this.state.submitted || this.state.submitting ? (
            <p>Thanks for your submission! We'll get back to you soon.</p>
          ) : (
            <div>
              Please share some details. We will review and approve your
              submission shortly.
              <Form.Wrapper>
                <TextField
                  value={this.state.name}
                  onChange={e => this.setState({ name: e.target.value })}
                  label="Dapp Name"
                />
                <TextField
                  value={this.state.description}
                  onChange={e => this.setState({ description: e.target.value })}
                  label="Short description (~50 characters)"
                  maxLength={50}
                />
                <TextField
                  value={this.state.website}
                  onChange={e => this.setState({ website: e.target.value })}
                  label="Website"
                />
                <TextField
                  value={this.state.contact}
                  onChange={e => this.setState({ contact: e.target.value })}
                  label="Contact Email"
                />
                <TextField
                  value={this.state.imageUrl}
                  onChange={e => this.setState({ imageUrl: e.target.value })}
                  label="Image URL"
                />
                <TextField
                  value={this.state.openSourceUrl}
                  onChange={e =>
                    this.setState({ openSourceUrl: e.target.value })
                  }
                  label="Open Source URL"
                />
                <TextField
                  value={this.state.twitterHandle}
                  onChange={e =>
                    this.setState({ twitterHandle: e.target.value })
                  }
                  label="Twitter Handle"
                />
                <br />
                <Checkbox
                  isChecked={this.state.registrationIsOpen}
                  onChange={() =>
                    this.setState({
                      registrationIsOpen: !this.state.registrationIsOpen,
                    })
                  }
                  label="Registration is open to all users"
                />
              </Form.Wrapper>
              {enumSelect(constants.categoryEnums, 'Category')}
              {enumSelect(constants.blockchainEnums, 'Blockchain')}
              {enumSelect(constants.storageEnums, 'Storage', {
                apiAttr: 'storageNetwork',
              })}
              {enumSelect(constants.authenticationEnums, 'Authentication', {
                menuPlacement: 'top',
              })}
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
