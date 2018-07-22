import React from 'react'
import { QuickSearch, ObjectResult, ContainerResult, ResultItemGroup } from '@atlaskit/quick-search'
import { StyledSearchBar } from '@components/search/styled'
import { SearchIcon } from 'mdi-react'
import { Input } from '@components/input'
import { connect } from 'react-redux'

import { selectApps, selectAppCategoriesArray } from '@stores/apps/selectors'
let store = {}
const mapStateToProps = (state) => ({
  apps: selectApps(state)
})

function contains(string, query) {
  return string.toLowerCase().indexOf(query.toLowerCase()) > -1
}

const searchApps = (query, apps) => apps.filter((app) => contains(app.name, query))

class SearchBarClass extends React.Component {
  state = {
    isLoading: false,
    query: '',
    results: []
  }
  setQuery(query) {
    store.query = query
    this.setState({
      query
    })
  }
  search = (query) => {
    this.setState({
      isLoading: true
    })
    this.setQuery(query)

    let results = searchApps(query, this.props.apps)
    if (query === '') {
      results = []
    }
    setTimeout(() => {
      this.setState({
        results,
        isLoading: false
      })
    }, 300)
  }

  render() {
    const { transparent, placeholder = 'Search for apps...', ...rest } = this.props
    return (
      <StyledSearchBar {...rest} pl={3}>
        <StyledSearchBar.Icon pr={1}>
          <SearchIcon color="currentColor" />
        </StyledSearchBar.Icon>
        <StyledSearchBar.Section>
          <QuickSearch
            isLoading={this.state.isLoading}
            onSearchInput={({ target }) => {
              this.search(target.value)
            }}
            onSearchSubmit={() => console.log('onSearchSubmit', this.state.query)}
            value={this.state.query}
          >
            {this.state.results.length > 0
              ? this.state.results.map((app) => <div>{app.name}</div>)
              : 'nothing to see here!'}
          </QuickSearch>
        </StyledSearchBar.Section>
      </StyledSearchBar>
    )
  }
}

const SearchBar = connect(mapStateToProps)(SearchBarClass)

export { SearchBar }
