import React from 'react';
import { Type } from '@components/typography';
import { StyledList } from '@components/list/styled';
import { connect } from 'react-redux';
import { selectApps, selectAllPlatforms } from '@stores/apps/selectors';
import { ListContainer } from '@components/list/index';

import { Flex, Box } from 'blockstack-ui';
import Link from 'next/link';
import { slugify } from '@common';
import { renderPlatformIcon } from '@components/svg/platforms';

const mapStateToProps = state => ({
  apps: selectApps(state),
  platforms: selectAllPlatforms(state),
});

const PlatformItem = ({
  platform,
  link,
  image,
  width,
  icon: Icon,
  ...rest
}) => (
  <Link href={link.href} as={link.as}>
    <StyledList.ItemLink width={width} link {...rest}>
      <Flex
        justifyContent="flex-start"
        style={{ flexGrow: 1, maxWidth: '100%' }}
        pr={2}
      >
        {Icon ? (
          <Box pr={2}>
            <Icon color="currentColor" />
          </Box>
        ) : null}
        <Type.strong>
          <a href={link.as}>{platform}</a>
        </Type.strong>
      </Flex>
    </StyledList.ItemLink>
  </Link>
);

const PlatformsList = connect(mapStateToProps)(
  ({ apps, limit, platforms, auth, storage, noAll, ...rest }) => {
    const all = platforms;
    const items =
      limit === 0
        ? all
        : ['Blockstack', 'Ethereum', 'Steem', 'IPFS', 'ZeroNet'];
    const modifiedArray = items.map(platform => {
      const slugified = slugify(platform);
      return {
        platform,
        slugified,
        slug: slugified,
        icon: renderPlatformIcon(slugified),
        link: {
          as: `/${slugified}`,
          href: {
            pathname: `/platforms`,
            query: {
              platform: slugified,
            },
          },
        },
      };
    });
    const lastItem = {
      platform: 'All Platforms',
      slug: 'all-platforms',
      link: {
        href: '/platforms',
        as: '/platforms',
      },
    };
    const array = !noAll ? [...modifiedArray, lastItem] : modifiedArray;

    return (
      <>
        <ListContainer
          items={array}
          item={PlatformItem}
          limit={limit}
          width={[1, 1 / 2]}
          mx={[2, 0]}
          {...rest}
        />
      </>
    );
  }
);

export { PlatformsList };
