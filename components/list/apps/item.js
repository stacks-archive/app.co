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

const TableItem = (props) => <StyledList.TableItem width={[0, 0.5 / 4]} style={{ textAlign: 'left', overflow: 'hidden' }} {...props} />

const appTag = (tag) => {
  if (!tag) {
    return ''
  }
  const url = `/platforms/${slugify(tag)}`
  return (
    <TagLink href={url}>{tag.toLowerCase()}</TagLink>
  )
}

const AppItem = ({ imageUrl, blockchain, name, authentication, description, storageNetwork, dispatch, single, rank, ...rest }) => {
  const handleClick = (id, event) => {
    const href = event.target.getAttribute('href')
    const isClickingTag = href && href.indexOf('/platforms') === 0
    const altKey = event.metaKey || event.altKey || event.ctrlKey
    if (!isClickingTag && !altKey) {
      dispatch(doSelectApp(id))
      if (typeof window !== 'undefined') {
        window.history.pushState({}, name, `/app/${rest.Slugs[0].value}`)
      }
      event.preventDefault()
    }
  }
  return (
    <StyledList.ItemLink 
      {...rest} 
      link
      href={`/app/${rest.Slugs[0].value}`}
      onClick={(evt) => handleClick(rest.id, evt)} 
      key={rest.id}
    >
      <Flex width={1} alignItems="center">
        <Flex width={single ? [1, 0.5] : [1]}>
          {single ? (
            <Flex mr={3} alignItems="center" justifyContent="center" style={{ opacity: 0.45, overflow: 'hidden' }} width={[0, 0.5/4]}>
              <Type.p>{rank}</Type.p>
            </Flex>
          ) : null}
          <AppIcon src={imageUrl} alt={name} size={48} />
          <Box style={{ flexGrow: 1, maxWidth: '75%' }} px={3}>
            <Type.h4 fontSize={16} mt='4px'>{name}</Type.h4>
            <Type.p p={0} my={2} fontSize={12}>
              {description}
            </Type.p>
          </Box>
        </Flex>
        {single ? (
          <>
            <TableItem>{appTag(authentication)}</TableItem>
            <TableItem>{appTag(storageNetwork)}</TableItem>
            <TableItem>{appTag(blockchain)}</TableItem>
            <TableItem style={{ textAlign: 'right', fontSize: '13px', fontWeight: 700 }} width={[0, 0.5 / 4]}>{getTwitterMentions(rest)}</TableItem>
          </>
        ) : null}
      </Flex>
    </StyledList.ItemLink>
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
