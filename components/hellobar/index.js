import React from 'react';
import { Box, Flex } from 'blockstack-ui';
import { Newsletter } from '@components/pox-newsletter';

export const HelloBar = ({ ...rest }) => {
  return (
    <Box
      bg="blue"
      display={['none', 'none', 'block']}
      position="relative"
      {...rest}
    >
      <Flex alignItems="center" py={3} justifyContent="center">
        <Flex textAlign="center" alignItems="center">
          <Box pr={3} fontSize={1} textAlign="right" color="white">
            Subscribe to stay in the loop on Proof of Transfer (PoX) and STX
            Mining.
          </Box>
          <Newsletter merge={{ SOURCE: 'widget-app.co' }} />
        </Flex>
      </Flex>
    </Box>
  );
};
