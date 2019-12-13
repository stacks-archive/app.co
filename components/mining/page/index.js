import * as React from 'react';
import { Flex } from 'blockstack-ui';

const MiningPage = ({ ...rest }) => (
  <Flex
    flexDirection="column"
    color="blue.dark"
    minHeight="100vh"
    bg={'blue.dark'}
    {...rest}
  />
);

export { MiningPage };
