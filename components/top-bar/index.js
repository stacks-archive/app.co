import React from 'react'
import Headroom from 'react-headroom'
import Link from 'next/link'
import { StyledTopBar } from '@components/top-bar/styled'
import { AppIcon } from '@components/logos'
import { SearchBar } from '@components/search'
import GetUpdatesModal from '@containers/modals/get-updates'
import MenuIcon from 'mdi-react/MenuIcon'
import CloseIcon from 'mdi-react/CloseIcon'
import { Toggle } from 'react-powerplug'
import { Box } from 'blockstack-ui'
import { Navigation } from '@components/navigation'

const handleBodyScroll = (on) =>
  on ? document.body.classList.remove('no-scroll') : document.body.classList.add('no-scroll')

const TopBar = ({ isErrorPage, admin, wrap, ...props }) => (
  <Headroom>
    <StyledTopBar {...props}>
      <StyledTopBar.Wrapper wrap={wrap}>
        <StyledTopBar.Section grow>
          {isErrorPage ? (
            <a href="/">
              <Box size="34px">
                <AppIcon />
              </Box>
            </a>
          ) : (
            <Link href="/">
              <a href="/">
                <Box size="34px">
                  <AppIcon />
                </Box>
              </a>
            </Link>
          )}
          <SearchBar transparent />
        </StyledTopBar.Section>
        <StyledTopBar.Section>
          <Navigation display={['none', 'flex']} isErrorPage={isErrorPage} admin={admin} />
          <Box display={['block', 'none']}>
            <Toggle>
              {({ on, toggle }) => (
                <>
                  <Box
                    onClick={() => {
                      toggle()
                      handleBodyScroll(on)
                    }}
                  >
                    {on ? <CloseIcon color="currentColor" /> : <MenuIcon color="currentColor" />}
                  </Box>
                  <Navigation
                    mobile
                    admin={admin}
                    isErrorPage={isErrorPage}
                    on={on}
                    handleClick={() => {
                      toggle()
                      handleBodyScroll(on)
                    }}
                    display={[on ? 'flex' : 'none', 'none']}
                  />
                </>
              )}
            </Toggle>
          </Box>
        </StyledTopBar.Section>
      </StyledTopBar.Wrapper>
    </StyledTopBar>
    <GetUpdatesModal />
  </Headroom>
)
export { TopBar }
