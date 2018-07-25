import React from 'react'
import { Box } from '@components/box'
import { Flex } from 'grid-styled'
import { Type } from '@components/typography'
import { AppIcon } from '@components/app-icon'
import { GithubCircleIcon, TwitterCircleIcon, ArrowLeftIcon } from 'mdi-react'
import { Button } from '@components/button'
import { outboundLink } from '@utils'
import { Tag } from '@components/tag'
import { doClearApp } from '@stores/apps'
import Link from 'next/link'
import Head from 'next/head'

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

const TagBox = ({ label, tag }) =>
  tag ? (
    <Box py={4} pr={4}>
      <Type.h5>{label}</Type.h5>
      <Tag light mt={3}>
        {tag}
      </Tag>
    </Box>
  ) : null

const TagsSection = ({ authentication, blockchain, storageNetwork }) => (
  <Flex alignItems="center">
    <TagBox label="Storage" tag={storageNetwork} />
    <TagBox label="Authentication" tag={authentication} />
    <TagBox label="Blockchain" tag={blockchain} />
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

const Header = ({ imageUrl, name, category, description }) => (
  <>
    <Flex alignItems="center">
      <AppIcon src={imageUrl} alt={name} />
      <Box pl={3}>
        <Type.h3>{name}</Type.h3>
        <Tag mt={2} small>
          {category}
        </Tag>
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
      <Type.h3 pr={2}>{tweets}</Type.h3> <Type.p>Tweets about {name} in the last 7 days</Type.p>
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
      <a>
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

  return (
    <>
      <Head>
        <title>{props.name} &mdash; App.co</title>
      </Head>
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
