import React from 'react';
import Modal from '@atlaskit/modal-dialog';
import Lorem from 'react-lorem-component';
import PropTypes from 'prop-types';

const WhatsADapp = props => {
  if (!props.open) {
    return '';
  }
  const actions = [{ text: 'Close', onClick: () => props.close() }];
  return (
    <Modal heading="What is a Dapp?" actions={actions} onClose={props.close}>
      <p>
        ​​A dapp is a decentralized app—an application that lets users own their
        data and runs without any single centralized operator.
      </p>

      <p>
        If you use traditional apps, your digital rights, privacy, and choices
        are severely limited. These app ecosystems serve to enrich a small
        number of powerful corporations by centralizing user identities and data
        storage.
      </p>

      <p>
        Decentralized apps offer a solution based on blockchain technology.
        Dapps link developers and users directly, without middlemen hosting
        software or managing user data. These customer-developer networks are
        more transparent, equitable, and resilient than traditional apps—with
        all parties incentivized to treat each other well as they rapidly
        innovate.
      </p>

      <p>
        Today there are thousands of dapps built on protocols like Ethereum,
        Blockstack, and many others. While definitions are rapidly evolving,
        here are some criteria aligned with the future:
      </p>

      <ul>
        <li>
          Do customers own their network identity? Can anyone else revoke that
          identity?
        </li>
        <li>
          Is customer data encrypted? Can anyone else decrypt that user data?
        </li>
        <li>
          Is customer data stored on decentralized networks with reconfigurable
          APIs?
        </li>
        <li>
          Is the app open source? Can community members contribute or fork the
          software?
        </li>
        <li>
          Is the app publishable and hostable by others or only a single
          company?
        </li>
        <li>Is the app running client-side or on a server?</li>
        <li>
          Does the app limit or clearly communicate the scope of data logging?
        </li>
      </ul>
    </Modal>
  );
};

WhatsADapp.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default WhatsADapp;
