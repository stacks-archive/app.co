import React from 'react'
import { Flex, Box, Type, OpenModal } from 'blockstack-ui'
import { CurrencyUsdIcon } from 'mdi-react'
import { Title, Wrapper, Section, Logo, AppItem } from '@pages/mining/shared'
import { ArrowIcon } from '@components/mining/svg'
import { Hover } from 'react-powerplug'
import { StarterKitModal } from '@pages/mining/starter-kit-modal'

const Apps = ({ apps, ...rest }) => (
  <Box position="relative" width={1} {...rest}>
    {apps.map((item, i) => (i < 4 ? <AppItem app={item} key={1 + i} index={1 + i} length={4} /> : null))}
  </Box>
)

const Time = ({ ...rest }) => (
  <>
    <Type fontWeight="bolder">22D</Type> : <Type fontWeight="bolder">11H</Type> : <Type fontWeight="bolder">05M</Type>
  </>
)

const handleSmoothScroll = () => {
  document.querySelector('#learn-more').scrollIntoView({ behavior: 'smooth' })
}

const CallToAction = ({ ...rest }) => (
  <OpenModal component={StarterKitModal}>
    {({ bind: modalBind }) => (
      <Hover>
        {({ hovered, bind }) => (
          <Box transform={hovered ? 'translateY(-5px)' : 'unset'} transition={'0.1s all ease-in-out'} {...rest}>
            <Flex
              bg={hovered ? 'white' : 'blue.accent'}
              alignItems="center"
              justifyContent="center"
              p={5}
              color={hovered ? 'blue' : 'blue.dark'}
              cursor={hovered ? 'pointer' : 'unset'}
              transition="0.1s all ease-in-out"
              {...bind}
              {...modalBind}
            >
              <Type fontWeight={400} fontSize={[3, 4]}>
                Get your App Mining Starter Kit
              </Type>
              <Box pl={2} pt={1}>
                <ArrowIcon strokeWidth={1.5} />
              </Box>
            </Flex>

            <Flex bg="#081537" alignItems="center" justifyContent="center" p={4}>
              <Type color="white" fontWeight={400} fontSize={2}>
                Next ranking starts in <Time />
              </Type>
            </Flex>
          </Box>
        )}
      </Hover>
    )}
  </OpenModal>
)

const SubtitleBTC = ({ ...rest }) => (
  <Flex alignItems={'center'} color={'blue.accent'} {...rest}>
    <Flex
      alignItems={'center'}
      justifyContent={'center'}
      size={48}
      borderColor="blue.accent"
      border={1}
      borderRadius={80}
    >
      <CurrencyUsdIcon />
    </Flex>
    <Type fontFamily={'brand'} pl={4} lineHeight={1.55}>
      The better your app,
      <br />
      the more you earn.
    </Type>
  </Flex>
)

const LearnMore = ({ ...rest }) => (
  <Hover>
    {({ bind, hovered }) => (
      <Flex
        display={['none', 'none', 'flex']}
        position={['absolute']}
        pt={8}
        is="a"
        href="#learn-more"
        pb={8}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        transition="0.08s all ease-in-out"
        bottom={['-180px', '-120px']}
        transform={hovered ? 'translateY(10px)' : 'none'}
        {...bind}
        {...rest}
      >
        <Box pb={5}>
          <Type color={hovered ? 'white' : 'blue.mid'}>Learn how to win</Type>
        </Box>
        <Flex
          color={hovered ? 'blue.accent' : 'blue.mid'}
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

const Hero = ({ apps, ...rest }) => (
  <Section bg="blue.dark" {...rest}>
    <Wrapper>
      <Flex width={[1, 1, 0.5, 0.6]} flexShrink={1} flexDirection="column">
        <Logo pb={7} />
        <Title>Every 30 days we&nbsp;payout $100k to the best apps.</Title>
        <SubtitleBTC pt={7} />
      </Flex>
      <Flex
        pl={[0, 0, 8, 0]}
        alignItems="center"
        justifyContent="center"
        pt={[7, 7, 0, 0]}
        flexGrow={1}
        flexDirection="column"
        position="relative"
      >
        <CallToAction width={1} />
        <Apps apps={apps} mt={7} />
        <LearnMore />
      </Flex>
    </Wrapper>
  </Section>
)

export { Hero }
