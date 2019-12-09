import React from 'react';
import { Flex, Text, Button } from '@blockstack/ui';

interface SignInProps {
  handleSignIn(): void;
}

export const SignIn: React.FC<SignInProps> = ({ handleSignIn }) => (
  <Flex flexDirection="column" alignItems="center" py={40}>
    <Text
      as="h2"
      color="ink"
      textStyle="display.small"
      display="block"
      mb={6}
      textAlign="center"
    >
      Sign in with Blockstack to manage your apps
    </Text>
    <Button onClick={handleSignIn}>Sign in with Blockstack</Button>
  </Flex>
);
