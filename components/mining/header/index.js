import * as React from 'react'
import { Flex, Type } from 'blockstack-ui'
import { CallToAction, Countdown, Wrapper } from '@pages/mining/shared'
import StickyHeadroom from '@integreat-app/react-sticky-headroom'
import { Logo } from '@components/mining/svg'

const Header = ({ ...rest }) => {
  return (
    <StickyHeadroom scrollHeight={90}>
      <Flex
        height={90}
        bg="blue.dark"
        alignItems="center"
        position="fixed"
        top={0}
        left={0}
        width={1}
        zIndex={20}
        display={['none', 'none', 'flex']}
        {...rest}
      >
        <Wrapper justifyContent="space-between" alignItems="center">
          <Flex alignItems="center">
            <Flex alignItems="center">
              <Flex pr={2} color="blue">
                <Logo />
              </Flex>
              <Type color="white" pr={1}>
                App Mining:{' '}
              </Type>
            </Flex>
            <Type color="white">
              Next ranking starts in <Countdown />
            </Type>
          </Flex>
          <Flex>
            <CallToAction
              buttonProps={{
                py: 4,
                px: [4, 4, 4, 6],
                fontSize: [2, 2, 2, 3]
              }}
              hideTimer
            />
          </Flex>
        </Wrapper>
      </Flex>
    </StickyHeadroom>
  )
}
export {Header}
