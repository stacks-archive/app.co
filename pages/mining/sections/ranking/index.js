import { times } from 'lodash';
import React from 'react'
import { Flex, Box, Type } from 'blockstack-ui'
import { Keyframes, Trail, Transition, animated, interpolate } from 'react-spring';
import { Title, Wrapper, Section, ObservedSection } from '@components/mining/shared'
import { Dots, DotsLine, DemoEarthLogo, ProductHuntLogo, CameraIcon, TryMyUILogo, VerticalDotLine } from '@components/mining/svg'
import { getDecimalPlaces, getRandomInt } from '@utils';
import { Hover, State } from 'react-powerplug'

const texts = [
  'Any app with Blockstack auth or storage can register for App Mining.',
  'Expert reviewers use their proprietary data to evaluate apps.',
  'Reviewers, criteria, and rankings are made public each month.'
]

const DotsAnimation = ({ position = 0, color }) => (
  <Flex is={animated.div} position="absolute" bottom="-3px" style={{ transform: `translateX(${position}%)` }}>
    <Box>
      <Dots color={color} />
    </Box>
    <Box ml={'3px'}>
      <Dots color={color} />
    </Box>
    <Box ml={'3px'}>
      <Dots color={color} />
    </Box>
    <Box ml={'3px'}>
      <Dots color={color} />
    </Box>
  </Flex>
)

const TextSection = ({ ...rest }) => (
  <Flex lineHeight={1.6} justifyContent="space-between" flexWrap="wrap">
    {texts.map((text, i) => (
      <Box key={i} pt={7} width={['100%', '28%']}>
        <Box bg="white" opacity={0.25} height={'1px'} width={80} />
        <Type pt={6} color="white">
          {text}
        </Type>
      </Box>
    ))}
  </Flex>
)

const Ranker = ({ position, logo: Logo, children, color, logoProps = {}, ...rest }) => (
  <Hover>
    {({ hovered, bind }) => (
      <Box
        overflow="hidden"
        ml={[0, 0, 5, 5]}
        bg="#081537"
        width={[1, 1, '28.333%', '28.333%']}
        flexGrow={1}
        border={1}
        borderColor={color}
        minHeight={120}
        pl={4}
        pr={[4, 4, 4, 7]}
        pt={4}
        pb={6}
        mt={[4, 4, 0, 0]}
        position="relative"
        zIndex={5}
        textAlign="left"
        transition="0.1s all ease-in-out"
        transform={hovered ? 'translateY(-6px)' : 'none'}
        boxShadow={hovered ? `${color} 0px 0px 15px` : `transparent 0px 0px 10px`}
        {...bind}
        {...rest}
      >
        {Logo ? (
          <Box color="white" maxWidth={100} pb={2} {...logoProps}>
            <Logo />
          </Box>
        ) : null}
        <Type pb={2} pt={[2, 2, 0, 0]} color={color}>
          {children}
        </Type>
        <GraphAnimation position={position} color={color} rows={5} count={100}/>
      {/*  <DotsAnimation position={position} hovered={hovered} color={color} /> */}
      </Box>
    )}
  </Hover>
)

const GraphAnimation = ({ color, count, position, rows }) => {
  const columnArray = new Array(count);
  for (let i = 0; i < count; i++) {
    columnArray[i] = { key: i };
  }

  return (
    <Flex
      bottom={0}
      left={0}
      overflow='hidden'
      position='absolute'
      right={0}
      top={0}
      zIndex={-1}
    >
      <Trail
        native
        items={columnArray}
        keys={item => item.key}
        from={{ y: 0 }}
        to={(item) => { y: getRandomInt(0, 20) * 3 }}
      >
        {(item, index) => props => (
          <Flex
            is={animated.div}
            position='absolute'
            left={`${index * 5}px`}
            top="40%"
            width={5}
            height={100}
            style={{
              transform: props.y.interpolate(y => `translate(0, ${y}px)`)
            }}
          >
            <VerticalDotLine color={color} />
          </Flex>
        )}
      </Trail>
    </Flex>
  )
}

