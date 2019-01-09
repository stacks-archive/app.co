import React from 'react'
import { Flex, Box, Type } from 'blockstack-ui'
import { Title, Wrapper, Section } from '@components/mining/shared'
import { Dots, DotsLine, DemoEarthLogo, ProductHuntLogo, CameraIcon } from '@components/mining/svg'
import { Hover } from 'react-powerplug'
const texts = [
  'Any app with Blockstack auth or storage can register for App Mining.',
  'Expert reviewers use their proprietary data to evaluate apps.',
  'Reviewers, criteria, and rankings are made public each month.'
]

const DotsAnimation = ({ color, hovered }) => (
  <Flex position="absolute" bottom="-3px" left={0}>
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

const Ranker = ({ logo: Logo, children, color, ...rest }) => (
  <Hover>
    {({ hovered, bind }) => (
      <Box
        overflow="hidden"
        ml={[0, 0, 0, 5]}
        bg="#081537"
        width={[1, 1, 1, 'auto']}
        border={1}
        borderColor={color}
        pl={4}
        pr={[4, 4, 4, 7]}
        pt={4}
        pb={6}
        mt={[4, 4, 4, 0]}
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
          <Box pb={2}>
            <Logo />
          </Box>
        ) : null}
        <Type pb={2} color={color}>
          {children}
        </Type>
        <DotsAnimation hovered={hovered} color={color} />
      </Box>
    )}
  </Hover>
)

const RankingSection = ({ apps, ...rest }) => (
  <Section bg="blue.dark" {...rest}>
    <Wrapper flexDirection="column">
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
          <Flex color={'blue.dark'} alignItems="center" bg="white" px={[4, 6]} py={6}>
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
                alignItems={'center'}
                justifyContent="center"
              >
                <CameraIcon />
              </Flex>
            </Flex>
            <Flex ml="auto">
              <Type lineHeight={1.5} fontSize={5} fontWeight={300} fontFamily="brand">
                <Type opacity={0.5} fontWeight={['bold', 300]} fontSize={[2, 5]}>
                  Payout this&nbsp;month:
                </Type>{' '}
                $100,000
              </Type>
            </Flex>
          </Flex>
          <Flex
            overflow="hidden"
            flexWrap="wrap"
            lineHeight={1.5}
            p={6}
            bg="#081537"
            position="relative"
            pl={[5, 5, 5, 7]}
            pr={5}
          >
            <Ranker
              is="a"
              href="https://blog.producthunt.com/only-the-best-dapps-were-joining-blockstack-s-app-reviewer-program-%EF%B8%8F-6085bea0f501"
              target="_blank"
              logo={ProductHuntLogo}
              mt={0}
              color={'#EF6F70'}
            >
              Ranks with Product Hunt
              <br /> community upvotes and activity.
            </Ranker>
            <Ranker
              is="a"
              href="https://words.democracy.earth/democratic-app-ranking-democracy-earth-to-represent-blockstack-community-vote-on-app-mining-7ec8360bdc30"
              target="_blank"
              logo={DemoEarthLogo}
              color={'#1ADAD9'}
            >
              Ranks by polling the Blockstack
              <br /> investor community.
            </Ranker>
            <Box left={35} top={0} position="absolute">
              <DotsLine />
            </Box>
          </Flex>
        </Box>
        <TextSection />
      </Flex>
    </Wrapper>
  </Section>
)

export { RankingSection }
