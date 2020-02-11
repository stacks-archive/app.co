import React from 'react';
import { Flex, Box, Text } from '@blockstack/ui';
import { CrossMarkIcon } from '@components/svg/maker';

interface BlockstackIdCardProps {
  name: string;
  onSignOut(): void;
}

type BlockstackIdCard = React.FC<BlockstackIdCardProps>;

export const BlockstackIdCard: BlockstackIdCard = ({ name, onSignOut }) => (
  <Box display="inline-block">
    <Flex
      height={10}
      px={3}
      flexDirection="row"
      alignItems="center"
      justifyContent="middle"
      borderRadius={4}
      border="1px solid #E1E3E8"
    >
      <Text textStyle="caption.medium" color="ink">
        {name}
      </Text>
      <Box onClick={onSignOut} ml={2} pt="1px" cursor="pointer">
        <CrossMarkIcon width={16} height={16} />
      </Box>
    </Flex>
  </Box>
);
