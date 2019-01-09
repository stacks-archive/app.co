import * as React from 'react'
import { Flex, Type } from 'blockstack-ui'
import { OutlinedLogo } from '@components/mining/svg'
import { CallToAction, Countdown, Wrapper } from '../shared'

const Header = ({ showOnMobile, link, ...rest }) => {
  return (
    <Flex
      height={90}
      bg="blue.dark"
      alignItems="center"
      position="fixed"
      top={0}
      left={0}
      width={1}
      zIndex={999}
      display={showOnMobile ? 'flex' : ['none', 'none', 'flex']}
      {...rest}
    >
      <Wrapper justifyContent="space-between" alignItems="center">
        <Flex alignItems="center">
          <Flex alignItems="center" flexGrow={1}>
            <Flex pr={2} size={32} color="blue.accent">
              <OutlinedLogo />
            </Flex>
            <Type
              style={{ textDecoration: 'none' }}
              is={link ? 'a' : undefined}
              href={link ? '/mining' : undefined}
              color="white !important"
              pr={2}
            >
              App Mining:
            </Type>
          </Flex>
          <Type
            display="inline-flex"
            flexDirection={['column', 'column', 'column', 'row']}
            color="white"
            pl={[2, 2, 2, 0]}
            flexGrow={1}
          >
            Next ranking starts in <Countdown pl={[0, 0, 0, 2]} />
          </Type>
        </Flex>
        <Flex display={['none', 'none', 'flex']}>
          <CallToAction
            buttonProps={{
              py: 4,
              px: [4, 4, 4, 6],
              fontSize: [2]
            }}
            hideTimer
          />
        </Flex>
      </Wrapper>
    </Flex>
  )
}
export { Header }
