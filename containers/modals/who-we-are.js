import React from 'react';
import Modal from '@atlaskit/modal-dialog';
import PropTypes from 'prop-types';

const WhoWeAre = props => {
  if (!props.open) {
    return '';
  }
  const actions = [{ text: 'Close', onClick: () => props.close() }];
  return (
    <Modal heading="About App.co" actions={actions} onClose={props.close}>
      <p>
        App.co surfaces the best new dapps every day. It’s a place for
        blockchain-loving nerds, enthusiasts, and investors to geek out over the
        latest decentralized tech—from currency exchanges to
        mutant-feline-marketplaces.
      </p>

      <p>
        App.co is sponsored by{' '}
        <a href="https://blockstack.org" target="_blank">
          Blockstack
        </a>
        , a decentralized app protocol and community. All protocols are welcome
        on App.co as we’re committed to celebrating an open, decentralized
        internet for all.
      </p>

      <p>
        Blockstack is the easiest way to start building decentralized,
        blockchain-based dapps. Our APIs provide decentralized storage,
        password-less auth, and a scalable foundation for your dapps. And,
        Blockstack let’s you decouple the personal data you create, from the
        dapps you use, which makes you the sole owner of that data.
      </p>
    </Modal>
  );
};

WhoWeAre.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default WhoWeAre;
