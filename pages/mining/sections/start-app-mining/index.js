import React from 'react'
import { Flex, Box, Type, Button } from 'blockstack-ui'
import { Title, Wrapper, Section } from '@components/mining/shared'
import { BuildGraphic, ImproveGraphic, RegisterGraphic, ArrowIcon } from '@components/mining/svg'

const sections = [
  {
    graphic: BuildGraphic,
    button: {
      label: 'Build',
      is: 'a',
      href: 'https://docs.blockstack.org/develop/zero_to_dapp_1.html',
      target: '_blank'
    },
    text: 'Learn to build your app and integrate Blockstack auth.'
  },
  {
    graphic: RegisterGraphic,
    button: {
      label: 'Register',
      is: 'a',
      href: 'https://app.co/submit',
      target: '_blank'
    },
    text: `Register your functional app on App.co.`
  },
  {
    graphic: ImproveGraphic,
    button: {
      label: 'Improve',
      is: 'a',
      href: 'https://app.co/mining/apps',
      target: '_blank'
    },
    text: `Improve your app. Improve your rank. Earn more BTC.`
  }
]

const Steps = ({ ...rest }) => (
  <Flex justifyContent={['center', 'center', 'space-between']} flexWrap="wrap" {...rest}>
    {sections.map(({ graphic: Graphic, button: { label, ...buttonProps }, text }, i) => (
      <Flex pt={7} alignItems="center" justifyContent="center" key={i} flexDirection="column">
        {Graphic ? <Graphic /> : null}
        <Box py={6}>
          <Button color="white !important" icon={ArrowIcon} height="auto" pt={'9px'} pb={2} {...buttonProps}>
            {label}
          </Button>
        </Box>
        <Box maxWidth={220} textAlign="center">
          <Type lineHeight={1.5}>{text}</Type>
        </Box>
      </Flex>
    ))}
  </Flex>
)

const StartAppMiningSection = ({ ...rest }) => (
  <>
    <div id="learn-more" />
    <Section bg="white" {...rest}>
      <Wrapper>
        <Flex width={[1]} flexShrink={0} flexDirection="column">
          <Title maxWidth="100%">Get started with App Mining.</Title>
          <Steps mt={8} />
          <Flex mt={8} flexDirection="column" alignItems="center" justifyContent="center">
            <Type pt={6} pb={6}>
              Detailed registration instructions?{' '}
              <Type is="a" href="https://docs.blockstack.org/develop/mining_intro.html" target="_blank">
                App Mining Docs.
              </Type>
            </Type>
            <Type>
              Want to verify your app is completely registered? A list of{' '}
              {/**
               * TODO: add link here
               */}
              <Type is="a" href="#">
                all App Mining Ready apps
              </Type>
              .{' '}
            </Type>
          </Flex>
        </Flex>
      </Wrapper>
    </Section>
  </>
)

export { StartAppMiningSection }
