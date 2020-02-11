import { css } from 'styled-components';
import system from 'system-components';
import tag from 'clean-tag';

import {
  space,
  color,
  fontSize,
  width,
  flex,
  flexDirection,
  flexWrap,
  alignContent,
  alignItems,
} from 'styled-system';

const boxProps = css`
  ${space}
  ${width}
  ${fontSize}
  ${color}
  ${flex}
  ${flexDirection}
  ${flexWrap}
  ${alignContent}
  ${alignItems}
`;

const Box = system(
  {
    is: tag,
  },
  'width',
  'space',
  'fontSize',
  'color',
  'flex',
  'order',
  'alignSelf',
  'opacity',
  'display',
  'position',
  'top',
  'right',
  'left',
  'bottom',
  'minHeight',
  'borderRadius',
  'maxHeight',
  'maxWidth',
  'minWidth',
  'borders',
  'backgroundImage',
  'backgroundSize',
  'backgroundPosition',
  'backgroundRepeat'
);

const A = system(
  {
    is: tag.a,
  },
  'width',
  'space',
  'fontSize',
  'color',
  'flex',
  'order',
  'alignSelf',
  'opacity',
  'display',
  'position',
  'top',
  'right',
  'left',
  'bottom',
  'minHeight',
  'borderRadius',
  'maxHeight',
  'maxWidth',
  'minWidth',
  'borders',
  'backgroundImage',
  'backgroundSize',
  'backgroundPosition',
  'backgroundRepeat'
);

const Flex = system(
  {
    is: Box,
  },
  { display: 'flex' },
  'flexWrap',
  'flexDirection',
  'alignItems',
  'justifyContent'
);

Box.propTypes = {
  ...space.propTypes,
  ...width.propTypes,
  ...fontSize.propTypes,
  ...flex.propTypes,
  ...flexDirection.propTypes,
  ...flexWrap.propTypes,
  ...alignContent.propTypes,
  ...alignItems.propTypes,
  ...color.propTypes,
};

export { Box, Flex, boxProps, A };
