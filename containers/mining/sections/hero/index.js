import React from 'react';
import { Flex, Box, Type, AppMiningLogo } from 'blockstack-ui';
import {
  Title,
  Wrapper,
  AppItem,
  ObservedSection,
  CallToAction,
} from '@components/mining/shared';
import { State } from 'react-powerplug';

const Apps = ({ apps, ...rest }) => {
  const limit = 2;
  const items = [apps[0], apps[1], apps[2]];

  return (
    <State initial={{ active: 1, items }}>
      {({ state, setState }) => {
        const handleClick = () => {
          setState(s => {
            if (s.active > limit) {
              return {
                active: 1,
              };
            } else {
              return {
                active: s.active + 1,
              };
            }
          });
        };
        const timeout = setTimeout(handleClick, 3000);

        return (
          <Box position="relative" width={1} {...rest}>
            {state.items.map((item, i) =>
              i <= limit ? (
                <AppItem
                  app={item}
                  active={state.active}
                  key={1 + i}
                  index={i + 1}
                  length={limit + 1}
                />
              ) : null
            )}
          </Box>
        );
      }}
    </State>
  );
};

const SubtitleBTC = ({ ...rest }) => (
  <Flex alignItems="center" color="blue.accent" {...rest}>
    <Type fontFamily="brand" lineHeight={1.55}>
      Thank you to the hundreds of you that participated and congratulations to
      our top earners.{' '}
      <Type
        fontFamily="brand"
        as="a"
        href="https://blog.blockstack.org/the-next-phase-of-app-mining/"
        target="_blank"
        style={{
          color: 'white',
        }}
        rel="noopener noreferrer"
      >
        Learn more.
      </Type>
    </Type>
  </Flex>
);

const Hero = ({ apps, ...rest }) => (
  <ObservedSection
    minHeight="600px"
    height="auto"
    overflow="hidden"
    bg="blue.dark"
    {...rest}
  >
    {({ inView }) => (
      <Wrapper inView={inView} observed flexDirection="column">
        <Flex
          mx="auto"
          width={[1, 1, 0.5, 0.5]}
          flexShrink={1}
          alignItems="center"
          textAlign="center"
          flexDirection="column"
        >
          <AppMiningLogo typeSize={22} pb={5} invert />
          <Title fontSize={[7, 7, 7, 8]}>App Mining Has Been Paused</Title>
          <SubtitleBTC pt={4} />
        </Flex>
        <Flex
          pl={[0, 0, 8, 0]}
          alignItems="center"
          justifyContent="center"
          pt={[7, 7, 0, 0]}
          flexGrow={1}
          maxWidth="420px"
          mx="auto"
          flexDirection="column"
          position="relative"
        >
          <CallToAction mt={6} width={1} />
        </Flex>
      </Wrapper>
    )}
  </ObservedSection>
);

export { Hero };
