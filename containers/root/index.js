import React from 'react';
import styled from 'styled-components';
const StyledRoot = styled.div``;

const Root = props => (
  <StyledRoot>
    <>{props.children}</>
  </StyledRoot>
);

export { Root };
