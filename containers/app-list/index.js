import React from 'react';
import _ from 'lodash';

import { StyledAppList } from '@components/app-list';
import { Button } from '@components/button';
import { LinkButton } from '@components/link-button';
import { DropdownButton } from '@containers/dropdown-button';

const SORT_METHOD = {
  TWEETS: { value: 0, name: 'Tweets / Week', description: '' },
};

const getTwitterMentions = (app) => {
  const [ranking] = app.Rankings;
  if (ranking) {
    return ranking.twitterMentions || 0;
  }
  return 0;
};

class AppList extends React.Component {
  constructor(props) {
    super(props);
    const sortedApps = _.sortBy(props.apps, (app) => -getTwitterMentions(app));
    this.state = {
      showCount: props.show,
      showAll: false,
      sortMethod: SORT_METHOD.TWEETS,
      sortedApps,
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

  render() {
    const { showCount, showAll, sortMethod, sortedApps } = this.state;

    const renderNetworkTags = (data) => {
      const tags = [];

      if (data.authentication) {
        tags.push(data.authentication);
      }

      if (data.blockchain) {
        tags.push(data.blockchain);
      }

      if (data.storageNetwork) {
        tags.push(data.storageNetwork);
      }

      const tagSet = Array.from(new Set(tags));

      return (
        <StyledAppList.TagGroup>
          {tagSet.map((tag) => <StyledAppList.Tag>{tag}</StyledAppList.Tag>)}
        </StyledAppList.TagGroup>
      );
    };

    const appImage = (app) => {
      if (app.imageUrl) {
        return app.imageUrl;
      }
      return 'https://blockstack.org/images/logos/app-icon-stealthy-256x256.png';
    };

    const renderRows = () => {
      const visibleApps = showAll ? sortedApps : sortedApps.slice(0, showCount);
      return visibleApps.map((app, index) => (
        <StyledAppList.Row key={app.id}>
          <StyledAppList.Rank>{index + 1}</StyledAppList.Rank>
          <StyledAppList.Icon>
            <StyledAppList.IconImage src={appImage(app)} />
          </StyledAppList.Icon>
          <StyledAppList.Name>
            <StyledAppList.NameLink href={app.website} target="_blank">
              {app.name}
            </StyledAppList.NameLink>
          </StyledAppList.Name>
          <StyledAppList.Column>{app.description}</StyledAppList.Column>
          <StyledAppList.Column align="right">
            <StyledAppList.TagGroup>
              <StyledAppList.Tag>{app.category}</StyledAppList.Tag>
            </StyledAppList.TagGroup>
          </StyledAppList.Column>
          <StyledAppList.Column align="right">{renderNetworkTags(app)}</StyledAppList.Column>
          <StyledAppList.Column align="right">{getTwitterMentions(app)}</StyledAppList.Column>
        </StyledAppList.Row>
      ));
    };

    if (sortedApps) {
      return (
        <StyledAppList>
          <StyledAppList.Table>
            <StyledAppList.Header>
              <StyledAppList.HeaderRow>
                <StyledAppList.HeaderItem colSpan="3" align="left">
                  <DropdownButton onClick={() => this.showSortDropdown()}>{sortMethod.name}</DropdownButton>
                </StyledAppList.HeaderItem>
                <StyledAppList.HeaderItem align="left">Add Filters</StyledAppList.HeaderItem>
                <StyledAppList.HeaderItem align="right">Category</StyledAppList.HeaderItem>
                <StyledAppList.HeaderItem align="right">Protocols</StyledAppList.HeaderItem>
                <StyledAppList.HeaderItem align="right">Tweets</StyledAppList.HeaderItem>
              </StyledAppList.HeaderRow>
            </StyledAppList.Header>
            <tbody>
              <StyledAppList.SpacerRow key={0} />
              {renderRows()}
            </tbody>
          </StyledAppList.Table>
          <StyledAppList.Footer>
            <StyledAppList.ExpandButtonWrapper>
              <Button onClick={() => this.showAll()} type="button/primary">
                Next 100
              </Button>
            </StyledAppList.ExpandButtonWrapper>
            {/* <LinkButton onClick={() => this.showAll()}>View All</LinkButton> */}
          </StyledAppList.Footer>
        </StyledAppList>
      );
    }
    return null;
  }
}

export { AppList };
