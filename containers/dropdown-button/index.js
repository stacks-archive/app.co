import React from 'react';
import { StyledDropdownButton } from '@components/dropdown-button';

const DropdownButton = ({ children, ...rest}) => {
  return (
    <StyledDropdownButton {...rest}>
      {children}
    </StyledDropdownButton>
  );
};

export { DropdownButton };
