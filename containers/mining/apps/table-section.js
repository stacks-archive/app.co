import React from 'react';
import { Flex, Box, Type } from 'blockstack-ui';
import { Title, Wrapper, Section } from '@components/mining/shared';
import numeral from 'numeral';

const Pill = ({ display, children, ...rest }) => (
  <Box
    ml={4}
    py={2}
    fontSize={0}
    borderRadius={30}
    px={4}
    bg="#E4ECF1"
    display={display}
    {...rest}
  >
    <Type fontWeight={500}>{children}</Type>
  </Box>
);

const Row = ({
  name,
  index,
  imgixImageUrl,
  formattedUsdRewards,
  storageNetwork,
  authentication,
  miningReady,
  lifetimeEarnings,
  description,
  ...rest
}) => (
  <Flex
    style={{ textDecoration: 'none' }}
    is="a"
    href={
      rest.Slugs && rest.Slugs.length
        ? `https://app.co/app/${rest.Slugs[0].value}`
        : undefined
    }
    mb="1px"
    py={5}
    bg="white"
  >
    <Flex width={[40, 60]} alignItems="center" justifyContent="center">
      <Type fontFamily="brand">{index + 1}</Type>
    </Flex>
    <Flex width={[1 / 2, 1 / 2, 2 / 3]} alignItems="center">
      <Flex alignItems="center">
        <Box
          size={[24]}
          backgroundImage={`url(${imgixImageUrl})`}
          backgroundSize="cover"
          boxShadow="card"
          borderRadius={4}
        />
        <Type ml={4} fontSize={2} fontWeight={400} color="blue.dark">
          {name}
          <br />
          <Type mt={1} fontSize={1}>
            {description}
          </Type>
        </Type>
      </Flex>
    </Flex>
    <Flex width={[1 / 2, 1 / 2, 1 / 2, 1 / 3]} ml="auto" alignItems="center">
      <Flex
        justifyContent="flex-start"
        textAlign="right"
        width={[1, 1, 1 / 2]}
        pr={6}
        display={['none', 'none', 'flex']}
      >
        <Pill
          bg={miningReady ? 'blue.accent' : 'red'}
          color={miningReady ? 'dark.blue' : 'white'}
        >
          {miningReady ? 'Ready' : 'Not Ready'}
        </Pill>
      </Flex>
      <Flex
        justifyContent="flex-end"
        textAlign="right"
        width={[1, 1, 1 / 2]}
        pr={5}
      >
        <Type fontFamily="brand" color="blue">
          {lifetimeEarnings
            ? numeral(String(lifetimeEarnings).split('.')[0]).format('$0,0')
            : '--'}
        </Type>
      </Flex>
    </Flex>
  </Flex>
);

const Table = ({ apps }) => (
  <Box width={1}>
    <Flex mb="1px" py={5} bg="white">
      <Type flexShrink={1} width={[1 / 2, 1 / 2, 2 / 3]} pl={5}>
        <Type display={['none', 'inline']}>Current App Mining</Type> Rank
      </Type>

      <Flex
        flexGrow={1}
        width={[1 / 2, 1 / 2, 1 / 2, 1 / 3]}
        ml="auto"
        alignItems="center"
      >
        <Flex
          justifyContent="flex-end"
          textAlign="right"
          width={[1, 1, 1 / 2]}
          pr={5}
          display={['none', 'none', 'flex']}
        >
          <Type style={{ whiteSpace: 'nowrap' }}>App Mining Ready</Type>
        </Flex>
        <Flex
          justifyContent="flex-end"
          textAlign="right"
          width={[1, 1, 1 / 2]}
          pr={5}
        >
          <Type style={{ whiteSpace: 'nowrap' }}>Lifetime</Type>
        </Flex>
      </Flex>
    </Flex>
    <>
      {apps.map((app, i) => (
        <Row key={i} index={i} {...app} />
      ))}
    </>
  </Box>
);

const AllApps = ({ apps, ...rest }) => (
  <Section bg="blue.light" {...rest}>
    <Wrapper>
      <Flex width={[1]} flexShrink={0} flexDirection="column">
        <Title maxWidth="100%">App Mining Eligibility</Title>
        <Type maxWidth={780} lineHeight={1.65} pt={6}>
          All of the apps listed below are currently{' '}
          <Type is="a" href="/blockstack" target="_blank">
            registered with App.co
          </Type>
          . Apps that are marked <Type fontWeight="bold">Ready</Type> will be
          included in the next ranking. Apps that include Blockstack Auth that
          are marked <Type fontWeight="bold">Not Ready</Type> can qualify for
          App Mining by{' '}
          <Type
            is="a"
            href="https://docs.blockstack.org/develop/mining_enroll.html"
            target="_blank"
          >
            enrolling in the program
          </Type>
          . As stated in our documentation, sample applications created by
          following our tutorials cannot be enrolled for App Mining.
        </Type>
        <Flex
          mt={7}
          width={1}
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Table apps={apps} />
        </Flex>
      </Flex>
    </Wrapper>
  </Section>
);

export { AllApps };
