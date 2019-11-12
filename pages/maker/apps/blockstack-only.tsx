import React from 'react';
import Link from 'next/link';
import { Flex, Box, Text, Button } from '@blockstack/ui';

import { Page } from '@components/page';

const BlockstackOnly = () => (
  <Page background="white">
    <Flex py={148} flexDirection="column" align="center">
      <Text textStyle="display.large" mb={6}>
        App management is currently not supported for non-Blockstack apps
      </Text>
      <Box>
        <Link href="/maker/apps">
          <Button>
              Return to app directory
          </Button>
        </Link>
      </Box>
    </Flex>
  </Page>
);

export default BlockstackOnly;
