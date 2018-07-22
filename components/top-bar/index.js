import React from 'react'
import { StyledTopBar } from '@components/top-bar/styled'
import { AppIcon } from '@components/logos'
import { SearchBar } from '@components/search'
import Headroom from 'react-headroom'
import { MenuIcon } from 'mdi-react'

const Navigation = (props) => (
  <StyledTopBar.Navigation mobile>
    <a href="#">Learn more</a>
    <a href="#">Get Updates</a>
    <a href="#">Submit your dApp</a>
  </StyledTopBar.Navigation>
)

const TopBar = (props) => {
  return (
    <Headroom>
      <StyledTopBar>
        <StyledTopBar.Wrapper wrap>
          <StyledTopBar.Section>
            <AppIcon />
            <SearchBar transparent />
          </StyledTopBar.Section>
          <StyledTopBar.Section>
            <MenuIcon color="currentColor" size={24} />
          </StyledTopBar.Section>
        </StyledTopBar.Wrapper>
      </StyledTopBar>
    </Headroom>
  )
}

export { TopBar }
