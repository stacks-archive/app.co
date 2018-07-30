import React from 'react'
import PropTypes from 'prop-types'
import { Truncate } from 'rebass'
import { Flex } from 'grid-styled'
import { connect } from 'react-redux'

import { Type } from '@components/typography'
import { StyledList } from '@components/list/styled'
import { AppIcon } from '@components/app-icon'
import { Box } from '@components/box'
import { TagLink } from '@components/tag'

import { doSelectApp } from '@stores/apps'
import { slugify } from '@common'
import { getTwitterMentions } from '@utils'

const TableItem = (props) => <Box width={[0, 0.5 / 4]} style={{ textAlign: 'left', overflow: 'hidden' }} {...props} />

const appTag = (tag) => {
  if (!tag) {
    return 'N/A'
  }
  const url = `/platforms/${slugify(tag)}`
  return (
    <TagLink href={url}>{tag.toLowerCase()}</TagLink>
  )
}

const AppItem = ({ imageUrl, blockchain, name, authentication, description, storageNetwork, dispatch, single, rank, ...rest }) => {
  const handleClick = (id) => {
    dispatch(doSelectApp(id))
    if (typeof window !== 'undefined') {
      window.history.pushState({}, name, `/app/${rest.Slugs[0].value}`)
    }
  }
  return (
    <StyledList.Item {...rest} link onClick={() => handleClick(rest.id)} key={rest.id}>
      <Flex width={1} alignItems="center">
        <Flex width={single ? [1, 0.5] : [1]}>
          {single ? (
            <Flex pr={3} alignItems="center" justifyContent="center" style={{ opacity: 0.45 }}>
              <Type.p>{rank}</Type.p>
            </Flex>
          ) : null}
          <AppIcon src={imageUrl} alt={name} size={48} />
          <Box style={{ flexGrow: 1, maxWidth: '85%' }} px={3}>
            <Type.h4 fontSize={16} mt='4px'>{name}</Type.h4>
            <Type.p p={0} my={2} fontSize={12}>
              <Truncate>{description}</Truncate>
            </Type.p>
          </Box>
        </Flex>
        {single ? (
          <>
            <TableItem>{appTag(authentication)}</TableItem>
            <TableItem>{appTag(storageNetwork)}</TableItem>
            <TableItem>{appTag(blockchain)}</TableItem>
            <TableItem style={{ textAlign: 'right', fontSize: '13px', fontWeight: 700 }}>{getTwitterMentions(rest)}</TableItem>
          </>
        ) : null}
      </Flex>
    </StyledList.Item>
  )
}

AppItem.propTypes = {
  imageUrl: PropTypes.string,
  blockchain: PropTypes.string,
  name: PropTypes.string,
  authentication: PropTypes.string,
  description: PropTypes.string,
  storageNetwork: PropTypes.string,
  single: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  rank: PropTypes.number
}

export default connect()(AppItem)
