import React from 'react';

import { colorHexFromString } from '@utils';
import { StyledAppList } from '@components/app-list';

const AppIcon = ({ app }) => {
  if (app.imgixImageUrl || app.imageUrl) {
    return <StyledAppList.IconImage src={app.imgixImageUrl || app.imageUrl} />;
  }
  const bgColor = colorHexFromString(app.name);
  return (
    <StyledAppList.DefaultIcon bgColor={bgColor}>
      {app.name.substring(0, 1)}
    </StyledAppList.DefaultIcon>
  );
};

export default AppIcon;
