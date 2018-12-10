import * as React from 'react'
import { Flex, Box, Type, OpenModal } from 'blockstack-ui'
import { Hover } from 'react-powerplug'
import { ArrowIcon } from '@components/mining/svg'
import { StarterKitModal } from '@pages/mining/starter-kit-modal'

const SectionContext = React.createContext({})

const OpenStarterKitModal = ({ ...rest }) => <OpenModal component={StarterKitModal} {...rest} />

const Countdown = ({ ...rest }) => (
  <>
    <Type fontWeight="bolder">22D</Type> : <Type fontWeight="bolder">11H</Type> : <Type fontWeight="bolder">05M</Type>
  </>
)

const LearnMore = ({ label = 'Learn how to win', color = 'blue.mid', hoverColor = 'white', ...rest }) => (
  <Hover>
    {({ bind, hovered }) => (
      <Flex
        style={{ cursor: hovered ? 'pointer' : 'unset' }}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        transition="0.08s all ease-in-out"
        transform={hovered ? 'translateY(10px)' : 'none'}
        {...bind}
        {...rest}
      >
        <Box pb={5}>
          <Type color={hovered ? hoverColor : color}>{label}</Type>
        </Box>
        <Flex
          color={hovered ? hoverColor : color}
          alignItems="center"
          justifyContent="center"
          transform="rotate(90deg)"
        >
          <ArrowIcon color="currentColor" />
        </Flex>
      </Flex>
    )}
  </Hover>
)

const Title = ({ ...rest }) => (
  <SectionContext.Consumer>
    {({ bg }) => (
      <Type
        color={bg === 'blue.dark' ? 'white' : 'blue'}
        fontSize={[7, 7, 7, '42px']}
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
    transform: `translateY(${(index - 1) * 18}px) scale(${1 -
      Number(`0.${String(index / 2).replace('.', '')}`) +
      0.04})`,
    left: 0,
    opacity: 1 * Number(`0.${length - index}`) + 0.1
  }
}

const AppItem = ({ app, index, length, ...rest }) => (
  <Flex
    alignItems="center"
    p={5}
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
      opacity={index !== 1 ? '0' : 1}
    />
    <Box fontSize={3} pl={4} color="blue.dark">
      <Type fontWeight={400}>{app.name}</Type> <Type opacity={0.5}>earned</Type>{' '}
      <Type fontWeight={400}>{app.formattedUsdRewards}</Type>
    </Box>
  </Flex>
)

const CallToAction = ({ hideTimer, buttonProps = {}, ...rest }) => (
  <OpenStarterKitModal>
    {({ bind: modalBind }) => (
      <Hover>
        {({ hovered, bind }) => (
          <Box
            borderRadius={2}
            overflow="hidden"
            transform={hovered ? 'translateY(-5px)' : 'unset'}
            transition={'0.1s all ease-in-out'}
            {...rest}
          >
            <Flex
              bg={hovered ? 'white' : 'blue.accent'}
              alignItems="center"
              justifyContent="center"
              px={5}
              py={6}
              color={hovered ? 'blue' : 'blue.dark'}
              cursor={hovered ? 'pointer' : 'unset'}
              transition="0.1s all ease-in-out"
               fontWeight={400} fontSize={3}
              {...buttonProps}
              {...bind}
              {...modalBind}
            >
              <Type>
                Get your App Mining Starter Kit
              </Type>
            </Flex>

            {!hideTimer ? (
              <Flex bg="#081537" alignItems="center" justifyContent="center" p={5}>
                <Type color="white" fontWeight={400} fontSize={2}>
                  Next ranking starts in <Countdown />
                </Type>
              </Flex>
            ) : null}
          </Box>
        )}
      </Hover>
    )}
  </OpenStarterKitModal>
)




export {
  Title,
  Wrapper,
  Section,
  Logo,
  AppItem,
  SectionContext,
  LearnMore,
  Countdown,
  CallToAction,
  OpenStarterKitModal
}
