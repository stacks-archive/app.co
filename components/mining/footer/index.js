import React from 'react';
import { Flex, Type } from 'blockstack-ui';

const Footer = ({ ...rest }) => (
  <Flex
    py={4}
    alignItems="center"
    justifyContent="center"
    flexWrap="wrap"
    {...rest}
  >
    <Type
      p={3}
      color="white !important"
      style={{ textDecoration: 'none' }}
      is="a"
      href="/terms"
      target="_blank"
    >
      App.co Terms
    </Type>

    <Type
      p={3}
      color="white !important"
      style={{ textDecoration: 'none' }}
      is="a"
      href="/privacy"
      target="_blank"
    >
      Privacy Policy
    </Type>
  </Flex>
);

export { Footer };
