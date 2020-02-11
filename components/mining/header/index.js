import * as React from 'react';
import { Flex, Type, AppMiningLogo } from 'blockstack-ui';
import { CallToAction, Countdown, Wrapper } from '../shared';

const Header = ({ showOnMobile, link, ...rest }) => {
  return (
    <Flex
      height={90}
      bg="blue.dark"
      alignItems="center"
      position="fixed"
      top={0}
      left={0}
      width={1}
      zIndex={999}
      display={showOnMobile ? 'flex' : ['none', 'none', 'flex']}
      {...rest}
    >
      <Wrapper justifyContent="space-between" alignItems="center">
        <Flex alignItems="center">
          <Flex alignItems="center" flexGrow={1}>
            <Flex
              style={{ textDecoration: 'none' }}
              is={link ? 'a' : undefined}
              href={link ? '/mining' : undefined}
              pr={2}
            >
              <AppMiningLogo typeSize={20} invert />
            </Flex>
          </Flex>
        </Flex>
        <Flex display={['none', 'none', 'flex']}>
          <CallToAction
            buttonProps={{
              py: 4,
              px: [4, 4, 4, 6],
              fontSize: [2],
            }}
            hideTimer
          />
        </Flex>
      </Wrapper>
    </Flex>
  );
};
export { Header };
