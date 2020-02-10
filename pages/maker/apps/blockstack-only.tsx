import React from 'react';
import Link from 'next/link';
import { Flex, Box, Text, Button } from '@blockstack/ui';

import { Page } from '@components/page';
import { MakerNav } from '@containers/maker-nav';

const BlockstackOnly = () => (
  <Page background="white" subNav={<MakerNav />}>
    <Flex py={148} flexDirection="column" align="center">
      <Text textStyle="display.small" color="ink" mb={6}>
        App management is currently not supported for non-Blockstack apps
      </Text>
      <Box>
        <Link href="/maker/apps">
          <Button>Return to app directory</Button>
        </Link>
      </Box>
    </Flex>
  </Page>
);

export default BlockstackOnly;
