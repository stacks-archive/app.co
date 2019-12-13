import React, { useEffect, useState } from 'react';
import { Flex, Box, Field, Type } from 'blockstack-ui';
import { Button, Text } from '@blockstack/ui';
import download from 'downloadjs';
import { TaxDocuments } from './tax-forms';
import {
  MakerCardHeader,
  MakerCardSubheader,
  MakerCardText,
  MakerRadioListLabel,
  MakerCardDivider,
} from '../styled';
import MakerModal from '../modal';

const Container = ({ children }) => (
  <Flex>
    <Box width={1} mt={0}>
      {children}
    </Box>
  </Flex>
);

const ParticipationAgreement = ({ app, user }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(!!app.hasAcceptedSECTerms);
  const [modalState, setModalState] = useState(false);
  const [taxType, setTaxType] = useState(null);

  const isUsa = () => taxType === 'us';

  const openEverSign = url => {
    // eslint-disable-next-line no-undef
    eversign.open({
      url,
      containerID: 'embedded-participation-agreement',
      height: '700px',
      width: '100%',
      events: {
        signed: () => setFinished(true),
        loaded: () => console.log('Eversign finished loading'),
        declined: () => console.log('Eversign denied'),
        error: () => console.log('Eversign error'),
      },
    });
  };

  const getDocument = async () => {
    setLoading(true);
    const url = `${
      process.env.API_SERVER
    }/api/maker/apps/make-participation-agreement?name=${name}&email=${email}&isUSA=${isUsa()}&appId=${
      app.id
    }`;
    const response = await fetch(url, {
      method: 'POST',
      headers: new Headers({
        authorization: `Bearer ${user.jwt}`,
      }),
    });
    const data = await response.json();
    setLoading(false);
    return data.embedURL;
  };

  const getDownload = async () => {
    download(`/static/docs/${taxType}.zip`);
    setModalState(true);
    const url = await getDocument();
    openEverSign(url);
  };

  useEffect(() => {
    if (app.eversignDocumentID) {
      getDocument();
    }
  }, [app.id]);

  const options = [
    { value: 'us', label: 'I am a US person or entity' },
    { value: 'intl', label: 'I am a person based outside of the US' },
    { value: 'intl_entity', label: 'I am an entity based outside of the US' },
  ];

  const taxStatusRadioList = options.map(({ value, label }) => (
    <MakerRadioListLabel key={value}>
      <input
        type="radio"
        name="tax-status"
        value={value}
        onChange={e => setTaxType(e.target.value)}
      />
      {label}
    </MakerRadioListLabel>
  ));

  return (
    <>
      <MakerModal isOpen={modalState} handleClose={() => setModalState(false)}>
        <Box width={1} id="embedded-participation-agreement" />
      </MakerModal>

      <Container>
        <MakerCardHeader>Legal Documents</MakerCardHeader>

        <MakerCardText mb={4} mt={0}>
          Please select the appropriate legal status so we can provide you with
          the correct Tax Form and Participation Agreement.
        </MakerCardText>
        <Field
          name="name"
          label="Full Name"
          onChange={e => setName(e.target.value)}
          value={name}
        />
        <Field
          name="emailAddress"
          type="email"
          label="Email address"
          onChange={e => setEmail(e.target.value)}
          value={email}
        />
        <Box pb={2}>
          <Field.LabelAdvanced label="Select your tax category:" />
          {taxStatusRadioList}
        </Box>

        {taxType !== null && (
          <>
            <MakerCardDivider />
            <Box>
              <MakerCardSubheader>Fill out the Tax form</MakerCardSubheader>

              <TaxDocuments taxType={taxType} />
            </Box>
            <MakerCardDivider />
            <Box>
              <MakerCardSubheader>
                Sign the Participation Agreement
              </MakerCardSubheader>
              <Button
                mt={4}
                disabled={loading || finished}
                onClick={() => getDownload()}
              >
                {loading ? 'Starting...' : 'Sign participation agreement'}
              </Button>
              <Type.p fontSize={12} mb={0}>
                Opening the Participation Agreement will start a download a
                package of documents that you are required to read.
              </Type.p>
            </Box>
            <Box>
              <MakerCardDivider />

              <Text as="p" display="block" textStyle="caption" mb={0}>
                Note: It may take a few days for this page to update after
                you’ve uploaded the tax form and signed the participation
                agreement. These must be reviewed and approved manually.
              </Text>
            </Box>
          </>
        )}
      </Container>
    </>
  );
};

export default ParticipationAgreement;
