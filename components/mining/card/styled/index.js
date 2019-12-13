import styled, { css } from 'styled-components';
import { Flex } from 'blockstack-ui';

const StyledCard = styled(Flex)`
  ${({ borders }) =>
    borders
      ? css`
          border: 1px solid white;
        `
      : css`
          background: #ffffff;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
          border-radius: 4px;
        `};
`;

export { StyledCard };
