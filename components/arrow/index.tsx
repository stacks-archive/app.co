import React from 'react';
import { Flex } from '@blockstack/ui';
import { ArrowDown } from '@components/svg/maker';

type Direction = 'up' | 'down' | 'left' | 'right';

interface ArrowProps {
  direction: Direction;
}

const degreesToRotate = (direction: Direction) => {
  switch (direction) {
    case 'up':
      return 90;
    case 'down':
      return 0;
    case 'left':
      return 180;
    case 'right':
      return 270;
    default:
      throw new Error('Must be invoked with direction');
  }
};

export const Arrow: React.FC<ArrowProps> = ({ direction }) => (
  <Flex style={{ transform: `rotate(${degreesToRotate(direction)}deg)` }}>
    <ArrowDown />
  </Flex>
);