const RankingAnimation = ({ apps }) => {
  const elementHeight = 136;
  const animationData = [
    {
      id: 0,
      image: CameraIcon,
      payout: 20000
    },
    {
      id: 1,
      image: Dots,
      payout: 16000
    },
    {
      id: 2,
      image: CameraIcon,
      payout: 12800
    }
  ];

  return (
    <State initial={{ active: 0, animationData }}>
      {({ state, setState }) => {
        const cycleItems = (curState) => {
          if (curState.active + 1 >= animationData.length) return setState({ active: 0 });

          return setState({ active: curState.active + 1 });
        };

        const { active, animationData } = state;

        return (
          <Box
            bg="white"
            color={'blue.dark'}
            height={136}
          >
            <Transition
              native
              items={[animationData[active]]}
              keys={item => item.id}
              from={{ opacity: 0, payout: 0, y: elementHeight }}
              leave={{ opacity: 0, y: -elementHeight }}
              enter={({ payout }) => ([
                { opacity: 1, y: 0 },
                { payout, config: { duration: 1000 } }
              ])}
              onRest={() => setTimeout(() => cycleItems(state), 5000)}
            >
              {(item, state, index) => ({ opacity, payout, y }) => (
                <Flex
                  is={animated.div}
                  alignItems="center"
                  position='absolute'
                  width='100%'
                  flex={1}
                  px={[4, 6]}
                  py={6}
                  style={{
                    opacity,
                    transform: y.interpolate((y) => `translateY(${y}px)`)
                  }}
                >
                  <Type mr={4} fontSize={4} fontFamily="brand">
                    {item.id + 1}
                  </Type>
                  <Flex
                    mr={4}
                    size={72}
                    border={1}
                    borderColor="blue.dark"
                    borderRadius={16}
                    alignItems={'center'}
                    justifyContent="center"
                  >
                    <CameraIcon />
                  </Flex>
                  <Flex ml="auto">
                    <Type lineHeight={1.5} fontSize={5} fontWeight={300} fontFamily="brand">
                      <Type opacity={0.5} fontWeight={['bold', 300]} fontSize={[2, 5]}>
                        Payout this&nbsp;month:
                      </Type>{' '}
                      <Box is={animated.div} display='inline-block' width={85}>
                        {payout.interpolate(payout => {
                          const payoutStr = Math.floor(payout).toString();
                          return `$${payoutStr.padStart(6 - payoutStr.length, '0')}`;
                        })}
                      </Box>
                    </Type>
                  </Flex>
                </Flex>
              )}
            </Transition>
          </Box>
        );
      }}
    </State>
  );
}

const RankingSection = ({ apps, ...rest }) => {
  return (
    <ObservedSection bg="blue.dark" {...rest}>
      {({ inView }) => (
        <Wrapper inView={inView} observed flexDirection="column">
          <Flex width={1} flexShrink={1} flexDirection="column">
            <Title maxWidth={'100%'}>Apps are ranked by expert reviewers</Title>
            <Type pt={6} fontSize={3} color="white">
              Rankings are combined and payouts sent every 30 days.
            </Type>
          </Flex>
          <Flex
            width={1}
            alignItems="center"
            justifyContent="center"
            flexGrow={1}
            flexDirection="column"
            position="relative"
            pt={7}
          >
            <Box width={1} borderRadius={4} overflow="hidden" style={{ willChange: 'transform' }}>
              <RankingAnimation apps={apps} />
              <Flex
                overflow="hidden"
                flexWrap="wrap"
                lineHeight={1.5}
                p={6}
                bg="#081537"
                position="relative"
                pl={[5, 5, 5, 7]}
                pr={5}
                pt={[7, 7, 6, 6]}
              >
                <Ranker
                  is="a"
                  href="https://blog.producthunt.com/only-the-best-dapps-were-joining-blockstack-s-app-reviewer-program-%EF%B8%8F-6085bea0f501"
                  target="_blank"
                  logo={ProductHuntLogo}
                  mt={0}
                  color="#da552f"
                  position={-70}
                  logoProps={{
                    minWidth: [180, 150, 150, 180]
                  }}
                >
                  Ranks with Product Hunt
                  <Box is="br" display={['none', 'none', 'none', 'unset']} /> community upvotes and activity.
                </Ranker>
                <Ranker
                  is="a"
                  href="https://words.democracy.earth/democratic-app-ranking-democracy-earth-to-represent-blockstack-community-vote-on-app-mining-7ec8360bdc30"
                  target="_blank"
                  logo={DemoEarthLogo}
                  logoProps={{
                    minWidth: [200, 152, 152, 200]
                  }}
                  color="#00c091"
                  position={-12}
                >
                  Ranks by polling the Blockstack
                  <Box is="br" display={['none', 'none', 'none', 'unset']} /> investor community.
                </Ranker>
                <Ranker
                  is="a"
                  href="https://www.trymyui.com/blog/2019/01/09/trymyui-partners-with-blockstack-to-rate-blockchain-based-apps/"
                  target="_blank"
                  logo={TryMyUILogo}
                  color="#92c856"
                  position={-5}
                >
                  Ranks by user testing
                  <Box is="br" display={['none', 'none', 'none', 'unset']} /> and usability metrics.
                </Ranker>
                <Box left={35} top={0} position="absolute">
                  <DotsLine />
                </Box>
              </Flex>
            </Box>
            <TextSection />
          </Flex>
        </Wrapper>
      )}
    </ObservedSection>
  );
}

export { RankingSection }
