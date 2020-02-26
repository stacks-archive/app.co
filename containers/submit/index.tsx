import React from 'react';
import { Flex, Box, Text } from '@blockstack/ui';
import AlertOutlineIcon  from 'mdi-react/AlertOutlineIcon';

export { FormSection } from './form-section';
export { sections } from './sections';

export const ErrorMessage = ({
  message = `Whoops! Please check the form for errors and try again.`,
  icon: Icon = AlertOutlineIcon,
  ...rest
}) => (
  <Flex
    alignItems="center"
    borderRadius={6}
    backgroundColor="#FCEBEC"
    py={4}
    px={4}
    mb={6}
    {...rest}
  >
    <Box pr={3}>
      <Icon color="#DE0014" />
    </Box>
    <Text textStyle="caption" color="#DE0014 " lineHeight={1.75}>
      {message}
    </Text>
  </Flex>
);

export const Bar = ({ ...rest }) => (
  <Box width={80} mb={7} mt={5} height="1px" bg="blue.mid" {...rest} />
);
