import React from 'react';
import { Flex, Box, Text } from '@blockstack/ui';

interface BlockstackIdCardProps {
  name: string;
}

type BlockstackIdCard = React.FC<BlockstackIdCardProps>;

export const BlockstackIdCard: BlockstackIdCard = ({ name }) => (
  <Box display="inline-block">
    <Flex
      height={10}
      px={3}
      flexDirection="row"
      alignItems="center"
      borderRadius={3}
      border="1px solid #E1E3E8"
    >
      <Text textStyle="caption.medium">{name}</Text>
    </Flex>
  </Box>
);
