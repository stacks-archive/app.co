import React from 'react';
import _ from 'lodash';

import { StyledAppList } from '@components/app-list';
import { Button } from '@components/button';
import { LinkButton } from '@components/link-button';
import { DropdownButton } from '@containers/dropdown-button';
import { colorHexFromString } from '@utils';

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
          {tagSet.map((tag) => <StyledAppList.Tag key={tag}>{tag}</StyledAppList.Tag>)}
        </StyledAppList.TagGroup>
      );
    };

    const appImage = (app) => {
      if (app.imageUrl) {
        return <StyledAppList.IconImage src={app.imageUrl} />;
      }
      const bgColor = colorHexFromString(app.name);
      return <StyledAppList.DefaultIcon bgColor={bgColor}>{app.name.substring(0, 1)}</StyledAppList.DefaultIcon>;
    };

    const openApp = (app) => {
      window.open(app.website, '_blank');
    };

    const renderRows = () => {
      const visibleApps = showAll ? sortedApps : sortedApps.slice(0, showCount);
      return visibleApps.map((app, index) => (
        <StyledAppList.Row key={app.id} onClick={() => openApp(app)}>
          <StyledAppList.Rank>{index + 1}</StyledAppList.Rank>
          <StyledAppList.Icon>{appImage(app)}</StyledAppList.Icon>
          <StyledAppList.Name>
            <StyledAppList.NameLink href={app.website} target="_blank">
              {app.name}
            </StyledAppList.NameLink>
          </StyledAppList.Name>
          <StyledAppList.Column smHide={true}>{app.description}</StyledAppList.Column>
          <StyledAppList.Column align="right" smHide={true}>
            <StyledAppList.TagGroup>
              <StyledAppList.Tag>{app.category}</StyledAppList.Tag>
            </StyledAppList.TagGroup>
          </StyledAppList.Column>
          <StyledAppList.Column align="right" smHide={true}>{renderNetworkTags(app)}</StyledAppList.Column>
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
                  Rank
                  {/*<DropdownButton onClick={() => this.showSortDropdown()}>{sortMethod.name}</DropdownButton>*/}
                </StyledAppList.HeaderItem>
                <StyledAppList.HeaderItem align="left" smHide={true}>Description</StyledAppList.HeaderItem>
                <StyledAppList.HeaderItem align="right" smHide={true}>Category</StyledAppList.HeaderItem>
                <StyledAppList.HeaderItem align="right" smHide={true}>Protocols</StyledAppList.HeaderItem>
                <StyledAppList.HeaderItem align="right">Tweets/Week</StyledAppList.HeaderItem>
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
