import * as React from 'react'
import { Flex, Box, Type } from 'blockstack-ui'

const SectionContext = React.createContext({})

const Title = ({ ...rest }) => (
  <SectionContext.Consumer>
    {({ bg }) => (
      <Type
        color={bg === 'blue.dark' ? 'white' : 'blue'}
        fontSize={[7, 7, 7, 8]}
        fontFamily="brand"
        fontWeight={300}
        maxWidth={500}
        lineHeight={1.4}
        {...rest}
      />
    )}
  </SectionContext.Consumer>
)
const Wrapper = ({ ...rest }) => (
  <Flex
    maxWidth={1280}
    px={[6, 8]}
    width={'100%'}
    mx={'auto'}
    flexDirection={['column', 'column', 'row', 'row']}
    {...rest}
  />
)
const Section = ({ bg, ...rest }) => (
  <SectionContext.Provider value={{ bg }}>
    <Flex
      alignItems="center"
      flexShrink={0}
      pt={[6, 8, '12vh']}
      pb={[6, 8, '12vh']}
      minHeight="100vh"
      justifyContent="center"
      width="100%"
      bg={bg}
      {...rest}
    />
  </SectionContext.Provider>
)

const Logo = ({ ...rest }) => (
  <Box {...rest}>
    <Flex alignItems="center">
      <Box size={32} bg="blue" mr={3} />
      <Type textTransform="uppercase" letterSpacing="1px" color="white" fontWeight="bolder" fontSize={3}>
        App Mining
      </Type>
    </Flex>
    <Type pt={3} color="blue.mid">
      Powered by{' '}
      <Type color="white !important" is="a" href="https://blockstack.org" target="_blank">
        Blockstack
      </Type>{' '}
      +{' '}
      <Type color="white !important" is="a" href="https://app.co" target="_blank">
        App.co
      </Type>
    </Type>
  </Box>
)

const getActiveStyles = (index, length) => {
  if (index === 1) {
    return {
      zIndex: 20,
      position: 'relative'
    }
  }
  return {
    position: 'absolute',
    zIndex: length - index,
    top: '0px',
    transform: `translateY(${(index - 1) * 10}px) scale(${1 -
      Number(`0.${String(index / 3).replace('.', '')}`) +
      0.04})`,
    left: 0,
    opacity: 1 * Number(`0.${length - index}`) + 0.1
  }
}

const AppItem = ({ app, index, length, ...rest }) => (
  <Flex
    alignItems="center"
    p={4}
    bg="white"
    width={1}
    borderRadius={4}
    boxShadow="card"
    {...rest}
    {...getActiveStyles(index, length)}
  >
    <Box
      size={[40, 60]}
      flexShrink={0}
      backgroundImage={`url(${app.imgixImageUrl})`}
      backgroundSize="cover"
      bg="white"
      borderRadius={[10, 16]}
      boxShadow="card"
    />
    <Box fontSize={3} pl={4} color="blue.dark">
      <Type fontWeight={600}>{app.name}</Type> <Type>earned</Type>{' '}
      <Type fontWeight={600}>{app.formattedUsdRewards}</Type>
    </Box>
  </Flex>
)

export { Title, Wrapper, Section, Logo, AppItem, SectionContext }
