import React from 'react'
import { Flex, Box, Type, Button } from 'blockstack-ui'
import { Title, Wrapper, Section, LearnMore, ObservedSection } from '@components/mining/shared'
import { State } from 'react-powerplug'
import numeral from 'numeral'

const Pill = ({ display, ...rest }) => (
  <Box ml={4} py={2} fontSize={0} borderRadius={30} px={4} bg="#E4ECF1" display={display}>
    <Type {...rest} opacity={0.75} />
  </Box>
)

const Row = ({
  name,
  index,
  imgixImageUrl,
  formattedUsdRewards,
  storageNetwork,
  authentication,
  lifetimeEarnings,
  ...rest
}) => (
  <Flex mb={'1px'} py={5} bg={'white'}>
    <Flex width={[40, 60]} alignItems={'center'} justifyContent="center">
      <Type fontFamily="brand">{index + 1}</Type>
    </Flex>
    <Flex
      width={5 / 7}
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
      {authentication === 'Blockstack' ? <Pill display={['none', 'none', 'flex']}>Blockstack Auth</Pill> : null}
      {storageNetwork === 'Gaia' ? <Pill display={['none', 'none', 'flex']}>Gaia</Pill> : null}
    </Flex>
    <Flex width={2 / 7} ml="auto" alignItems="center">
      <Flex justifyContent="flex-end" textAlign="right" width={[1, 1 / 2]} pr={6}>
        <Type fontFamily="brand" color="blue">
          {formattedUsdRewards.split('.')[0]}
        </Type>
      </Flex>
      <Flex justifyContent="flex-end" textAlign="right" width={1 / 2} pr={5} display={['none', 'flex']}>
        <Type fontFamily="brand" color="blue">
          {lifetimeEarnings ? numeral(String(lifetimeEarnings).split('.')[0]).format('$0,0') : '--'}
        </Type>
      </Flex>
    </Flex>
  </Flex>
)

const Table = ({ apps, state, limit = 7, ...rest }) => {
  return (
    <Box width={1}>
      <Flex mb={'1px'} py={5} bg={'white'}>
        <Type width={5 / 7} pl={5}>
          <Type display={['none', 'inline']}>Current App Mining</Type> Rank
        </Type>

        <Flex width={2 / 7} ml="auto" alignItems="center">
          <Flex justifyContent="flex-end" textAlign="right" width={[1, 1 / 2]} pr={5}>
            <Type style={{ whiteSpace: 'nowrap' }}>Last Month</Type>
          </Flex>
          <Flex justifyContent="flex-end" textAlign="right" width={1 / 2} display={['none', 'flex']} pr={5}>
            <Type style={{ whiteSpace: 'nowrap' }}>Lifetime</Type>
          </Flex>
        </Flex>
      </Flex>
      <>
        {apps.map(
          (app, i) =>
            state.all ? <Row key={i} index={i} {...app} /> : i < limit ? <Row key={i} index={i} {...app} /> : null
        )}
      </>
    </Box>
  )
}

const HowMuchSection = ({ apps, ...rest }) => (
  <ObservedSection bg="blue.light" {...rest}>
    {({inView}) => <Wrapper inView={inView} observed>
      <Flex width={[1]} flexShrink={0} flexDirection="column">
        <Title maxWidth="100%">How much can you earn?</Title>
        <Type maxWidth={700} lineHeight={1.65} pt={6}>
          We currently pay in BTC for legal compliance. We plan to begin paying Stacks tokens early 2019 provided
          compliance with all applicable law.
        </Type>
        <Flex mt={7} width={1} flexDirection="column" alignItems="center" justifyContent="center">
          <State initial={{ all: false }}>
            {({ state, setState }) => (
              <>
                <Table state={state} apps={apps} />
                {!state.all ? (
                  <Box pt={7}>
                    <LearnMore
                      position="static"
                      color="blue.dark"
                      hoverColor="blue"
                      label={'Show more apps'}
                      onClick={() => setState({ all: true })}
                    />
                  </Box>
                ) : null}
              </>
            )}
          </State>
        </Flex>
      </Flex>
    </Wrapper>}
  </ObservedSection>
)

export { HowMuchSection }
