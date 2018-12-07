import React from 'react'
import { Flex, Box, Type, Button } from 'blockstack-ui'
import { Title, Wrapper, Section } from '@pages/mining/shared'
import { State } from 'react-powerplug'

const Row = ({ name, index, imgixImageUrl, formattedUsdRewards, ...rest }) => (
  <Flex mb={'1px'} py={5} bg={'white'}>
    <Flex width={[40, 60]} alignItems={'center'} justifyContent="center">
      {index + 1}
    </Flex>
    <Flex alignItems="center">
      <Box
        size={[30, 42]}
        backgroundImage={`url(${imgixImageUrl})`}
        backgroundSize="cover"
        boxShadow="card"
        borderRadius={12}
      />
      <Type ml={4} fontSize={2} fontWeight={600} color="blue.dark">
        {name}
      </Type>
    </Flex>
    <Flex ml="auto" alignItems="center">
      <Flex px={5}>
        <Type fontFamily="brand" color="blue">
          {formattedUsdRewards}
        </Type>
      </Flex>
      <Flex px={5} display={['none', 'flex']}>
        <Type fontFamily="brand" color="blue">
          {formattedUsdRewards}
        </Type>
      </Flex>
    </Flex>
  </Flex>
)

const Table = ({ apps, state, ...rest }) => {
  return (
    <Box width={1}>
      <Flex mb={'1px'} py={4} bg={'white'}>
        <Type pl={4}>
          <Type display={['none', 'inline']}>Current App Mining</Type> Rank
        </Type>

        <Flex ml="auto" alignItems="center">
          <Flex px={5}>
            <Type>Last Month</Type>
          </Flex>
          <Flex display={['none', 'flex']} px={5}>
            <Type>Lifetime</Type>
          </Flex>
        </Flex>
      </Flex>
      <>
        {apps.map(
          (app, i) =>
            state.all ? <Row key={i} index={i} {...app} /> : i < 5 ? <Row key={i} index={i} {...app} /> : null
        )}
      </>
    </Box>
  )
}

const HowMuchSection = ({ apps, ...rest }) => (
  <Section bg="blue.light" {...rest}>
    <Wrapper>
      <Flex width={[1]} flexShrink={0} flexDirection="column">
        <Title maxWidth="100%">How much can you earn?</Title>
        <Type pt={5}>
          We currently pay in BTC for legal compliance. We plan to begin paying Stacks tokens early 2019 provided
          compliance with all applicable law.
        </Type>
        <Flex mt={8} width={1} flexDirection="column" alignItems="center" justifyContent="center">
          <State initial={{ all: false }}>
            {({ state, setState }) => (
              <>
                <Table state={state} apps={apps} />
                {!state.all ? (
                  <Box pt={5}>
                    <Button height="auto" py={2} onClick={() => setState({ all: true })}>
                      View More
                    </Button>
                  </Box>
                ) : null}
              </>
            )}
          </State>
        </Flex>
      </Flex>
    </Wrapper>
  </Section>
)

export { HowMuchSection }
