import React from 'react';
import sortBy from 'lodash/sortBy';
import Tooltip from '@atlaskit/tooltip';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Link from 'next/link';
import { StyledAppList } from '@components/app-list';
import { Button } from '@components/button';
import AppIcon from '@containers/app-icon';
import { appRoute, truncate, getTags } from '@utils';
import AppStore from '@stores/apps';
import {
  selectApps,
  selectPlatformFilter,
  selectFilteredApps,
  selectCategoryFilter,
} from '@stores/apps/selectors';

const SORT_METHOD = {
  TWEETS: { value: 0, name: 'Tweets / Week', description: '' },
};

const PLATFORMS = ['Blockstack', 'Ethereum'];

const getTwitterMentions = app => {
  const [ranking] = app.Rankings;
  if (ranking) {
    return ranking.twitterMentions || 0;
  }
  return 0;
};

class AppList extends React.Component {
  constructor(props) {
    super(props);
    const hasFilter = props.platformFilter || props.categoryFilter;
    const apps = hasFilter ? props.filteredApps : props.apps;
    const sortedApps = sortBy(apps, app => -getTwitterMentions(app));
    this.state = {
      showCount: props.show,
      showAll: false,
      sortMethod: SORT_METHOD.TWEETS,
      sortedApps,
      platform: null,
      allApps: sortedApps,
    };
  }

  showAll() {
    this.setState({
      showAll: true,
    });
  }

  showSortDropdown() {
    console.log('show sort');
  }

  selectPlatform(platform) {
    let apps = this.state.allApps;
    apps = _.filter(apps, app => {
      const tags = getTags(app);
      console.log(app.name);
      return tags.indexOf(platform) !== -1;
    });
    this.setState({
      platform,
      sortedApps: apps,
    });
  }

  render() {
    const { showCount, showAll, sortMethod, sortedApps } = this.state;

    const renderNetworkTags = data => {
      const tagSet = getTags(data);

      return (
        <StyledAppList.TagGroup>
          {tagSet.map(tag => (
            <StyledAppList.Tag key={tag}>{tag}</StyledAppList.Tag>
          ))}
        </StyledAppList.TagGroup>
      );
    };

    const platformFilter = (platform, opts) => (
      <StyledAppList.Filter
        key={platform}
        onClick={() => {
          this.selectPlatform(platform);
        }}
        selected={this.state.platform === platform}
      >
        <StyledAppList.FilterImage
          title={platform}
          src={`/static/images/platforms/${opts.image}@3x.png`}
        />
        {platform}
      </StyledAppList.Filter>
    );

    const renderRows = () => {
      const visibleApps = showAll ? sortedApps : sortedApps.slice(0, showCount);
      return visibleApps.map((app, index) => (
        <Link href={appRoute(app)} key={app.id}>
          <StyledAppList.Row key={app.id}>
            <StyledAppList.Rank>{index + 1}</StyledAppList.Rank>
            <StyledAppList.Icon>{<AppIcon app={app} />}</StyledAppList.Icon>
            <StyledAppList.Name>
              <StyledAppList.NameLink href={appRoute(app)}>
                {app.name}
              </StyledAppList.NameLink>
            </StyledAppList.Name>
            <StyledAppList.Column smHide title={app.description}>
              {truncate(app.description, { length: 60 })}
            </StyledAppList.Column>
            <StyledAppList.Column align="right" smHide>
              <StyledAppList.TagGroup>
                <StyledAppList.Tag>{app.category}</StyledAppList.Tag>
              </StyledAppList.TagGroup>
            </StyledAppList.Column>
            <StyledAppList.Column align="right" smHide>
              {renderNetworkTags(app)}
            </StyledAppList.Column>
            <StyledAppList.Column align="right">
              {getTwitterMentions(app)}
            </StyledAppList.Column>
          </StyledAppList.Row>
        </Link>
      ));
    };

    if (sortedApps) {
      return (
        <StyledAppList>
          <StyledAppList.Table>
            <StyledAppList.Header>
              <StyledAppList.HeaderRow>
                <StyledAppList.HeaderItem colSpan="3" align="left">
                  Rank
                  {/* <DropdownButton onClick={() => this.showSortDropdown()}>{sortMethod.name}</DropdownButton> */}
                </StyledAppList.HeaderItem>
                <StyledAppList.HeaderItem align="left" smHide>
                  Description
                </StyledAppList.HeaderItem>
                <StyledAppList.HeaderItem align="right" smHide>
                  Category
                </StyledAppList.HeaderItem>
                <StyledAppList.HeaderItem align="right" smHide>
                  Protocols
                </StyledAppList.HeaderItem>
                <StyledAppList.HeaderItem align="right">
                  <Tooltip content="Click to learn more about our rankings">
                    <StyledAppList.HeaderLink href="/faq#rankings">
                      Tweets/Week
                    </StyledAppList.HeaderLink>
                  </Tooltip>
                </StyledAppList.HeaderItem>
              </StyledAppList.HeaderRow>
            </StyledAppList.Header>
            <tbody>
              <StyledAppList.SpacerRow key={0} />
              {renderRows()}
            </tbody>
          </StyledAppList.Table>
          <StyledAppList.Footer>
            {sortedApps.length > showCount && (
              <StyledAppList.ExpandButtonWrapper>
                <Button onClick={() => this.showAll()} type="button/primary">
                  Show All
                </Button>
              </StyledAppList.ExpandButtonWrapper>
            )}
          </StyledAppList.Footer>
        </StyledAppList>
      );
    }
    return null;
  }
}

const mapStateToProps = state => ({
  apps: selectApps(state),
  platformFilter: selectPlatformFilter(state),
  filteredApps: selectFilteredApps(state),
  categoryFilter: selectCategoryFilter(state),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, AppStore.actions), dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppList);
