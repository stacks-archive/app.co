import React from 'react';
import Styled from 'styled-components';
import { Box, Type } from 'blockstack-ui';

const Alert = Styled(Box)`
  background-color: ${({ type }) => (type === 'error' ? 'red' : '#33e6bd57')};
  padding: 10px 20px;
`;

const Notification = ({ message, type }) => (
  <Alert mb={4} type={type}>
    <Type>{message}</Type>
  </Alert>
);

export default Notification;
