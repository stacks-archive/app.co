import React from 'react'
import { Flex, Box, Type } from 'blockstack-ui'
import { Hover, State } from 'react-powerplug'
import { Title, Wrapper, LearnMore, ObservedSection } from '@components/mining/shared'

import numeral from 'numeral'
import { ChevronRightIcon, ChevronLeftIcon } from 'mdi-react'

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
      width={5 / 8}
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
    <Flex width={3 / 8} ml="auto" alignItems="center">
      <Flex justifyContent={['flex-end', 'center']} textAlign="center" width={[1, 1 / 2]} pr={6}>
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

const ArrowButton = ({ disabled, icon: Icon, ...rest }) => (
  <Hover>
    {({ hovered, bind }) => (
      <Box
        {...bind}
        cursor={hovered && !disabled ? 'pointer' : 'unset'}
        pt={1}
        px={2}
        opacity={disabled ? '0.25' : 1}
        color={hovered && !disabled ? 'blue' : undefined}
        {...rest}
      >
        <Icon size={16} />
      </Box>
    )}
  </Hover>
)

const Table = ({ apps, state, limit = 7, months, setState, ...rest }) => {
  const decrementMonth = () => {
    if (state.month !== 0) {
      setState((s) => ({
        month: s.month - 1
      }))
    }
  }
  const incrementMonth = () => {
    if (state.month < months.length - 1) {
      setState((s) => ({
        month: s.month + 1
      }))
    }
  }
  return (
    <Box width={1}>
      <Flex mb="1px" py={5} bg="white">
        <Type width={[1 / 3, 5 / 8]} pl={5}>
          <Type display={['none', 'inline']}>App Mining</Type> Rank
        </Type>
        <Flex width={[2 / 3, 3 / 8]} ml="auto" alignItems="center">
          <Flex alignItems="center" justifyContent={['flex-end', 'center']} textAlign="center" width={[1, 1 / 2]}>
            <ArrowButton icon={ChevronLeftIcon} onClick={decrementMonth} pt={1} px={2} disabled={state.month === 0} />
            <Type style={{ whiteSpace: 'nowrap' }}>
              {months[state.month].monthName} {months[state.month].year.toString().replace('20', "'")}
            </Type>
            <ArrowButton
              icon={ChevronRightIcon}
              onClick={incrementMonth}
              disabled={state.month === months.length - 1}
            />
          </Flex>
          <Flex justifyContent="flex-end" textAlign="right" width={1 / 2} display={['none', 'flex']} pr={5}>
            <Type style={{ whiteSpace: 'nowrap' }}>Lifetime</Type>
          </Flex>
        </Flex>
      </Flex>
      <>
        {apps.map((app, i) =>
          state.all ? <Row key={i} index={i} {...app} /> : i < limit ? <Row key={i} index={i} {...app} /> : null
        )}
      </>
    </Box>
  )
}

const HowMuchSection = ({ apps, months, ...rest }) => (
  <ObservedSection bg="blue.light" {...rest}>
    {({ inView }) => (
      <Wrapper inView={inView} observed>
        <Flex width={[1]} flexShrink={0} flexDirection="column">
          <Title maxWidth="100%">How much can you earn?</Title>
          <Type maxWidth={700} lineHeight={1.65} pt={6}>
            We currently pay in BTC for legal compliance. We plan to begin paying Stacks tokens early 2019 provided
            compliance with all applicable law.
          </Type>
          <Flex mt={7} width={1} flexDirection="column" alignItems="center" justifyContent="center">
            <State initial={{ all: false, showMenu: false, month: months.length - 1 }}>
              {({ state, setState }) => (
                <>
                  <Table state={state} months={months} apps={months[state.month].apps} setState={setState} />
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
      </Wrapper>
    )}
  </ObservedSection>
)

export { HowMuchSection }
