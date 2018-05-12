import React from 'react';
import Modal from '@atlaskit/modal-dialog';
import Lorem from 'react-lorem-component';
import PropTypes from 'prop-types';

const WhoWeAre = (props) => {
  if (!props.open) {
    return '';
  }
  const actions = [{ text: 'Close', onClick: () => props.close() }];
  return (
    <Modal heading="Who we are" actions={actions}>
      <Lorem count={2} />
    </Modal>
  );
};

WhoWeAre.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default WhoWeAre;
