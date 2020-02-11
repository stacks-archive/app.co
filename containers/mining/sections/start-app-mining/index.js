import React from 'react';
import { Flex, Box, Type, Button } from 'blockstack-ui';
import Link from 'next/link';
import { Title, Wrapper, ObservedSection } from '@components/mining/shared';
import {
  BuildGraphic,
  ImproveGraphic,
  RegisterGraphic,
  ArrowIcon,
} from '@components/mining/svg';
import { trackEvent } from '@utils';

const sections = [
  {
    graphic: BuildGraphic,
    button: {
      label: 'Build',
      is: 'a',
      href: 'https://docs.blockstack.org/develop/zero_to_dapp_1.html',
      target: '_blank',
    },
    eventLabel: 'App Mining Get Started Click - Build',
    text: 'Learn to build your app and integrate Blockstack auth.',
  },
  {
    graphic: RegisterGraphic,
    button: {
      label: 'Register',
      is: 'a',
      href: '/submit',
      target: '_blank',
    },
    eventLabel: 'App Mining Get Started Click - Register',
    text: `Register your functional app on App.co.`,
  },
  {
    graphic: ImproveGraphic,
    button: {
      label: 'Improve',
      is: 'a',
      href: '/mining/apps',
      target: '_blank',
    },
    eventLabel: 'App Mining Get Started Click - Improve',
    text: `Improve your app. Improve your rank. Earn more BTC.`,
  },
];

const Steps = ({ ...rest }) => (
  <Flex
    justifyContent={['center', 'center', 'space-between']}
    flexWrap="wrap"
    {...rest}
  >
    {sections.map(
      ({
        graphic: Graphic,
        eventLabel,
        button: { label, ...buttonProps },
        text,
      }) => (
        <Flex
          pt={7}
          alignItems="center"
          justifyContent="center"
          key={eventLabel}
          flexDirection="column"
        >
          {Graphic ? (
            <Box width="180px">
              <Graphic />
            </Box>
          ) : null}
          <Box py={6}>
            <Button
              color="white !important"
              icon={ArrowIcon}
              height="auto"
              pt="9px"
              pb={2}
              {...buttonProps}
              onClick={() => trackEvent(eventLabel)}
            >
              {label}
            </Button>
          </Box>
          <Box maxWidth={220} textAlign="center">
            <Type lineHeight={1.5}>{text}</Type>
          </Box>
        </Flex>
      )
    )}
  </Flex>
);

const StartAppMiningSection = ({ ...rest }) => (
  <>
    <div id="learn-more" />
    <ObservedSection bg="white" {...rest}>
      {({ inView }) => (
        <Wrapper inView={inView} observed>
          <Flex width={[1]} flexShrink={0} flexDirection="column">
            <Title maxWidth="100%">Get started with App Mining.</Title>
            <Steps mt={[0, 8]} />
            <Flex
              lineHeight={1.65}
              mt={[4, 8]}
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Type pt={6} pb={6}>
                Detailed registration instructions?{' '}
                <Type
                  display="inline"
                  is="a"
                  href="https://docs.blockstack.org/develop/mining_intro.html"
                  target="_blank"
                  onClick={() =>
                    trackEvent('App Mining Get Started Click - Detailed Docs')
                  }
                >
                  App Mining Docs.
                </Type>
              </Type>
              <Type>
                Want to verify your app is completely registered? A list of{' '}
                <Link passHref href="/mining/apps">
                  <Type
                    display="inline"
                    is="a"
                    onClick={() =>
                      trackEvent('App Mining Get Started Click - Eligible Apps')
                    }
                  >
                    all App Mining eligible apps
                  </Type>
                </Link>
                .{' '}
              </Type>
            </Flex>
          </Flex>
        </Wrapper>
      )}
    </ObservedSection>
  </>
);

export { StartAppMiningSection };
