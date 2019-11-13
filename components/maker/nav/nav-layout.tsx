import React from 'react';
import styled from 'styled-components';
import { Box, Flex } from '@blockstack/ui';
import { wrapperStyle } from '@common/styles';

const WrapperBox = styled(Box)`
  ${wrapperStyle};
`;

export const MakerNavContainer: React.FC = ({ children }) => (
  <Flex
    height="56px"
    bg="white"
    alignItems="center"
    borderBottom="1px solid #F0F0F5"
  >
    <WrapperBox display="flex" height="100%" justifyContent="space-between">
      {children}
    </WrapperBox>
  </Flex>
);
