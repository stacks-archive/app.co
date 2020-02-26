import React from 'react';
import { ResultItemGroup } from '@atlaskit/quick-search';
import debounce from 'lodash/debounce';
import { connect } from 'react-redux';
import { Focus } from 'react-powerplug';
import SearchIcon from 'mdi-react/SearchIcon';
import CloseIcon from 'mdi-react/CloseIcon';

import { StyledSearchBar } from '@components/search/styled';
import { AppItem } from '@components/list/apps';
import { selectApps } from '@stores/apps/selectors';
import { trackEvent } from '@utils';

const mapStateToProps = state => ({
  apps: selectApps(state),
});

function contains(string, query) {
  return string
    ? string.toLowerCase().indexOf(query.toLowerCase()) > -1
    : false;
}

const searchApps = (query, apps) =>
  apps.filter(
    app =>
      contains(app.name, query) ||
      contains(app.blockchain, query) ||
      contains(app.storageNetwork, query) ||
      contains(app.authentication, query) ||
      contains(app.category, query)
  );

class SearchBarClass extends React.Component {
  constructor(props) {
    super(props);
    this.search = debounce(this.search, 400);
  }

  state = {
    query: '',
    oldQuery: '',
    results: [],
    searchActive: false,
    isLoading: false,
  };

  search = query => {
    const emptyQuery = query === '';
    let results = searchApps(query, this.props.apps);
    if (emptyQuery) {
      document.body.classList.remove('no-scroll');
      results = [];
    } else {
      document.body.classList.add('no-scroll');
    }
    setTimeout(() => {
      trackEvent('search_query', { query });
      this.setState({
        results,
        isLoading: false,
      });
    }, 300);
  };
  handleSearch = query => {
    const isLoading = query !== this.state.oldQuery;
    this.setState({
      query,
      isLoading,
      results: [],
      searchActive: true,
      oldQuery: '',
    });

    this.search(query);
  };

  clearSearch = () => {
    this.setState({
      oldQuery: this.state.query,
      results: [],
      searchActive: false,
      query: '',
    });
    document.body.classList.remove('no-scroll');
  };

  handleKeyDown = event => (event.key === 'Escape' ? this.clearSearch() : null);

  visibleQuery = () =>
    this.state.query.length === 0 ? this.state.oldQuery : this.state.query;

  resultsTitle() {
    if (this.state.isLoading) {
      return `Loading results for "${this.state.query}"`;
    } else if (this.state.results.length === 0) {
      return `No results for "${this.state.query}"`;
    } else {
      return `${this.state.results.length} App${
        this.state.results.length === 1 ? '' : 's'
      }`;
    }
  }

  render() {
    return (
      <Focus>
        {({ focused, bind }) => (
          <StyledSearchBar
            apps={this.props.apps}
            pl={3}
            focused={(focused || this.state.searchActive).toString()}
          >
            <StyledSearchBar.Icon
              pr={1}
              focused={(focused || this.state.searchActive).toString()}
            >
              <SearchIcon color="#C1C3CC" size={20} />
            </StyledSearchBar.Icon>
            <StyledSearchBar.Section grow>
              <StyledSearchBar.CloseIcon
                style={{
                  display: this.state.query.length > 0 ? 'block' : 'none',
                }}
                onClick={() => this.clearSearch()}
                title="Clear Search"
              >
                <CloseIcon color="currentColor" />
              </StyledSearchBar.CloseIcon>
              <StyledSearchBar.Input
                placeholder="Search for apps..."
                onKeyUp={event => this.handleKeyDown(event)}
                value={this.state.query}
                onFocus={() => {
                  this.handleSearch(this.state.oldQuery);
                  bind.onFocus();
                }}
                onChange={({ target }) => this.handleSearch(target.value)}
                onBlur={() => bind.onBlur()}
              />
              <StyledSearchBar.Results show={this.state.query.length > 0}>
                <StyledSearchBar.Results.Wrapper>
                  <>
                    <ResultItemGroup title={this.resultsTitle()}>
                      {this.state.results.map(app => (
                        <AppItem {...app} key={app.name} noBorder />
                      ))}
                    </ResultItemGroup>
                  </>
                </StyledSearchBar.Results.Wrapper>
              </StyledSearchBar.Results>
            </StyledSearchBar.Section>
            {this.state.searchActive && this.state.query !== '' ? (
              <StyledSearchBar.Backdrop onClick={() => this.clearSearch()} />
            ) : null}
          </StyledSearchBar>
        )}
      </Focus>
    );
  }
}

const SearchBar = connect(mapStateToProps)(SearchBarClass);

export { SearchBar };
