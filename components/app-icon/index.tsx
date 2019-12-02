import React, { useState } from 'react';
import { gradientFromString } from '@common/styles';
import { StyledAppIcon, StyledAppIconImage } from '@components/app-icon/styled';
import { Box } from '@components/mining';

const getImageUrl = (src: string, size: number) => {
  if (src.indexOf('imgix') !== -1) {
    return `${src}?fit=clip&h=${size}&w=${size}`;
  }
  return src;
};

interface AppIconProps {
  src: string;
  alt: string;
  size: number;
  [styleProps: string]: any;
}

type AppIcon = React.FC<AppIconProps>;

const AppIcon: AppIcon = ({ src, alt, size = 60, ...rest }) => {
  const [showGradient, setShowGradient] = useState(!src);
  return (
    <StyledAppIcon
      size={size}
      gradient={gradientFromString(alt, 0, 250)}
      showGradient={showGradient}
      {...rest}
    >
      {!showGradient ? (
        <Box>
          <StyledAppIconImage
            src={getImageUrl(src, size * 3)}
            alt={alt}
            onError={() => setShowGradient(true)}
          />
        </Box>
      ) : null}
    </StyledAppIcon>
  );
};

export { AppIcon };
