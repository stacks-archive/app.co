import React from 'react'
import PropTypes from 'prop-types'
import { Flex } from 'grid-styled'
import { connect } from 'react-redux'

import styled from 'styled-components'
import { Type } from '@components/typography'
import { StyledList } from '@components/list/styled'
import { AppIcon } from '@components/app-icon'
import { Box } from '@components/box'
import { TagLink } from '@components/tag'

import { doSelectApp } from '@stores/apps'
import { slugify } from '@common'
import { getTwitterMentions } from '@utils'

const rowItemSize = 0.5 / 4
const TableItem = (props) => (
  <StyledList.TableItem width={[0, rowItemSize]} style={{ textAlign: 'left', overflow: 'hidden' }} {...props} />
)

const SmallText = styled(Type.span)`
  font-size: 12px !important;
`

const appTag = (tag) => {
  if (!tag) {
    return ''
  }
  const url = `/platforms/${slugify(tag)}`
  const href = {
    pathname: `/platforms`,
    query: {
      platform: slugify(tag)
    }
  }
  return (
    <TagLink href={href} as={url}>
      {tag.toLowerCase()}
    </TagLink>
  )
}

const AppItem = ({
  imageUrl,
  blockchain,
  name,
  authentication,
  description,
  storageNetwork,
  dispatch,
  single,
  rank,
  ...rest
}) => {
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
    <StyledList.Item
      {...rest}
      link
      onClick={(evt) => {
        handleClick(rest.id, evt)
      }}
      key={rest.id}
    >
      <Flex width={1} alignItems="center">
        <Flex width={single ? [1, 0.5] : [1]} alignItems="center">
          {single ? (
            <Flex
              mr={[3, 3]}
              ml={[2, 0]}
              alignItems="center"
              justifyContent="flex-start"
              style={{ opacity: 0.45, overflow: 'hidden' }}
              flex="0 0 auto"
            >
              <Type.p>{rank}</Type.p>
            </Flex>
          ) : null}
          <AppIcon hover="true" src={imageUrl} alt={name} size={48} />
          <Box style={{ flexGrow: 1, maxWidth: '75%' }} pl={3}>
            <Type.h4 fontSize={16} mt="4px">
              <a href={`/app/${rest.Slugs[0] && rest.Slugs[0].value}`}>{name}</a>
            </Type.h4>
            <SmallText p={0} my={2}>
              {description}
            </SmallText>
          </Box>
        </Flex>
        {single ? (
          <>
            <TableItem>{appTag(authentication)}</TableItem>
            <TableItem>{appTag(storageNetwork)}</TableItem>
            <TableItem>{appTag(blockchain)}</TableItem>
            <TableItem style={{ textAlign: 'right', fontSize: '13px', fontWeight: 700 }} width={[0, 0.5 / 4]}>
              {getTwitterMentions(rest)}
            </TableItem>
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
