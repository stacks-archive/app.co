import React from 'react'
import { Flex } from 'grid-styled'
import { GithubCircleIcon, TwitterCircleIcon, ArrowLeftIcon } from 'mdi-react'
import Link from 'next/link'
import { Box } from 'rebass'
import numeral from 'numeral'

import { Type } from '@components/typography'
import { AppIcon } from '@components/app-icon'
import { Button } from '@components/button'
import { TagLink } from '@components/tag'
import Head from '@containers/head'

import { outboundLink } from '@utils'
import { slugify } from '@common'
import { theme } from '@common/styles'
import { doClearApp } from '@stores/apps'

const LinkWithIcon = (props) => {
  const { icon: Icon, link, label, title } = props
  return (
    <Box
      pr={2}
      onClick={() => {
        outboundLink(props, link)
      }}
      title={title}
    >
      <Icon color="currentColor" size={28} />
      {label}
    </Box>
  )
}

const formatUrl = (url) => {
  const updatedUrl = url
    .replace('https://', '')
    .replace('http://', '')
    .replace('www.', '')
  if (updatedUrl.substr(-1) === '/') {
    return updatedUrl.substr(0, updatedUrl.length - 1)
  }
  return updatedUrl
}

const OpenSource = ({ openSourceUrl, ...rest }) =>
  openSourceUrl && openSourceUrl.indexOf('github.com') !== -1 ? (
    <LinkWithIcon link={openSourceUrl} icon={GithubCircleIcon} title="View on Github" {...rest} />
  ) : null

const Twitter = ({ twitterHandle, ...rest }) =>
  twitterHandle ? (
    <LinkWithIcon
      link={`https://twitter.com/${twitterHandle}`}
      icon={TwitterCircleIcon}
      title="View on Twitter"
      {...rest}
    />
  ) : null

const TagBox = ({ label, tag, onClick }) => {
  if (!tag) {
    return null
  }
  const slugified = slugify(tag)
  const url = `/${slugified}`
  return (
    <Box py={4} pr={4} onClick={() => onClick()}>
      <Type.h5>{label}</Type.h5>

      <TagLink light mt={3} as={url} href={{ pathname: '/platforms', query: { platform: slugified } }}>
        {tag}
      </TagLink>
    </Box>
  )
}

const TagsSection = ({ authentication, blockchain, storageNetwork, handleClose = () => null }) => (
  <Flex alignItems="center">
    <TagBox label="Storage" tag={storageNetwork} onClick={() => handleClose()} />
    <TagBox label="Authentication" tag={authentication} onClick={() => handleClose()} />
    <TagBox label="Blockchain" tag={blockchain} onClick={() => handleClose()} />
  </Flex>
)

const WebsiteButton = (props) => (
  <Button
    type="button/primary"
    onClick={() => {
      outboundLink(props)
    }}
  >
    Get Dapp
  </Button>
)

const categoryURL = (category) => `/categories/${slugify(category)}`

const Header = ({ imageUrl, name, category, description, handleClose = () => null }) => (
  <>
    <Flex alignItems="center">
      <AppIcon src={imageUrl} alt={name} />
      <Box pl={3}>
        <Type.h3>{name}</Type.h3>
        <TagLink
          mt={2}
          small
          as={categoryURL(category)}
          href={{ pathname: '/categories', query: { category: slugify(category) } }}
          onClick={() => handleClose()}
        >
          {category}
        </TagLink>
      </Box>
    </Flex>
    <Box py={3}>
      <Type.p>{description}</Type.p>
    </Box>
  </>
)

const Website = (props) =>
  props.website ? (
    <Box>
      <a
        href={props.website}
        target="_blank"
        onClick={() => {
          outboundLink(props)
        }}
      >
        {formatUrl(props.website)}
      </a>
      {props.Rankings &&
        props.Rankings[0] &&
        props.Rankings[0].monthlyVisitsCount && (
          <Type.span fontSize={14} color={theme.colors.grey.mid} ml={3}>
            {numeral(props.Rankings[0].monthlyVisitsCount || 0).format('0a')} visits / month
          </Type.span>
        )}
    </Box>
  ) : null

const StatsItem = ({ Rankings, name }) => {
  const [ranking] = Rankings || []
  let tweets = 0
  if (ranking) {
    tweets = ranking.twitterMentions || 0
  }
  return (
    <Flex pt={3} alignItems="center">
      <Type.h3 pr={2}>{tweets.toLocaleString()}</Type.h3> <Type.p>tweets about {name} in the past 7 days</Type.p>
    </Flex>
  )
}

const ClaimApp = ({ name }) => (
  <Box>
    <a href={`mailto:hello@app.co?subject=I want to claim ${name}`}>Is this your app? Claim it now.</a>
  </Box>
)

const HomeLink = (props) => (
  <div
    style={{
      position: 'absolute',
      top: '-38px',
      left: 0
    }}
    {...props}
  >
    <Link href="/">
      <a href="/">
        <Flex>
          <ArrowLeftIcon />
          All dapps
        </Flex>
      </a>
    </Link>
  </div>
)

const AppCard = ({ py, px, my, mx, mr = 'auto', ml = 'auto', mt, mb, style, ...props }) => {
  const appCardStyleProps = {
    py,
    px,
    my,
    mx,
    mr,
    ml,
    mt,
    mb,
    style
  }

  const descNoPeriod =
    props.description[props.description.length - 1] === '.' ? props.description.slice(0, -1) : props.description
  const metaDesc = `${props.name} — ${descNoPeriod}. Explore this and other dapps on App.co, the universal dapp store.`
  return (
    <>
      <Head title={props.name} description={metaDesc} />
      <Box
        width={[1]}
        card
        p={4}
        style={{
          position: 'relative'
        }}
        {...appCardStyleProps}
      >
        {props.homeLink ? <HomeLink onClick={() => props.dispatch(doClearApp())} /> : null}
        <Header {...props} />
        <hr />
        <Box py={4}>
          <WebsiteButton {...props} />
        </Box>
        <Website {...props} />
        <Flex py={3}>
          <OpenSource {...props} />
          <Twitter {...props} />
        </Flex>
        <hr />
        <TagsSection {...props} />
        <hr />
        <StatsItem {...props} />
        <ClaimApp {...props} />
      </Box>
    </>
  )
}

export { AppCard }
