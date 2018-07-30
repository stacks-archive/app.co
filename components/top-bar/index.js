import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Headroom from 'react-headroom'
import Link from 'next/link'

import { StyledTopBar } from '@components/top-bar/styled'
import { AppIcon } from '@components/logos'
import { SearchBar } from '@components/search'
import { selectIsLoading } from '@stores/router/selectors'
import RouterStore from '@stores/router'

const Navigation = (props) => (
  <StyledTopBar.Navigation mobile>
    <Link href="/learn-more" prefetch>
      <a>Learn more</a>
    </Link>
    <a href="/learn-more">Get Updates</a>
    <Link href="/submit">
      <a href="/submit">Submit your dApp</a>
    </Link>
  </StyledTopBar.Navigation>
)

class TopBarComponent extends React.Component {
  render() {
    return (
      <Headroom>
        <StyledTopBar>
          <StyledTopBar.Wrapper wrap>
            <StyledTopBar.Section grow>
              <Link href="/" prefetch>
                <a href="/">
                  <AppIcon />
                </a>
              </Link>
              <SearchBar transparent />
            </StyledTopBar.Section>
            <StyledTopBar.Section>
              {/* <MenuIcon color="currentColor" size={24} /> */}
              <Navigation />
            </StyledTopBar.Section>
          </StyledTopBar.Wrapper>
        </StyledTopBar>
      </Headroom>
    )
  }
}

const mapStateToProps = (state) => ({
  isLoading: selectIsLoading(state)
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, RouterStore.actions), dispatch)
}

const TopBar = connect(mapStateToProps, mapDispatchToProps)(TopBarComponent)

export { TopBar }
