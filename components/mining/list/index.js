import * as React from 'react';
import { Flex, Box } from 'blockstack-ui';

const MiningListItem = ({ ...rest }) => <Flex {...rest} />;
const RenderItems = ({ items, noItemBorder, ...rest }) => (
  <>
    {items.map((item, i) => {
      const isLast = i + 1 === items.length;
      return item.children ? (
        <MiningListItem key={i} {...item} {...rest} />
      ) : (
        <MiningListItem
          key={i}
          borderBottom={noItemBorder ? '0' : isLast ? '0' : '1px solid white'}
          {...rest}
        >
          {item}
        </MiningListItem>
      );
    })}
  </>
);

const MiningList = ({ items, children, noItemBorder, noBorders, ...rest }) => (
  <Box border={noBorders ? '0' : '1px solid white'} {...rest}>
    {items ? (
      <RenderItems items={items} noItemBorder={noItemBorder || noBorders} />
    ) : null}
    {children}
  </Box>
);

export { MiningList, MiningListItem };
