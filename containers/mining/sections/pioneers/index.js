import React from 'react';
import { Flex, Box, Type, Button } from 'blockstack-ui';
import {
  Title,
  Wrapper,
  ObservedSection as Section,
  OpenStarterKitModal,
} from '@components/mining/shared';

import { ArrowIcon } from '@components/mining/svg';

const Avatar = ({ photo, ...rest }) => {
  const bigSize = 48;
  return (
    <Box position="relative" {...rest}>
      <Box
        position="relative"
        zIndex="10"
        mr={4}
        bg="#efefef"
        backgroundImage={photo ? `url(${photo})` : undefined}
        backgroundSize="cover"
        size={bigSize}
        borderRadius={bigSize}
      />
    </Box>
  );
};

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
      ),
    },
    quote: `App Mining allowed me to focus on building something great rather than diving straight into fundraising.`,
  },
  {
    quote: `Allows us to focus 
on what we do best, build! It’s an extra incentive to forge ahead in this new ecosystem.`,
    quotee: {
      name: 'Nick Theile',
      photo: 'https://file-cpvefljisa.now.sh',
      title: (
        <>
          Founder of{' '}
          <Type is="a" href="https://app.co/app/blockusign" target="_blank">
            Blockusign
          </Type>
        </>
      ),
    },
  },
];

const texts = [
  'Add Blockstack auth to your existing app and get a second revenue source.',
  'Skip VC fundraising, focus on your users, and get paid each month.',
  'Ditch advertising and use App Mining as an alternative revenue source.',
];

const TextSection = ({ ...rest }) => (
  <Flex
    lineHeight={1.6}
    justifyContent="space-between"
    flexWrap="wrap"
    {...rest}
  >
    {texts.map((text, i) => (
      <Box key={i} pt={[7]} width={['100%', '28%']}>
        <Box bg="blue" height="1px" width={80} />
        <Type pt={6} color="blue.dark">
          {text}
        </Type>
      </Box>
    ))}
  </Flex>
);

const Quotes = ({ ...rest }) => (
  <Flex width={1} justifyContent="space-between" flexWrap="wrap" {...rest}>
    {quotes.map(({ quote, quotee }, i) => (
      <Box
        width={[1, 0.45]}
        mr={[0, 5]}
        pb={[i !== quotes.length - 1 ? 7 : 0, 0]}
        key={i}
      >
        <Type
          color="blue.dark"
          fontWeight={300}
          fontSize={3}
          fontFamily="brand"
          lineHeight={1.75}
        >
          {quote}
        </Type>
        <Flex pt={6} alignItems="center">
          <Avatar photo={quotee.photo} />
          <Box lineHeight={1.65}>
            <Type display="inline" pr={1}>
              {quotee.name},
            </Type>{' '}
            <Type display="inline">{quotee.title}</Type>
          </Box>
        </Flex>
      </Box>
    ))}
  </Flex>
);

const PioneersSection = ({ apps, ...rest }) => (
  <Section
    style={{ willChange: 'transform' }}
    flexDirection="column"
    pb={0}
    bg="white"
    {...rest}
  >
    {({ inView }) => (
      <>
        <Wrapper inView={inView} observed>
          <Flex width={[1]} flexShrink={0} flexDirection="column">
            <Title maxWidth="100%">
              We are honored to fund the pioneers of the decentralized internet
            </Title>
            <Type pt={[5, 7, 8]} lineHeight={1.65}>
              App Mining Pioneers: Alpha Run, September 2018
            </Type>
            <Flex
              flexWrap="wrap"
              mt={7}
              alignItems="center"
              justifyContent={['space-evenly', 'flex-start', 'flex-start']}
            >
              {apps.map(app => (
                <Box
                  is="a"
                  target="_blank"
                  mr={[0, 5, 6]}
                  mb={[6, 5, 6]}
                  mx={[3, undefined, undefined]}
                  size={[35, 45, 55, 65]}
                  borderRadius={[6, 12, 18]}
                  backgroundImage={`url(${app.imgixImageUrl})`}
                  title={app.name}
                  backgroundSize="cover"
                  boxShadow="0px 4px 10px rgba(0, 0, 0, 0.15)"
                  flexShrink={0}
                  key={app.id}
                  href={`https://app.co/app/${app.Slugs[0].value}`}
                />
              ))}
            </Flex>
            <Quotes pt={[5, 8]} />
            <TextSection pt={[0, 8]} />
            <Flex
              alignItems="center"
              justifyContent="center"
              mt={[0, 7]}
              pt={[8]}
              pb={[8, 7]}
            >
              <Type
                fontSize={5}
                color="blue"
                fontFamily="brand"
                lineHeight={1.7}
                fontWeight={300}
                textAlign="center"
                maxWidth={700}
              >
                Not quite ready to mine, but want the latest App Mining updates?
              </Type>
            </Flex>
          </Flex>
        </Wrapper>
        <Flex width={1} position="relative">
          <Wrapper
            alignItems="center"
            justifyContent="center"
            position="relative"
            zIndex={2}
          >
            <Box max="auto" width={1} maxWidth={500}>
              <OpenStarterKitModal
                content={{
                  initial: {
                    title: 'Subscribe for Updates',
                  },
                  success: {
                    title: 'Thank you!',
                    body: 'We will send updates about App Mining to',
                  },
                }}
              >
                {({ bind }) => (
                  <Button
                    height="auto"
                    pt="16px"
                    pb="15px"
                    icon={ArrowIcon}
                    width={1}
                    {...bind}
                  >
                    Subscribe for Updates
                  </Button>
                )}
              </OpenStarterKitModal>
            </Box>
          </Wrapper>
          <Box
            position="absolute"
            bg="blue.light"
            height="100%"
            bottom="-50%"
            left={0}
            width={1}
          />
        </Flex>
      </>
    )}
  </Section>
);

export { PioneersSection };
