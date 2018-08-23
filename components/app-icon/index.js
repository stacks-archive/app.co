import React from 'react'
import { gradientFromString } from '@common/styles'
import { StyledAppIcon } from '@components/app-icon/styled'
import { Box } from '@components/mining'

const getImageUrl = (src, size) => {
  if (src.indexOf('imgix') !== -1) {
    return `${src}?fit=clip&h=${size}&w=${size}`
  }
  return src
}

const AppIcon = ({ src, alt, size = 60, ...rest }) => (
  <StyledAppIcon size={size} gradient={gradientFromString(alt, 0, 250)} showGradient={!src} {...rest}>
    {src ? (
      <Box>
        <StyledAppIcon.Image src={getImageUrl(src, size * 3)} alt={alt} />
      </Box>
    ) : null}
  </StyledAppIcon>
)

export { AppIcon }
