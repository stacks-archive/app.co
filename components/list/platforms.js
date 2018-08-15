import React from 'react'
import { Type } from '@components/typography'
import { StyledList } from '@components/list/styled'
import { connect } from 'react-redux'
import {
  selectApps,
  selectBlockchainCategories,
  selectStorageCategories,
  selectAuthenticationCategories
} from '@stores/apps/selectors'
import { ListContainer } from '@components/list/index'

import { Flex, Box } from 'rebass'
import Link from 'next/link'
import { slugify } from '@common'
import { renderPlatformIcon } from '@components/svg/platforms'

const mapStateToProps = (state) => ({
  apps: selectApps(state),
  platforms: selectBlockchainCategories(state),
  storage: selectStorageCategories(state),
  auth: selectAuthenticationCategories(state)
})

const PlatformItem = ({ platform, link, image, width, icon: Icon, ...rest }) => (
  <Link href={link.href} as={link.as} prefetch>
    <StyledList.ItemLink width={width} link href={link.as} {...rest}>
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

const mergeDedupe = (arr) => [...new Set([].concat(...arr))]

const PlatformsList = connect(mapStateToProps)(({ apps, limit, platforms, auth, storage, noAll, ...rest }) => {
  const all = mergeDedupe([platforms, auth, storage])
  const items = limit === 0 ? all : ['Blockstack', 'Ethereum', 'Steem', 'IPFS', 'ZeroNet']
  const modifiedArray = items.map((platform) => {
    const slugified = slugify(platform)
    return {
      platform,
      slugified,
      slug: slugified,
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
    slug: 'all-platforms',
    link: {
      href: '/platforms',
      as: '/platforms'
    }
  }
  const array = !noAll ? [...modifiedArray, lastItem] : modifiedArray

  return (
    <>
      <ListContainer items={array} item={PlatformItem} limit={limit} width={[1, 1 / 2]} mx={[2, 0]} {...rest} />
    </>
  )
})

export { PlatformsList }
