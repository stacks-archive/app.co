import React from 'react';
import { StyledButton } from '@components/button/styled';

const Button = ({ icon: Icon, children, ...rest }) => (
  <StyledButton {...rest} icon={!!Icon}>
    {Icon ? <Icon color="currentColor" /> : children}
  </StyledButton>
);

export { Button };
