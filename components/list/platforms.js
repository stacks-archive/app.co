import React from 'react'
import { Type } from '@components/typography'
import { StyledList } from '@components/list/styled'
import { connect } from 'react-redux'
import { selectApps, selectBlockchainCategories } from '@stores/apps/selectors'
import { ListContainer } from '@components/list/index'
import { Box } from '@components/box'
import Link from 'next/link'
import { slugify } from '@common'

const mapStateToProps = (state) => ({
  apps: selectApps(state),
  platforms: selectBlockchainCategories(state)
})

const PlatformItem = ({ platform, link, image, width }) => (
  <StyledList.Item width={width} link>
    <Link {...link} prefetch>
      <a style={{width: '100%'}} href={link.as}>
        <Box style={{ flexGrow: 1 }} px={0}>
          {image && <StyledList.Image src={image} alt={platform}/>}
          <Type.strong>{platform}</Type.strong>
        </Box>
      </a>
    </Link>
  </StyledList.Item>
)

const PlatformsList = connect(mapStateToProps)(({ apps, ...rest }) => {
  const platforms = [
    'Blockstack',
    'Ethereum',
    'Steem',
    'IPFS',
    'ZeroNet'
  ]
  const modifiedArray = platforms.slice(0, 5).map((platform) => {
    const slugified = slugify(platform)
    return {
      platform,
      slugified,
      image: `/static/images/platforms/${slugified}/${slugified}@3x.png`,
      link: {
        as: `/platforms/${slugified}`,
        href: {
          pathname: `/platforms`,
          query: {
            platform: slugified
          }
        }
      }
    }
  })
  const lastItem = {
    platform: 'All Platforms',
    link: {
      href: '/platforms',
      as: '/platforms'
    }
  }
  const categoriesArray = [...modifiedArray, lastItem]

  return (
    <>
      <ListContainer items={categoriesArray} item={PlatformItem} width={[1, 1/2]} {...rest} />
    </>
  )
})

export { PlatformsList }
