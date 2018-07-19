import React from 'react'
import { StyledTopBar } from '@components/top-bar/styled'
import { AppIcon } from '@components/logos'
import { SearchBar } from '@components/search'

const TopBar = (props) => {
  return (
    <StyledTopBar>
      <StyledTopBar.Wrapper wrap>
        <StyledTopBar.Section>
          <AppIcon />
          <SearchBar />
        </StyledTopBar.Section>
        <StyledTopBar.Section>
          <a href="#">Learn more</a>
          <a href="#">Get Updates</a>
          <a href="#">Submit your dApp</a>
        </StyledTopBar.Section>
      </StyledTopBar.Wrapper>
    </StyledTopBar>
  )
}

export { TopBar }
