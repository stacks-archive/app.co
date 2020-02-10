import React from 'react';
import styled from 'styled-components';
import { Flex, Box, Type } from 'blockstack-ui';
import { CheckMarkIcon, CrossMarkIcon } from '@components/svg/maker';
import { MakerCardHeader, MakerCardText } from '../styled';

const StatusIcon = ({ status = false }) =>
  status ? <CheckMarkIcon /> : <CrossMarkIcon />;

const isMiningReady = app => {
  const requiredTrueProperties = [
    'hasCollectedKYC',
    'hasAcceptedSECTerms',
    'BTCAddress',
    'stacksAddress',
    'isKYCVerified',
  ];
  let ready = true;
  requiredTrueProperties.forEach(field => {
    if (!app[field]) {
      ready = false;
    }
  });
  return ready;
};

const hasPaymentDetails = app => app.BTCAddress && app.stacksAddress;

const StyledTypeOverride = styled(Type)`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
`;

const ItemToCompleteField = ({ label, status }) => (
  <Flex my={3}>
    <Box>
      <StatusIcon status={status} />
    </Box>
    <Box>
      <StyledTypeOverride mb={1} ml={2}>
        {label}
      </StyledTypeOverride>
    </Box>
  </Flex>
);

const AppMiningComplete = () => (
  <MakerCardText mb={4}>
    You’ve completed these sections and are now eligible for App Mining!
  </MakerCardText>
);

const AppMiningIncomplete = () => (
  <MakerCardText mb={4} mt={0} fontSize={14} lineHeight="20px">
    Complete these sections to become eligible for App Mining:
  </MakerCardText>
);

const Status = ({ app }) => {
  const isReady = isMiningReady(app);

  return (
    <Flex mx={[4, 6]} px={[4, 0, 4]} pt={[8, 0, 8]} pb={4} maxWidth={556}>
      <Box>
        <MakerCardHeader>Completion status</MakerCardHeader>

        {isReady ? <AppMiningComplete /> : <AppMiningIncomplete />}

        <ItemToCompleteField
          label="Payment details"
          status={hasPaymentDetails(app)}
        />
        <ItemToCompleteField
          label="Identity Verification"
          status={app.hasCollectedKYC}
        />
        <ItemToCompleteField
          label="Legal documents"
          status={app.isKYCVerified && app.hasAcceptedSECTerms}
        />
      </Box>
    </Flex>
  );
};

export default Status;
