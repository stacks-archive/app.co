import React from 'react';
import { Type } from 'blockstack-ui';

import { LinkList } from '@components/navigation/helpers';
import { primaryNavLinks, termsLinks } from '@common/constants';
import { Flex, Box } from '@components/box';

const Footer = ({ isErrorPage, admin, ...props }) => (
  <>
    <Flex {...props}>
      <Flex ml="auto" flexDirection={['column', 'column', 'row']}>
        <LinkList list={termsLinks} isErrorPage={isErrorPage} />
        <LinkList list={primaryNavLinks} isErrorPage={isErrorPage} />
      </Flex>
    </Flex>
    <Flex mt={5}>
      <Box width={1} px={[2, 4, 8]} fontSize={1} py={6}>
        <Type textAlign="center">
          Blockstack is not registered, licensed or supervised as a broker
          dealer or investment adviser by the Securities and Exchange Commission
          (SEC), the Financial Industry Regulatory Authority (FINRA) or any
          other financial regulatory authority or licensed to provide any
          financial advice or services.
        </Type>
      </Box>
    </Flex>
  </>
);

export { Footer };
