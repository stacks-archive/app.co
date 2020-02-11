import styled from 'styled-components';
import { Flex } from 'blockstack-ui';

const StyledMiningButton = styled(Flex)`
  background: #11a9bc;
  border-radius: 3px;
  color: white;
  font-size: 18px;
  line-height: 28px;
  transition: 0.25s ease-in-out all;
  &:hover {
    cursor: pointer;
    transform: translateY(-3px);
  }
`;

StyledMiningButton.defaultProps = {
  alignItems: 'center',
  justifyContent: 'center',
  py: 3,
  px: 5,
};
export { StyledMiningButton };
