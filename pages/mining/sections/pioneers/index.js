import React from 'react'
import { Flex, Box, Type, Button } from 'blockstack-ui'
import { Title, Wrapper, Section } from '@pages/mining/shared'
import { Newsletter } from '@components/mining/newsletter'

const sections = [
  {
    graphic: null,
    button: {
      label: 'Build',
      action: () => console.log('build')
    },
    text: `Learn to build your app and integrate Blockstack auth.`
  },
  {
    graphic: null,
    button: {
      label: 'Register',
      action: () => console.log('register')
    },
    text: `Register your functional  app on App.co.`
  },
  {
    graphic: null,
    button: {
      label: 'Improve',
      action: () => console.log('improve')
    },
    text: `Improve your app. Improve your rank. Earn more BTC.`
  }
]

const Steps = ({ ...rest }) => (
  <Flex justifyContent={['center', 'center', 'space-between']} flexWrap="wrap" {...rest}>
    {sections.map(({ graphic, button, text }, i) => (
      <Flex pt={7} alignItems="center" justifyContent="center" key={i} flexDirection="column">
        <Box bg="blue.light" size={200} />
        <Box py={6}>
          <Button height="auto" pt={'9px'} pb={2}>
            {button.label}
          </Button>
        </Box>
        <Box maxWidth={220} textAlign="center">
          <Type>{text}</Type>
        </Box>
      </Flex>
    ))}
  </Flex>
)

const quotes = [
  {
    quote: 'App Mining allowed me to focus on building something great rather than diving straight into fundraising.',
    quotee: `Justin Hunter, founder of Graphite Docs`
  },
  {
    quote: 'App Mining allowed me to focus on building something great rather than diving straight into fundraising.',
    quotee: `Justin Hunter, founder of Graphite Docs`
  }
]

const texts = [
  'Add Blockstack auth to your existing app and get a second revenue source.',
  'Skip VC fundraising, focus on your users, and get paid each month.',
  'Ditch advertising and use App Mining as an alternative revenue source.'
]

const TextSection = ({ ...rest }) => (
  <Flex lineHeight={1.6} justifyContent="space-between" flexWrap="wrap" {...rest}>
    {texts.map((text, i) => (
      <Box key={i} pt={7} width={['100%', '28%']}>
        <Box bg="blue" height={'1px'} width={80} />
        <Type pt={6} color="blue.dark">
          {text}
        </Type>
      </Box>
    ))}
  </Flex>
)

const Quotes = ({ ...rest }) => (
  <Flex width={1} justifyContent="space-between" flexWrap="wrap" {...rest}>
    {quotes.map(({ quote, quotee }, i) => (
      <Box width={[1, 0.45]} mr={[0, 5]} pb={[8, 0]}>
        <Type color="blue.dark" fontWeight={300} fontSize={4} fontFamily="brand" lineHeight={1.75}>
          "{quote}"
        </Type>
        <Flex pt={6} alignItems={'center'}>
          <Box bg="blue.mid" size={48} borderRadius={48} mr={4} />
          <Type>{quotee}</Type>
        </Flex>
      </Box>
    ))}
  </Flex>
)

const PioneersSection = ({ apps, ...rest }) => (
  <Section flexDirection="column" pb={0} bg="white" {...rest}>
    <Wrapper>
      <Flex width={[1]} flexShrink={0} flexDirection="column">
        <Title maxWidth="100%">We are honored to fund the pioneers of the decentralized internet</Title>
        <Type pt={8}>App Mining Pioneers: Alpha Run, Oct 2018</Type>
        <Flex flexWrap="wrap" mt={5} alignItems="center" justifyContent="flex-start">
          {apps.map((app) => (
            <Box
              mr={6}
              mb={6}
              size={[54, 72]}
              borderRadius={16}
              backgroundImage={`url(${app.imgixImageUrl})`}
              title={app.name}
              backgroundSize="cover"
              boxShadow="card"
              flexShrink={0}
            />
          ))}
        </Flex>
        <Quotes pt={8} />
        <TextSection pt={8} />
        <Flex alignItems="center" justifyContent="center" mt={7} pt={9} pb={6}>
          <Type
            fontSize={5}
            color="blue"
            fontFamily="brand"
            lineHeight={1.7}
            fontWeight={300}
            textAlign={'center'}
            maxWidth={700}
          >
            Not quite ready to mine, but want the latest App Mining updates?
          </Type>
        </Flex>
      </Flex>
    </Wrapper>
    <Flex width={1} position="relative">
      <Wrapper alignItems="center" justifyContent="center" position="relative" zIndex={2}>
        <Box max="auto" width={1} maxWidth={500}>
          <Newsletter />
        </Box>
      </Wrapper>
      <Box position="absolute" bg={'blue.light'} height="50%" bottom={0} left={0} width={1} />
    </Flex>
  </Section>
)

export { PioneersSection }
