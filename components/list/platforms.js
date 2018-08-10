import React from 'react'
import { Type } from '@components/typography'
import { StyledList } from '@components/list/styled'
import { connect } from 'react-redux'
import { selectApps, selectBlockchainCategories } from '@stores/apps/selectors'
import { ListContainer } from '@components/list/index'

import { Flex, Box } from 'rebass'
import Link from 'next/link'
import { slugify } from '@common'
import { renderPlatformIcon } from '@components/svg/platforms'

const mapStateToProps = (state) => ({
  apps: selectApps(state),
  platforms: selectBlockchainCategories(state)
})

const PlatformItem = ({ platform, link, image, width, icon: Icon, ...rest }) => (
  <Link href={link.as}>
    <StyledList.ItemLink width={width} link href={link.as}>
      <Flex style={{ flexGrow: 1, maxWidth: '100%' }} pr={2}>
        {Icon ? (
          <Box pr={2}>
            <Icon color="currentColor" />
          </Box>
        ) : null}
        <Type.strong>{platform}</Type.strong>
      </Flex>
    </StyledList.ItemLink>
  </Link>
)

const PlatformsList = connect(mapStateToProps)(({ apps, ...rest }) => {
  const platforms = ['Blockstack', 'Ethereum', 'Steem', 'IPFS', 'ZeroNet']
  const modifiedArray = platforms.slice(0, 5).map((platform) => {
    const slugified = slugify(platform)
    return {
      platform,
      slugified,
      icon: renderPlatformIcon(slugified),
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
      <ListContainer items={categoriesArray} item={PlatformItem} width={[1, 1 / 2]} {...rest} />
    </>
  )
})

export { PlatformsList }
