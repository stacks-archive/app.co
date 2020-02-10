import React from 'react';
import { Flex, Box, Button, Text } from '@blockstack/ui';

interface SubmitSignInProps {
  loading?: boolean;
  handleBlockstackAuth(e: any): void;
}

type SubmitSignIn = React.FC<SubmitSignInProps>;

export const SubmitSignIn: SubmitSignIn = ({
  loading,
  handleBlockstackAuth,
}) => (
  <Flex flexDirection="column">
    <Box>
      <Button onClick={handleBlockstackAuth} mb={4}>
        {loading ? 'Loading...' : 'Sign in with Blockstack'}
      </Button>
    </Box>
    <Text textStyle="caption">
      You will use your ID to make changes to your app, and remove or modify its
      listing in the future.
    </Text>
  </Flex>
);
