import * as React from 'react';
import { StyledInput } from '@components/input/styled';
import { ArrowRight } from '@components/svg';
import { theme } from '@common/styles';

const onKeyDown = (event, action) => {
  console.log('onkeydown');
  if (event.key === 'Enter') {
    action();
  }
};

const Input = ({ action, ...rest }) => (
  <StyledInput>
    <StyledInput.Input
      {...rest}
      onKeyDown={event => onKeyDown(event, action)}
    />
    {action ? (
      <StyledInput.Action onClick={() => action()}>
        <ArrowRight color={theme.colors.blue.accent} />
      </StyledInput.Action>
    ) : null}
  </StyledInput>
);
export { Input };
