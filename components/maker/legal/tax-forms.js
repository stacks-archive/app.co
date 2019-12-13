import React from 'react';
import { Type } from 'blockstack-ui';
import { Button, Text } from '@blockstack/ui';
import { MakerCardText } from '../styled';

const taxFormGenerator = ({ taxFormUrl, taxFormName, text }) => ({
  handleClick,
}) => (
  <>
    <MakerCardText>
      {text}{' '}
      <Type is="a" href={taxFormUrl} target="_blank">
        {taxFormName}.
      </Type>
    </MakerCardText>
    <Button display="inline-block" mt={4} mb={2} onClick={handleClick}>
      Upload via Dropbox
    </Button>
    <Text as="p" display="block" textStyle="caption" mt={2}>
      This verification is handled manually by the Blockstack team. Check back
      later to see if your application has been approved.
    </Text>
  </>
);

export const UsTaxForms = taxFormGenerator({
  taxFormUrl: 'https://www.irs.gov/pub/irs-pdf/fw9.pdf',
  taxFormName: 'IRS Form W-9',
  text: 'US persons or entities are required to submit an',
});

export const InternationalTaxForms = taxFormGenerator({
  taxFormUrl: 'https://www.irs.gov/pub/irs-pdf/iw8.pdf',
  taxFormName: 'IRS Form W-8',
  text: 'Persons outside the US are required to submit an',
});

export const InternationalEntityTaxForms = taxFormGenerator({
  taxFormUrl: 'https://www.irs.gov/pub/irs-pdf/fw8bene.pdf',
  taxFormName: 'IRS Form W-8BEN-E',
  text: 'Entities outside the US are require to submit an',
});

const openFile = url => window.open(url, '_blank');
const downloadUsaForms = () =>
  openFile('https://www.dropbox.com/request/jBv2pYJ2lhJuvfXbJvw8');
const downloadInternationalForms = () =>
  openFile('https://www.dropbox.com/request/84CaeiizMy1BU0AaWIrk');

export const TaxDocuments = ({ taxType }) => {
  switch (taxType) {
    case 'us':
      return <UsTaxForms handleClick={downloadUsaForms} />;
    case 'intl':
      return <InternationalTaxForms handleClick={downloadUsaForms} />;
    case 'intl_entity':
      return (
        <InternationalEntityTaxForms handleClick={downloadInternationalForms} />
      );
    default:
      throw new Error('Invalid tax status: ', taxType);
  }
};
