import React from 'react'
import { gradientFromString } from '@common/styles'
import { StyledAppIcon } from '@components/app-icon/styled'
import { Box } from '@components/mining'

const AppIcon = ({ src, alt, size = 60, ...rest }) => (
  <StyledAppIcon size={size} gradient={gradientFromString(alt, 0, 250)} showGradient={!src} {...rest}>
    {src ? (
      <Box>
        <StyledAppIcon.Image src={src} alt={alt} />
      </Box>
    ) : null}
  </StyledAppIcon>
)

export { AppIcon }
