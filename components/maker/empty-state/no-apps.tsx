import React from 'react';
import { useRouter } from 'next/router';
import { Flex, Text, Button } from '@blockstack/ui';

interface NoAppsEmptyStateProps {
  username: string;
}

type NoAppsEmptyState = React.FC<NoAppsEmptyStateProps>;

export const NoAppsEmptyState: NoAppsEmptyState = ({ username }) => {
  const router = useRouter();
  return (
    <Flex flexDirection="column" alignItems="center" my={80}>
      <Text as="h2" mb={6}>
        You don&apos;t have any apps connected to{' '}
        <Text color="ink.400">{username}</Text>
      </Text>
      <Text mb={6}>
        Submit your app or sign in with a different Blockstack ID.
      </Text>
      <Button onClick={() => router.push('/submit-your-app')}>
        Submit app
      </Button>
    </Flex>
  );
};
