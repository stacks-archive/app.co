import React from 'react'
import { QuickSearch, ObjectResult, ContainerResult, ResultItemGroup } from '@atlaskit/quick-search'
import { StyledSearchBar } from '@components/search/styled'
import { SearchIcon } from 'mdi-react'
import { AppItem } from '@components/list/apps'
import { connect } from 'react-redux'
import { selectApps, selectAppCategoriesArray } from '@stores/apps/selectors'
import debounce from 'lodash/debounce'

let store = {}

const mapStateToProps = (state) => ({
  apps: selectApps(state)
})

function contains(string, query) {
  return string ? string.toLowerCase().indexOf(query.toLowerCase()) > -1 : false
}

const searchApps = (query, apps) =>
  apps.filter(
    (app) => contains(app.name, query) || contains(app.blockchain, query) || contains(app.storageNetwork, query)
  )

class SearchBarClass extends React.Component {
  constructor(props) {
    super(props)
    this.search = debounce(this.search, 200)
  }
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
  handleSearch = (query) => {
    this.setState({
      isLoading: true
    })
    this.search(query)
  }

  render() {
    const { transparent, placeholder = 'Search for apps...', ...rest } = this.props
    return (
      <StyledSearchBar {...rest} pl={3}>
        <StyledSearchBar.Icon pr={1}>
          <SearchIcon color="currentColor" />
        </StyledSearchBar.Icon>
        <StyledSearchBar.Section grow>
          <QuickSearch
            placeholder="Search for apps..."
            isLoading={this.state.isLoading}
            onSearchInput={({ target }) => {
              this.handleSearch(target.value)
            }}
            onSearchSubmit={() => console.log('onSearchSubmit', this.state.query)}
            value={this.state.query}
          >
            <div>
              <StyledSearchBar.Results show={this.state.results.length > 0}>
                <StyledSearchBar.Results.Wrapper>
                  {this.state.results.length > 0 ? (
                    <>
                      <ResultItemGroup title="Apps">
                        {this.state.results.map((app, i) => <AppItem {...app} key={i} noBorder />)}
                      </ResultItemGroup>
                    </>
                  ) : null}{' '}
                </StyledSearchBar.Results.Wrapper>
              </StyledSearchBar.Results>
            </div>
          </QuickSearch>
        </StyledSearchBar.Section>
      </StyledSearchBar>
    )
  }
}

const SearchBar = connect(mapStateToProps)(SearchBarClass)

export { SearchBar }
