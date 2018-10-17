import * as React from 'react'
import { MiningList } from '@components/mining/list'
import { Section, Heading, SubHeading } from '@pages/mining/shared'
import { Type, Flex, Box } from 'blockstack-ui'
import { Img } from '@components/mining'
import { MiningButton } from '@components/mining/button'
import ArrowRightIcon from 'mdi-react/ArrowRightIcon'
import { AppIcon } from '@components/app-icon'
import { RankingContextConsumer } from '@pages/mining/index'
import { Hover } from 'react-powerplug'

const ListItemText = (props) => <Type.h4 color="white" fontSize="18px" lineHeight={1.5} fontWeight={400} {...props} />
const AppItemText = (props) => <ListItemText color="#212D37" {...props} />
const Tag = ({ ...rest }) => (
  <AppItemText border="1px solid #646C73" borderRadius="3px" fontSize={1} px={2} ml={2} {...rest} />
)

const Earnings = ({ index, btc, usd }) => (
  <Flex flexDirection="column" alignItems="flex-end">
    <Type fontSize="20px" color="#212D37">
      {usd}
    </Type>
    <Flex pt={2} opacity={0.5} color="#212D37">
      <Type fontSize={2}>{btc.toFixed(3)}</Type>
      <Type pl={2}>BTC</Type>
    </Flex>
  </Flex>
)

const AppItem = ({
  website,
  name,
  earnings: { btc, usd },
  tags,
  i,
  index,
  appIcon,
  length,
  slug,
  backgroundOpacity,
  ...rest
}) => {
  const earningsBackground = ['#DEDEDE', '#CFCFCF', '#B8B8B8', '#979797', '#828282'][i]
  const GradientItem = (props) => (
    <Hover>
      {({ hovered, bind }) => (
        <Flex
          is="a"
          href={`/app/${slug}`}
          target="_blank"
          style={{ textDecoration: 'none', transition: '0.2s all ease-in-out' }}
          width={1}
          p={[3, 4]}
          bg={`rgba(255,255,255, ${hovered ? backgroundOpacity + 0.2 : backgroundOpacity - 0.05})`}
          alignItems="center"
          {...props}
          {...rest}
          {...bind}
        />
      )}
    </Hover>
  )
  const AppRank = () => (
    <AppItemText opacity={0.5} mr={3}>
      {i + 1}
    </AppItemText>
  )
  const AppName = () => (
    <Flex alignItems="center">
      <AppIcon mr={3} src={appIcon} alt={name} size={42} />
      <AppItemText fontWeight="500" pr={3}>
        {name}
      </AppItemText>
    </Flex>
  )
  const AppTags = () =>
    tags && tags.length ? (
      <Flex display={['none', 'flex']}>
        {tags.map((tag, tagIndex) => (
          <Tag key={tagIndex}>{tag}</Tag>
        ))}
      </Flex>
    ) : null
  const AppEarnings = ({ background }) => (
    <Flex flexDirection={['column', 'row']} ml="auto" alignItems={['flex-end', 'center']}>
      <Earnings btc={btc} usd={usd} background={background} />
    </Flex>
  )
  return (
    <GradientItem>
      <AppRank />
      <AppName />
      <AppTags />
      <AppEarnings background={earningsBackground} />
    </GradientItem>
  )
}

const appRowBackgroundOpacities = [1, 0.89, 0.76, 0.6, 0.5]
const appsArray = (apps) =>
  apps &&
  apps.map((app, i) => (
    <AppItem
      key={i}
      i={i}
      index={apps.length - i}
      length={apps.length}
      {...app}
      backgroundOpacity={appRowBackgroundOpacities[i]}
    />
  ))

const Rankings = (props) => (
  <RankingContextConsumer>
    {({ rankings }) => {
      if (!rankings) return null
      const apps = rankings
        .filter((app, i) => i < 5)
        .map(({ name, formattedUsdRewards, payout, imgixImageUrl, domain, authentication, storageNetwork, slug }) => {
          const tags = []
          if (authentication) tags.push(authentication)
          if (storageNetwork) tags.push(storageNetwork)
          return {
            name,
            earnings: {
              usd: formattedUsdRewards,
              btc: payout.BTC
            },
            tags,
            appIcon: imgixImageUrl,
            website: domain,
            slug
          }
        })
      return (
        <Section flexDirection="column" {...props}>
          <MiningList
            width={1}
            maxWidth="850px"
            noItemBorder
            items={[
              <Flex width={1} p={4}>
                <ListItemText opacity={0.5} mr={3} display={['none', 'block']}>
                  App Mining Rank
                </ListItemText>
                <ListItemText
                  ml={['0', 'auto']}
                  textAlign={['center', 'right']}
                  width={['100%', 'auto']}
                  color="#11A9BC"
                >
                  September 2018 Payouts
                </ListItemText>
              </Flex>,
              ...appsArray(apps)
            ]}
          />
        </Section>
      )
    }}
  </RankingContextConsumer>
)

const ActionBar = () => (
  <Box maxWidth="960px" mx="auto" style={{ transform: 'translateY(-25px)' }}>
    <Box borderTop="1px solid white" />
    <MiningButton mx="auto" width="250px" bg="#EF6F6F" alignItems="center" style={{ transform: 'translateY(-25px)' }}>
      <Box>
        <a href="/app-mining/september-2018" style={{ textDecoration: 'none' }}>
          View all apps
        </a>
      </Box>
      <Box ml={2}>
        <ArrowRightIcon color="currentColor" size="1.3rem" style={{ transform: 'translateY(4px)' }} />
      </Box>
    </MiningButton>
  </Box>
)

const Earn = ({ ...props }) => (
  <>
    <Section minHeight="40vh" justifyContent="flex-end" mt={5} flexDirection="column" {...props}>
      <Box p={4}>
        <Img
          src="https://file-vdymnlybqk.now.sh/"
          alt="How much can you earn?"
          maxWidth={['80%', '360px']}
          mx="auto"
          display="block"
        />
      </Box>
      <Heading mb={5}>How much can you earn?</Heading>
      <Box maxWidth={['80%', '500px']}>
        <SubHeading>
          We currently pay in BTC for legal compliance. We plan to begin paying Stacks tokens early 2019 provided
          compliance with all applicable law.
        </SubHeading>
      </Box>
    </Section>
    <Rankings />
    <ActionBar />
  </>
)

export { Earn }
