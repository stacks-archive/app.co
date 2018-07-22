import React from 'react'
import { Type } from '@components/typography'
import { StyledList } from '@components/list/styled'
import { Button } from '@components/button'
import { connect } from 'react-redux'
import { selectApps, selectBlockchainCategories } from '@stores/apps/selectors'
import { ListContainer } from '@components/list/index'
import { Box } from '@components/box'
import { ArrowRightIcon } from 'mdi-react'

const mapStateToProps = (state) => ({
  apps: selectApps(state),
  platforms: selectBlockchainCategories(state)
})

const PlatformItem = ({ platform, ...rest }) => (
  <StyledList.Item {...rest} link>
    <Box style={{ flexGrow: 1 }} px={0}>
      <Type.strong>{platform}</Type.strong>
    </Box>
  </StyledList.Item>
)

const PlatformsList = connect(mapStateToProps)(({ platforms, apps, ...rest }) => {
  const modifiedArray = platforms.slice(0, 5).map((platform) => ({ platform }))
  const lastItem = {
    platform: 'All Platforms'
  }
  const categoriesArray = [...modifiedArray, lastItem]

  return (
    <>
      <ListContainer items={categoriesArray} item={PlatformItem} width={[1 / 2, 1 / 3]} {...rest} />
    </>
  )
})

export { PlatformsList }
