import React from 'react'
import { Flex, Box, Type } from 'blockstack-ui'
import { CurrencyUsdIcon } from 'mdi-react'
import { Transition, animated, interpolate } from 'react-spring';
import {
  Title,
  Wrapper,
  Section,
  Logo,
  AppItem,
  ObservedSection,
  LearnMore,
  CallToAction,
  SectionContext
} from '@components/mining/shared'
import { State } from 'react-powerplug'

function arrayRotateOne(arr, reverse) {
  if (reverse) arr.unshift(arr.pop())
  else arr.push(arr.shift())
  return arr
}

const Apps = ({ apps, ...rest }) => {
  const limit = 4;
  const visible = 3;
  const items = [apps[0], apps[1], apps[2], apps[3]];

  return (
    <State initial={{ active: 1, items }}>
      {({ state, setState }) => {
        const cycleItems = (curState) => {
          if (curState.active > limit) return setState({ active: 1});

          return setState({ active: curState.active + 1 });
        };

        const { active, items } = state;
        const sortedItems = items.slice(active, items.length).concat(items.slice(0, active));

        let displayData = sortedItems.map((child, index) => {
          const y = 20 * index;
          const opacity = 1 / (index + 1);
          const scale = 1 - (.05 * index);
          return { child, index, opacity, scale, y };
        });

        const onUpdate = ({ index, opacity, scale, y }) => {
          if (index >= visible) {
            return [{ opacity: 0, scale: 1.05, y: -20 }, { scale, y }];
          }

          if (index === visible - 1) {
            return { opacity, scale, y };
          }

          return ([{}, { opacity, scale, y }]);
        }

        return (
          <Box position='relative' width={1} {...rest}>
            <Transition
              native
              items={displayData}
              keys={item => item.child.id}
              initial={() => setTimeout(() => cycleItems(state), 5000)}
              from={{ opacity: 0, scale: 0 }}
              leave={{ opacity: 0, scale: 0 }}
              enter={({ opacity, scale, y }) => ({ opacity, scale, y })}
              update={(item) => onUpdate(item)}
              onRest={() => setTimeout(() => cycleItems(state), 5000)}
            >
              {({ child }, state, index) => ({ opacity, scale, y }) => (
                <Flex
                  is={animated.div}
                  position='absolute'
                  width='100%'
                  style={{
                    opacity,
                    zIndex: displayData.length - index,
                    transform: interpolate([scale, y], (scale, y) => `translateY(${y}px) scale(${scale})`)
                  }}
                >
                  <AppItem app={child} />
                </Flex>
              )}
            </Transition>
          </Box>
        );
      }}
    </State>
  )
}

const SubtitleBTC = ({ ...rest }) => (
  <Flex alignItems={'center'} color={'blue.accent'} {...rest}>
    <Flex
      alignItems={'center'}
      justifyContent={'center'}
      size={48}
      borderColor="blue.accent"
      border={1}
      flexShrink="0"
      borderRadius={80}
    >
      <CurrencyUsdIcon />
    </Flex>
    <Type fontFamily="brand" pl={4} lineHeight={1.55}>
      The better your app, <Box is="br" display={['none', 'unset', 'unset', 'unset']} />
      the more you earn.
    </Type>
  </Flex>
)

const Hero = ({ apps, ...rest }) => (
  <ObservedSection pb={[9, 8, '12vh']} overflow="hidden" bg="blue.dark" {...rest}>
    {({ inView }) => (
      <Wrapper inView={inView} observed>
        <Flex width={[1, 1, 0.5, 0.6]} flexShrink={1} flexDirection="column">
          <Logo pb={7} />
          <Title fontSize={[7, 7, 7, 8]}>Every 30 days we&nbsp;payout $100k to the best apps.</Title>
          <SubtitleBTC display={['none', 'flex', 'flex', 'flex']} pt={7} />
        </Flex>
        <Flex
          pl={[0, 0, 8, 0]}
          alignItems="center"
          justifyContent="center"
          pt={[7, 7, 0, 0]}
          flexGrow={1}
          flexDirection="column"
          position="relative"
        >
          <CallToAction width={1} />
          <SubtitleBTC display={['flex', 'none', 'none', 'none']} pt={7} />
          <Apps apps={apps} mt={7} />
          <LearnMore
            display={['none', 'none', 'flex']}
            position={['absolute']}
            pt={8}
            pb={8}
            bottom={['-180px', '-180px']}
            is="a"
            href="#learn-more"
          />
        </Flex>
      </Wrapper>
    )}
  </ObservedSection>
)

export { Hero }
