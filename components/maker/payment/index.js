import React, { useState } from 'react';
import { savePaymentDetails } from '@stores/maker/actions';
import { validateBTC, validateSTX } from './helpers';
import {
  PaymentContainer,
  PaymentHeader,
  PaymentDescription,
  PaymentHelpText,
  PaymentBtcField,
  PaymentStxField,
  PaymentButton
} from './content';

const PaymentDetails = ({ app, accessToken, user, dispatch }) => {
  const [btcAddress, setBTCAddress] = useState(app.BTCAddress);
  const [stxAddress, setSTXAddress] = useState(app.stacksAddress);
  const [saving, setSaving] = useState(false);
  const [hasAttemptedSaved, setHasAttemptedSaved] = useState(false);
  const [savedValues, setSavedValue] = useState({ btcAddress, stxAddress });

  const isSaved =
    btcAddress === savedValues.btcAddress &&
    !!btcAddress &&
    stxAddress === savedValues.stxAddress &&
    !!stxAddress;

  const save = async () => {
    setHasAttemptedSaved(true);
    if (!validateBTC(btcAddress) || !validateSTX(stxAddress)) return;
    setSaving(true);
    await savePaymentDetails({
      appId: app.id,
      jwt: user.jwt,
      btcAddress,
      stxAddress
    })(dispatch);
    setSaving(false);
    setSavedValue({ btcAddress, stxAddress });
  };

  const buttonText = () => {
    if (saving) return 'Saving…';
    if (isSaved) return 'Saved';
    return 'Save';
  };

  const createInputError = ({ validateFn, currencySymbol }) => addressHash => {
    if (!hasAttemptedSaved) return null;
    if (!validateFn(addressHash))
      return `Please enter a valid ${currencySymbol} address`;
    return null;
  };
  const getBtcError = createInputError({
    validateFn: validateBTC,
    currencySymbol: 'BTC'
  });
  const getStxError = createInputError({
    validateFn: validateSTX,
    currencySymbol: 'STX'
  });

  return (
    <PaymentContainer>
      <PaymentHeader>Payment details</PaymentHeader>
      <PaymentDescription />
      <PaymentBtcField
        onChange={e => setBTCAddress(e.target.value)}
        value={btcAddress || ''}
        error={getBtcError(btcAddress)}
      />
      <PaymentStxField
        onChange={e => setSTXAddress(e.target.value)}
        value={stxAddress || ''}
        error={getStxError(stxAddress)}
      />
      <PaymentHelpText />
      <PaymentButton
        disabled={isSaved || saving}
        onClick={() => save({ btcAddress, stxAddress, accessToken })}
      >
        {buttonText()}
      </PaymentButton>
    </PaymentContainer>
  );
};

export default PaymentDetails;
