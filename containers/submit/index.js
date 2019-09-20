import React from 'react'
import { Type, Flex, Box } from 'blockstack-ui'
import { AlertOutlineIcon } from 'mdi-react'

export { FormSection } from './form-section'
export { sections } from './sections'

export const ErrorMessage = ({
  message = `Whoops! Please check the form for errors and try again.`,
  icon: Icon = AlertOutlineIcon,
  ...rest
}) => (
  <Flex
    boxShadow="card"
    alignItems="center"
    borderRadius={6}
    border={1}
    borderColor="red"
    py={4}
    px={4}
    mb={6}
    {...rest}
  >
    <Box color="red" pr={3}>
      <Icon />
    </Box>
    <Type lineHeight={1.75}>{message}</Type>
  </Flex>
)

export const Bar = ({ ...rest }) => <Box width={80} mb={7} mt={5} height="1px" bg="blue.mid" {...rest} />
