import React from 'react';
import _ from 'lodash';

import { StyledAppList } from '@components/app-list';
import { Button } from '@components/button';
import { LinkButton } from '@components/link-button';

class AppList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showCount: props.show,
      showAll: false,
    };
  }

  showAll() {
    this.setState({
      showAll: true,
    });
  }

  render() {
    const { apps } = this.props;
    const { showCount, showAll } = this.state;

    const renderRows = (apps, showCount, showAll) => {
      let rank = 1;
      const visibleApps = showAll ? apps : apps.slice(0, showCount);
      return visibleApps.map((app) => (
        <StyledAppList.Row key={app.id}>
          <StyledAppList.Rank>{rank++}</StyledAppList.Rank>
          <StyledAppList.Icon>
            <StyledAppList.IconImage src="https://blockstack.org/images/logos/app-icon-stealthy-256x256.png" />
          </StyledAppList.Icon>
          <StyledAppList.Name>{app.name}</StyledAppList.Name>
          <StyledAppList.Description>Placeholder for description</StyledAppList.Description>
          <StyledAppList.Category>
            <StyledAppList.CategoryTag>{app.category}</StyledAppList.CategoryTag>
          </StyledAppList.Category>
        </StyledAppList.Row>
      ));
    };

    if (apps) {
      return (
        <StyledAppList>
          <StyledAppList.Table>
            <tbody>{renderRows(apps, showCount, showAll)}</tbody>
          </StyledAppList.Table>
          <StyledAppList.Footer>
            <StyledAppList.ExpandButtonWrapper>
              <Button onClick={() => {}} type="button/primary">
                Next 100
              </Button>
            </StyledAppList.ExpandButtonWrapper>
            <LinkButton onClick={() => this.showAll()}>View All</LinkButton>
          </StyledAppList.Footer>
        </StyledAppList>
      );
    }
    return null;
  }
}

export { AppList };
