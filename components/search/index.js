import React from 'react'
import PropTypes from 'prop-types'
import { StyledSearchBar } from '@components/search/styled'
import { SearchIcon } from 'mdi-react'

const SearchBar = (props) => (
  <StyledSearchBar {...props} pl={3}>
    <StyledSearchBar.Icon>
      <SearchIcon color="currentColor" />
    </StyledSearchBar.Icon>
    <StyledSearchBar.Section>Discover great dApps...</StyledSearchBar.Section>
  </StyledSearchBar>
)

export { SearchBar }
