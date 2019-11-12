import React from 'react';
import Link from 'next/link';
import { Flex, Box, PseudoBox } from '@blockstack/ui';

import { App } from '@models/app';
import { Arrow } from '@components/arrow';

const AppDirectoryItem: React.FC<{ app: App }> = ({ app }) => {
  const url =
    app.authentication === 'Blockstack'
      ? `/maker/apps/${app.id}`
      : '/maker/apps/blockstack-only';

  return (
    <Flex>
      <Link href={url}>
        <PseudoBox
          display="flex"
          width={['320px', '432px']}
          maxWidth={432}
          mb={2}
          height={96}
          borderRadius={6}
          justifyContent="space-between"
          alignItems="center"
          background="#F9F9FC"
          _hover={{ bg: '#F0F0F5' }}
        >
          {/* Due to many broken image links, commenting out pictures  */}
          {/* <Box ml={6}>
            <img src={app.imageUrl} alt={`Logo of ${app.name}`} width="48px" height="48px" />
          </Box> */}
          <Box flex={1} ml={6}>
            {app.name}
          </Box>
          <Box mr={6}>
            <Arrow direction="right" />
          </Box>
        </PseudoBox>
      </Link>
    </Flex>
  );
};

interface AppDirectoryProps {
  apps: App[];
}

export const AppDirectory: React.FC<AppDirectoryProps> = ({ apps }) => (
  <Box my={[2, 2, 6, 12]}>
    {apps.map(app => (
      <AppDirectoryItem app={app} key={app.id} />
    ))}
  </Box>
);
