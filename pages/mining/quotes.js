import * as React from 'react'
import { Section } from '@pages/mining/shared'
import { Box, Flex, Type } from 'blockstack-ui'

const Quote = ({ quote, ...rest }) => (
  <Flex position="relative" borderLeft="5px solid rgba(255,255,255,0.08)" alignItems="center" pl={3} {...rest}>
    <Type fontSize="18px" fontWeight="500" lineHeight={1.45} color="white" position="relative">
      {quote}
    </Type>
  </Flex>
)

const Quotee = ({ photo, name, title, ...rest }) => (
  <Flex mt={3} alignItems="center" justifyContent={['center', 'flex-end']} {...rest}>
    <Avatar mr={3} photo={photo} />
    <Flex alignItems={['flex-start', 'center']} flexDirection={['column', 'row']}>
      <Type fontSize={2} color="white">
        {name}
      </Type>
      <Type pl={[0, 2]}>{title}</Type>
    </Flex>
  </Flex>
)

const Avatar = ({ photo, ...rest }) => {
  const bigSize = 48
  const smallSize = 20
  const barWidth = 60
  return (
    <Box position="relative" {...rest}>
      <Box width={barWidth} opacity={0.35} height="2px" bg="white" position="absolute" top={`calc(50% - 1px)`} />
      <Box
        size={smallSize}
        bg="white"
        borderRadius={30}
        position="absolute"
        left={barWidth}
        top={`calc(50% - ${smallSize / 2}px)`}
      />
      <Box
        position="relative"
        zIndex="10"
        ml={`${barWidth + smallSize / 2}px`}
        bg="#efefef"
        backgroundImage={photo ? `url(${photo})` : undefined}
        backgroundSize="cover"
        size={bigSize}
        borderRadius={bigSize}
      />
    </Box>
  )
}

const quotes = [
  {
    quotee: {
      name: 'Justin Hunter',
      photo: 'https://file-rqdiorjzfy.now.sh/',
      title: (
        <>
          Founder of{' '}
          <Type is="a" href="https://app.co/app/graphite" target="_blank">
            Graphite Docs
          </Type>
        </>
      )
    },
    quote: `The hardest part of launching any application, let alone a decentralized application, is bootstrapping it. Even if you’re seeking funding, that process often takes time. Blockstack App Rewards allows an application to focus on building something great rather than diving straight into fundraising.`
  },

  {
    quote: `App rewards mining allows Blockusign to focus on what we do best, BUILD! It provides us with the extra incentive to keep forging ahead and iterating in this brand-new ecosystem - without having to worry about finding early stage funding. We truly feel included in this passionate community of people, from around the world, that believe in building the decentralized open web.`,
    quotee: {
      name: 'Nick Tee',
      photo: 'https://file-cpvefljisa.now.sh',
      title: (
        <>
          Founder of{' '}
          <Type is="a" href="https://app.co/app/blockusign" target="_blank">
            Blockusign
          </Type>
        </>
      )
    }
  }
]

const Quotes = ({ ...props }) => (
  <>
    <Section minHeight="40vh" justifyContent="flex-end" mt={6} flexDirection="column" {...props}>
      <Box mx="auto">
        {quotes.map(({ quote, quotee: { name, title, photo } }, i) => (
          <Box pb={6} mb={2} key={i} maxWidth={['100%', '700px']}>
            <Quote quote={quote} />
            <Quotee title={title} photo={photo} name={name} />
          </Box>
        ))}
      </Box>
    </Section>
  </>
)

export { Quotes }
