import React from 'react';
import Modal from '@atlaskit/modal-dialog';
import TextField from '@atlaskit/field-text';
import PropTypes from 'prop-types';

export default class SubmitDapp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dappTitle: '',
      dappContact: '',
      dappWebsite: '',
    };
  }

  render() {
    const actions = [
      { text: 'Close', onClick: () => this.props.close() },
      { text: 'Submit', onClick: () => this.props.close() },
    ];
    if (!this.props.open) {
      return '';
    }
    return (
      <Modal heading="Submit your Dapp" actions={actions} in={this.props.open}>
        Please submit this form, and we'll get back to you when your dapp is approved.
        <TextField
          value={this.state.dappTitle}
          onChange={(e) => this.setState({ dappTitle: e.target.value })}
          label="Title"
        />
        <TextField
          value={this.state.dappWebsite}
          onChange={(e) => this.setState({ dappWebsite: e.target.value })}
          label="Website"
        />
        <TextField
          value={this.state.dappContact}
          onChange={(e) => this.setState({ dappContact: e.target.value })}
          label="Contact Email"
        />
      </Modal>
    );
  }
}

SubmitDapp.propTypes = {
  open: PropTypes.string.isRequired,
  close: PropTypes.string.isRequired,
};
