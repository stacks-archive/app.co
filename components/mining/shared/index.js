import * as React from 'react'
import { Flex, Box, Type, OpenModal } from 'blockstack-ui'
import { Hover } from 'react-powerplug'
import { ArrowIcon, OutlinedLogo } from '@components/mining/svg'
import { StarterKitModal } from '@pages/mining/starter-kit-modal'
import Counter from 'react-countdown-now'

const SectionContext = React.createContext({})

const OpenStarterKitModal = ({ ...rest }) => <OpenModal component={StarterKitModal} {...rest} />

const TimeLabel = ({ ...rest }) => <Type pl="1px" fontWeight={500} opacity={0.7} {...rest} />

const Renderer = ({ hours, minutes, days, seconds, ...rest }) => (
  <Flex flexShrink={0} style={{ whiteSpace: 'nowrap' }} {...rest}>
    <Type fontWeight="bolder">
      {days}
      <TimeLabel>D</TimeLabel>
    </Type>
    &nbsp;:&nbsp;
    <Type fontWeight="bolder">
      {hours}
      <TimeLabel>H</TimeLabel>
    </Type>
    &nbsp;:&nbsp;
    <Type fontWeight="bolder">
      {minutes}
      <TimeLabel>M</TimeLabel>
    </Type>
    &nbsp;:&nbsp;
    <Type fontWeight="bolder">
      {seconds}
      <TimeLabel>S</TimeLabel>
    </Type>
  </Flex>
)

const Countdown = ({ ...rest }) => {
  const nextDate = new Date(2019, 0, 4, 23, 59)
  return <Counter renderer={(props) => <Renderer {...props} {...rest} />} date={nextDate} />
}

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
      <Box size={32} color="blue.accent" mr={3}>
        <OutlinedLogo />
      </Box>
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

const sizes = [1, 0.95, 0.9, 0.89]
const opacity = [1, 0.46, 0.25, 0.15]
const offset = [0, 21, 40, 60]

const getActiveStyles = (active, index, length) => {
  if (active === index) {
    return {
      zIndex: 20,
      position: 'relative',
      transform: `translateY(${offset[0]}px) scale(${sizes[0]})`,
      opacity: opacity[0]
    }
  }
  const number = index - active < 0 ? length + (index - active) : index - active
  return {
    position: 'absolute',
    zIndex: length - index,
    top: '0px',
    transform: `translateY(${offset[number]}px) scale(${sizes[number]})`,
    left: 0,
    opacity: opacity[number]
  }
}

const AppItem = ({ app, active, index, length, ...rest }) => (
  <Flex
    alignItems="center"
    p={5}
    bg="white"
    width={1}
    borderRadius={4}
    boxShadow="card"
    {...rest}
    {...getActiveStyles(active, index, length)}
    style={{
      transition: '0.5s all ease-in-out'
    }}
  >
    <Box
      size={[40, 60]}
      flexShrink={0}
      backgroundImage={`url(${app.imgixImageUrl})`}
      backgroundSize="cover"
      bg="white"
      borderRadius={[10, 16]}
      boxShadow="card"
      style={{
        transition: '0.5s all ease-in-out'
      }}
      opacity={index !== active ? 0 : 1}
    />
    <Box fontSize={3} pl={4} color="blue.dark">
      <Type fontWeight={400}>{app.name}</Type> <Type opacity={0.5}>earned</Type>{' '}
      <Type fontWeight={400}>{app.formattedUsdRewards.split('.')[0]}</Type>
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
              fontWeight={400}
              fontSize={[2, 3, 3]}
              {...buttonProps}
              {...bind}
              {...modalBind}
            >
              <Type>Get your App Mining Starter Kit</Type>
            </Flex>

            {!hideTimer ? (
              <Flex bg="#081537" alignItems="center" justifyContent="center" p={5}>
                <Type
                  display="flex"
                  alignItems={['center']}
                  justifyContent={['center']}
                  flexDirection={['column', 'row']}
                  color="white"
                  fontWeight={400}
                  fontSize={2}
                >
                  <Type
                    style={{
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Next ranking starts in
                  </Type>
                  <Type pl={[0, 1]} pt={[2, 0]}>
                    <Countdown />
                  </Type>
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
