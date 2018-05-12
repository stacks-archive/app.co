import React from 'react';
import Modal from '@atlaskit/modal-dialog';
import TextField from '@atlaskit/field-text';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Select from '@atlaskit/select';

import Form from '@components/form';

export default class SubmitDapp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      contact: '',
      website: '',
      description: '',
      category: null,
      blockchain: null,
      authentication: null,
      storage: null,
    };
  }

  render() {
    const { constants } = this.props;

    const enumSelect = (enums, placeholder) => {
      const options = _.map(_.keys(enums), (opt) => ({ label: opt, value: opt }));
      const onChange = (option) => {
        this.setState({ [placeholder.toLowerCase()]: option.value });
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
           />
          <br />
        </div>
      );
    };

    // console.log(constants);
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
        <Form.Wrapper>
          <TextField
            value={this.state.title}
            onChange={(e) => this.setState({ title: e.target.value })}
            label="Title"
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
        </Form.Wrapper>
        {enumSelect(constants.categoryEnums, 'Category')}
        {enumSelect(constants.blockchainEnums, 'Blockchain')}
        {enumSelect(constants.storageEnums, 'Storage')}
        {enumSelect(constants.authenticationEnums, 'Authentication')}
      </Modal>
    );
  }
}

SubmitDapp.propTypes = {
  open: PropTypes.string.isRequired,
  close: PropTypes.string.isRequired,
};
