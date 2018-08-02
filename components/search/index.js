import React from 'react'
import { ResultItemGroup } from '@atlaskit/quick-search'
import { StyledSearchBar } from '@components/search/styled'
import { SearchIcon, CloseIcon } from 'mdi-react'
import { AppItem } from '@components/list/apps'
import { connect } from 'react-redux'
import { selectApps, selectAppCategoriesArray } from '@stores/apps/selectors'
import debounce from 'lodash/debounce'

import { Trail } from 'react-spring'

const mapStateToProps = (state) => ({
  apps: selectApps(state)
})

function contains(string, query) {
  return string ? string.toLowerCase().indexOf(query.toLowerCase()) > -1 : false
}

const searchApps = (query, apps) =>
  apps.filter(
    (app) =>
      contains(app.name, query) ||
      contains(app.blockchain, query) ||
      contains(app.storageNetwork, query) ||
      contains(app.authentication, query) ||
      contains(app.category, query)
  )

class SearchBarClass extends React.Component {
  constructor(props) {
    super(props)
    this.search = debounce(this.search, 400)
  }
  state = {
    query: '',
    oldQuery: '',
    results: []
  }

  search = (query) => {
    let results = searchApps(query, this.props.apps)
    if (query === '') {
      results = []
    }
    setTimeout(() => {
      this.setState({
        results
      })
    }, 300)
  }
  handleSearch = (query) => {
    this.setState({
      query
    })
    this.search(query)
  }

  clearSearch = () =>{
    this.setState({
      results: [],
      oldQuery: this.state.query,
      query: ''
    })
  }

  handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      this.clearSearch()
    }
  }

  resultsTitle() {
    if (this.state.results.length === 0) {
      return `No results for "${this.state.query}"`
    } else {
      return `${this.state.results.length} App${this.state.results.length === 1 ? '' : 's'}`
    }
  } 

  render() {
    return (
      <StyledSearchBar {...this.props} pl={3}>
        <StyledSearchBar.Icon pr={1}>
          <SearchIcon color="currentColor" />
        </StyledSearchBar.Icon>
        <StyledSearchBar.Section grow>
          <StyledSearchBar.CloseIcon 
            style={{display: this.state.query.length > 0 ? 'block' : 'none'}}
            onClick={() => this.clearSearch()}
          >
            <CloseIcon color="#fff" />
          </StyledSearchBar.CloseIcon>
          <StyledSearchBar.Input 
            placeholder="Search for apps..."
            onKeyUp={(event) => this.handleKeyDown(event)}
            value={this.state.query}
            onFocus={() => this.handleSearch(this.state.oldQuery)}
            onChange={({target}) => this.handleSearch(target.value)}
          />
          <StyledSearchBar.Results show={this.state.query.length > 0}>
            <StyledSearchBar.Results.Wrapper>
              <>
                <ResultItemGroup title={this.resultsTitle()}>
                  {this.state.results.map((app) => <AppItem {...app} key={app.name} noBorder />)}
                </ResultItemGroup>
              </>
            </StyledSearchBar.Results.Wrapper>
          </StyledSearchBar.Results>
        </StyledSearchBar.Section>
        {this.state.results.length > 0 ? <StyledSearchBar.Backdrop onClick={() => this.clearSearch()} /> : null}
      </StyledSearchBar>
    )
  }
}

const SearchBar = connect(mapStateToProps)(SearchBarClass)

export { SearchBar }
