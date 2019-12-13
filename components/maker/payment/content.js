import React from 'react';
import { Flex, Box, Type } from 'blockstack-ui';
import { Button } from '@blockstack/ui';
import { MakerCardHeader, MakerCardText, MakerField } from '../styled';

export const PaymentContainer = ({ children }) => (
  <Flex>
    <Box width={1} mt={0} as="form">
      {children}
    </Box>
  </Flex>
);

export const PaymentHeader = MakerCardHeader;

export const PaymentDescription = () => (
  <MakerCardText mb={1} mt={0}>
    This is where you will receive your App Mining payments. Currently, payments
    are made in Bitcoin (BTC). Payments will be made in Stacks (STX) in the
    future.
  </MakerCardText>
);

export const PaymentHelpText = () => (
  <Type.p fontSize={12} mt={0} display="block">
    {"Don't"} have a Stacks address?{' '}
    <a
      href="https://wallet.blockstack.org"
      target="_blank"
      rel="noopener noreferrer"
    >
      Download the Stacks wallet to get one
    </a>
  </Type.p>
);

export const PaymentBtcField = props => (
  <MakerField
    name="btcAddress"
    label="Bitcoin Address"
    placeholder="Enter a Bitcoin address"
    {...props}
  />
);

export const PaymentStxField = props => (
  <MakerField
    name="stacksAddress"
    label="Stacks Address"
    placeholder="Enter a Stacks address"
    {...props}
  />
);

export const PaymentButton = ({ children, ...props }) => (
  <Button type="button" mt={4} {...props}>
    {children}
  </Button>
);
