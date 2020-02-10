import React from 'react';
import { Flex, Text } from '@blockstack/ui';
import { WarningIcon } from '@components/svg';

interface WarningCardProps {
  message: string;
}

type WarningCard = React.FC<WarningCardProps>;

export const WarningCard: WarningCard = ({ message }) => (
  <Flex
    alignItems="center"
    backgroundColor="#FEF1D6"
    p={4}
    borderRadius={6}
    mb={4}
  >
    <WarningIcon />
    <Text color="#CA6100" fontSize={12} ml={4}>
      {message}
    </Text>
  </Flex>
);
