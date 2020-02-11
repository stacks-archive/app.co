import React from 'react';
import { Flex, Box, Type } from 'blockstack-ui';
import { Title, Wrapper, ObservedSection } from '@components/mining/shared';
import { useHover } from 'use-events';
import {
  Dots,
  DotsLine,
  DemoEarthLogo,
  ProductHuntLogo,
  CameraIcon,
  TryMyUILogo,
  NewInternetLabsHorizontal,
  AwarioLogo,
} from '@components/mining/svg';
import { animated } from 'react-spring';

const texts = [
  'Any app with Blockstack auth or storage can register for App Mining.',
  'Expert reviewers use their proprietary data to evaluate apps.',
  'Reviewers, criteria, and rankings are made public each month.',
];

const DotsAnimation = ({ position = 0, color }) => (
  <Flex
    is={animated.div}
    position="absolute"
    bottom="-3px"
    style={{ transform: `translateX(${position}%)` }}
  >
    <Box>
      <Dots color={color} />
    </Box>
    <Box ml="3px">
      <Dots color={color} />
    </Box>
    <Box ml="3px">
      <Dots color={color} />
    </Box>
    <Box ml="3px">
      <Dots color={color} />
    </Box>
  </Flex>
);

const TextSection = ({ ...rest }) => (
  <Flex lineHeight={1.6} justifyContent="space-between" flexWrap="wrap">
    {texts.map((text, i) => (
      <Box key={i} pt={7} width={['100%', '28%']}>
        <Box bg="white" opacity={0.25} height="1px" width={80} />
        <Type pt={6} color="white">
          {text}
        </Type>
      </Box>
    ))}
  </Flex>
);

const RankerContainer = ({
  position,
  logo: Logo,
  children,
  color,
  logoProps = {},
  hovered,
  textColor = color,
  ...rest
}) => (
  <Box
    overflow="hidden"
    ml={[0, 0, 5, 5]}
    bg="#081537"
    width={[1, 1, '45%', '45%']}
    flexGrow={1}
    border={1}
    borderColor={color}
    minHeight={120}
    pl={4}
    pr={[4, 4, 4, 7]}
    pt={4}
    pb={6}
    mt={[4]}
    position="relative"
    zIndex={5}
    textAlign="left"
    transition="0.1s all ease-in-out"
    transform={hovered ? 'translateY(-5px)' : 'translateY(0px)'}
    style={{ willChange: 'transform' }}
    {...rest}
  >
    {Logo ? (
      <Box color="white" maxWidth={100} pb={2} {...logoProps}>
        <Logo />
      </Box>
    ) : null}
    <Type
      transition="0.1s all ease-in-out"
      pb={2}
      pt={[2, 2, 0, 0]}
      color={hovered ? 'white' : textColor}
    >
      {children}
    </Type>
    <DotsAnimation position={position} hovered={hovered} color={color} />
  </Box>
);

const Ranker = ({ children, ...rest }) => {
  const [hovered, bind] = useHover();
  return (
    <RankerContainer {...rest} {...bind} hovered={hovered}>
      {children}
    </RankerContainer>
  );
};

const RankingSection = ({ apps, ...rest }) => (
  <ObservedSection bg="blue.dark" {...rest}>
    {({ inView }) => (
      <Wrapper inView={inView} observed flexDirection="column">
        <Flex width={1} flexShrink={1} flexDirection="column">
          <Title maxWidth="100%">Apps are ranked by expert reviewers</Title>
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
          <Box
            width={1}
            borderRadius={4}
            overflow="hidden"
            style={{ willChange: 'transform' }}
          >
            <Flex
              color="blue.dark"
              alignItems="center"
              bg="white"
              px={[4, 6]}
              py={6}
            >
              <Flex alignItems="center">
                <Type mr={4} fontSize={4} fontFamily="brand">
                  1
                </Type>
                <Flex
                  mr={4}
                  size={72}
                  border={1}
                  borderColor="blue.dark"
                  borderRadius={16}
                  alignItems="center"
                  justifyContent="center"
                >
                  <CameraIcon />
                </Flex>
              </Flex>
              <Flex ml="auto">
                <Type
                  lineHeight={1.5}
                  fontSize={5}
                  fontWeight={300}
                  fontFamily="brand"
                >
                  <Type
                    opacity={0.5}
                    fontWeight={['bold', 300]}
                    fontSize={[2, 5]}
                  >
                    Payout this&nbsp;month:
                  </Type>{' '}
                  $400,000
                </Type>
              </Flex>
            </Flex>
            <Flex
              overflow="hidden"
              flexWrap="wrap"
              lineHeight={1.5}
              pb={6}
              bg="#081537"
              position="relative"
              pl={[5, 5, 5, 7]}
              pr={6}
              pt={[4]}
            >
              <Ranker
                is="a"
                href="https://blog.producthunt.com/only-the-best-dapps-were-joining-blockstack-s-app-reviewer-program-%EF%B8%8F-6085bea0f501"
                target="_blank"
                logo={ProductHuntLogo}
                color="#da552f"
                key="ph"
                position={-6}
                logoProps={{
                  minWidth: [180, 150, 150, 180],
                }}
              >
                Ranks with Product Hunt
                <Box is="br" display={['none', 'none', 'none', 'unset']} />{' '}
                community upvotes and activity.
              </Ranker>
              <Ranker
                key="try"
                is="a"
                href="https://www.trymyui.com/blog/2019/01/09/trymyui-partners-with-blockstack-to-rate-blockchain-based-apps/"
                target="_blank"
                logo={TryMyUILogo}
                color="#92c856"
                position={-5}
              >
                Ranks by user testing
                <Box is="br" display={['none', 'none', 'none', 'unset']} /> and
                usability metrics.
              </Ranker>
              <Ranker
                key="aw"
                is="a"
                href="https://blog.blockstack.org/introducing-awario-app-reviewer/"
                target="_blank"
                logo={AwarioLogo}
                color="#0bb3ff"
                position={-5}
              >
                Ranks by 'awareness' level
                <Box is="br" display={['none', 'none', 'none', 'unset']} />{' '}
                based on the online reach the app generates.
              </Ranker>
              <Ranker
                key="nil"
                is="a"
                href="https://blog.blockstack.org/introducing-new-internet-labs-the-digital-rights-reviewer-for-app-mining/"
                target="_blank"
                logo={NewInternetLabsHorizontal}
                logoProps={{
                  minWidth: [200, 152, 152, 200],
                }}
                color="#b077ff"
                position={-25}
              >
                Ranks based on how well apps protect{' '}
                <Box is="br" display={['none', 'none', 'none', 'unset']} />
                the fundamental digital rights of users.
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

export { RankingSection };
