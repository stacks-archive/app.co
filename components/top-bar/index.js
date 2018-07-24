import React from 'react'
import { StyledTopBar } from '@components/top-bar/styled'
import { AppIcon } from '@components/logos'
import { SearchBar } from '@components/search'
import Headroom from 'react-headroom'
import Link from 'next/link'
import { MenuIcon } from 'mdi-react'

const Navigation = (props) => (
  <StyledTopBar.Navigation mobile>
    <Link href="/learn-more" prefet>
      <a>Learn more</a>
    </Link>
    <a href="#">Get Updates</a>
    <a href="#">Submit your dApp</a>
  </StyledTopBar.Navigation>
)

const TopBar = (props) => {
  return (
    <Headroom>
      <StyledTopBar>
        <StyledTopBar.Wrapper wrap>
          <StyledTopBar.Section grow>
            <AppIcon />
            <SearchBar transparent />
          </StyledTopBar.Section>
          <StyledTopBar.Section>
            {/*<MenuIcon color="currentColor" size={24} />*/}
            <Navigation />
          </StyledTopBar.Section>
        </StyledTopBar.Wrapper>
      </StyledTopBar>
    </Headroom>
  )
}

export { TopBar }
