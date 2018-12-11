import React from 'react'
import { Flex, Box, Type } from 'blockstack-ui'
import { Title, Wrapper, Section } from '@components/mining/shared'

const Pill = ({ display, ...rest }) => (
  <Box ml={4} py={2} fontSize={0} borderRadius={30} px={4} bg="#E4ECF1" display={display}>
    <Type {...rest} opacity={0.75} />
  </Box>
)

const Row = ({ name, index, imgixImageUrl, formattedUsdRewards, storageNetwork, authentication, ...rest }) => (
  <Flex mb={'1px'} py={5} bg={'white'}>
    <Flex width={[40, 60]} alignItems={'center'} justifyContent="center">
      <Type fontFamily="brand">{index + 1}</Type>
    </Flex>
    <Flex
      width={[1 / 2, 1 / 2, 2 / 3]}
      style={{ textDecoration: 'none' }}
      alignItems="center"
      is="a"
      href={rest.Slugs && rest.Slugs.length ? `https://app.co/app/${rest.Slugs[0].value}` : undefined}
    >
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
        </Type>
      </Flex>
    </Flex>
    <Flex width={[1 / 2, 1 / 2, 1 / 2, 1 / 3]} ml="auto" alignItems="center">
      <Flex justifyContent="flex-start" textAlign="right" width={[1, 1 / 2]} pr={6}>
        <Pill>Ready</Pill>
      </Flex>
      <Flex justifyContent="flex-end" textAlign="right" width={1 / 2} pr={5} display={['none', 'flex']}>
        <Type fontFamily="brand" color="blue">
          {formattedUsdRewards ? formattedUsdRewards.split('.')[0] : '--'}
        </Type>
      </Flex>
    </Flex>
  </Flex>
)

const Table = ({ apps }) => {
  return (
    <Box width={1}>
      <Flex mb={'1px'} py={5} bg={'white'}>
        <Type flexShrink={1} width={[1 / 2, 1 / 2, 2 / 3]} pl={5}>
          <Type display={['none', 'inline']}>Current App Mining</Type> Rank
        </Type>

        <Flex flexGrow={1} width={[1 / 2, 1 / 2, 1 / 2, 1 / 3]} ml="auto" alignItems="center">
          <Flex justifyContent="flex-end" textAlign="right" width={[1, 1 / 2]} pr={5}>
            <Type style={{ whiteSpace: 'nowrap' }}>App Mining Ready</Type>
          </Flex>
          <Flex justifyContent="flex-end" textAlign="right" width={1 / 2} display={['none', 'flex']} pr={5}>
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
  )
}

const AllApps = ({ apps, ...rest }) => (
  <Section bg="blue.light" {...rest}>
    <Wrapper>
      <Flex width={[1]} flexShrink={0} flexDirection="column">
        <Title maxWidth="100%">App Mining ready apps</Title>
        <Type maxWidth={700} lineHeight={1.65} pt={6}>
          Apps listed below are currently registered with App.co and meet all requirements for the App Mining program.
          The list includes new apps which have not been ranked yet, but will be include in the next ranking.
        </Type>
        <Flex mt={7} width={1} flexDirection="column" alignItems="center" justifyContent="center">
          <Table apps={apps} />
        </Flex>
      </Flex>
    </Wrapper>
  </Section>
)

export { AllApps }
