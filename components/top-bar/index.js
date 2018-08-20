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
import { Box } from '@components/box'
import { Navigation } from '@components/navigation'

const handleBodyScroll = (on) =>
  on ? document.body.classList.remove('no-scroll') : document.body.classList.add('no-scroll')

const TopBar = ({ isErrorPage, ...props }) => (
  <Headroom>
    <StyledTopBar {...props}>
      <StyledTopBar.Wrapper wrap>
        <StyledTopBar.Section grow>
          {isErrorPage ? (
            <a href="/">
              <AppIcon />
            </a>
          ) : (
            <Link href="/">
              <a href="/">
                <AppIcon />
              </a>
            </Link>
          )}
          <SearchBar transparent />
        </StyledTopBar.Section>
        <StyledTopBar.Section>
          <Navigation display={['none', 'flex']} />
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
