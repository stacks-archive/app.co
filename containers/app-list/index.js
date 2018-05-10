import React from 'react';
import { StyledAppList } from '@components/app-list';
import { Button } from '@components/button';

const AppList = ({ apps }) => {
  const renderRows = (apps) => {
    var rank = 1
    return apps.map((app) => (
      <StyledAppList.Row key={app.id}>
        <StyledAppList.Rank>{rank++}</StyledAppList.Rank>
        <StyledAppList.Icon>      
          <StyledAppList.IconImage src='https://blockstack.org/images/logos/app-icon-stealthy-256x256.png' />
        </StyledAppList.Icon>
        <StyledAppList.Name>{app.name}</StyledAppList.Name>
        <StyledAppList.Description>Placeholder for description</StyledAppList.Description>
        <StyledAppList.Category>
          <StyledAppList.CategoryTag>
            {app.category}
          </StyledAppList.CategoryTag>
        </StyledAppList.Category>
      </StyledAppList.Row>
    ))
  }

  if (apps) {
    return (
      <StyledAppList>
        <tbody>
          {renderRows(apps)}
        </tbody>
      </StyledAppList>
    );
  } else {
    return null;
  }
};

export { AppList };
