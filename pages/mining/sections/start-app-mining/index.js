import React from 'react'
import { Flex, Box, Type, Button } from 'blockstack-ui'
import { Title, Wrapper, Section } from '@pages/mining/shared'
import { BuildGraphic, ImproveGraphic, RegisterGraphic } from '@components/mining/svg'

const sections = [
  {
    graphic: BuildGraphic,
    button: {
      label: 'Build',
      action: () => console.log('build')
    },
    text: `Learn to build your app and integrate Blockstack auth.`
  },
  {
    graphic: RegisterGraphic,
    button: {
      label: 'Register',
      action: () => console.log('register')
    },
    text: `Register your functional  app on App.co.`
  },
  {
    graphic: ImproveGraphic,
    button: {
      label: 'Improve',
      action: () => console.log('improve')
    },
    text: `Improve your app. Improve your rank. Earn more BTC.`
  }
]

const Steps = ({ ...rest }) => (
  <Flex justifyContent={['center', 'center', 'space-between']} flexWrap="wrap" {...rest}>
    {sections.map(({ graphic: Graphic, button, text }, i) => (
      <Flex pt={7} alignItems="center" justifyContent="center" key={i} flexDirection="column">
        {/*<Box bg="blue.light" size={200} />*/}
        {Graphic ? <Graphic /> : null}
        <Box py={6}>
          <Button height="auto" pt={'9px'} pb={2}>
            {button.label}
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
          <Title>Start App Mining</Title>
          <Steps mt={8} />
          <Flex mt={8} flexDirection="column" alignItems="center" justifyContent="center">
            <Type pt={6} pb={6}>
              Detailed registration instructions?{' '}
              <Type is="a" href="#">
                App Mining Docs.
              </Type>
            </Type>
            <Type>
              Want to verify your app is completely registered? A list of{' '}
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
