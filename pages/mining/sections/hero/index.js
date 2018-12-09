import React from 'react'
import { Flex, Box, Type, OpenModal } from 'blockstack-ui'
import { CurrencyUsdIcon } from 'mdi-react'
import { Title, Wrapper, Section, Logo, AppItem, LearnMore, CallToAction } from '@pages/mining/shared'

const Apps = ({ apps, ...rest }) => (
  <Box position="relative" width={1} {...rest}>
    {apps.map((item, i) => (i < 3 ? <AppItem app={item} key={1 + i} index={1 + i} length={4} /> : null))}
  </Box>
)




const SubtitleBTC = ({ ...rest }) => (
  <Flex alignItems={'center'} color={'blue.accent'} {...rest}>
    <Flex
      alignItems={'center'}
      justifyContent={'center'}
      size={48}
      borderColor="blue.accent"
      border={1}
      borderRadius={80}
    >
      <CurrencyUsdIcon />
    </Flex>
    <Type fontFamily={'brand'} pl={4} lineHeight={1.55}>
      The better your app,
      <br />
      the more you earn.
    </Type>
  </Flex>
)

const Hero = ({ apps, ...rest }) => (
  <Section overflow="hidden" bg="blue.dark" {...rest}>
    <Wrapper>
      <Flex width={[1, 1, 0.5, 0.6]} flexShrink={1} flexDirection="column">
        <Logo pb={7} />
        <Title fontSize={[7, 7, 7, 8]}>Every 30 days we&nbsp;payout $100k to the best apps.</Title>
        <SubtitleBTC pt={7} />
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
  </Section>
)

export { Hero }
