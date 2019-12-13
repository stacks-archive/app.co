import React from 'react';
import { Type } from '@components/typography';
import { StyledList } from '@components/list/styled';
import { connect } from 'react-redux';
import { selectApps, selectAppCategoriesArray } from '@stores/apps/selectors';
import { ListContainer } from '@components/list/index';
import { Box } from 'blockstack-ui';
import { Truncate } from 'rebass';
import { slugify } from '@common';
import Link from 'next/link';

const mapStateToProps = state => ({
  apps: selectApps(state),
  categories: selectAppCategoriesArray(state),
});

const CategoryItem = ({ category, link, ...rest }) => (
  <Link href={link.href} as={link.as}>
    <StyledList.ItemLink {...rest} link>
      <Box style={{ flexGrow: 1, maxWidth: '100%' }} px={2}>
        <Type.strong>
          <Truncate>
            <a href={link.as}>{category}</a>
          </Truncate>
        </Type.strong>
      </Box>
    </StyledList.ItemLink>
  </Link>
);

const CategoriesList = connect(mapStateToProps)(
  ({ categories, apps, limit = 6, noAll, ...rest }) => {
    const items = limit !== 0 ? categories.slice(0, limit - 1) : categories;
    const modifiedArray = items.map(category => ({
      category,
      slug: slugify(category),
      link: {
        as: `/categories/${slugify(category)}`,
        href: {
          pathname: `/categories`,
          query: {
            category: slugify(category),
          },
        },
      },
    }));
    const lastItem = {
      category: 'All Categories',
      slug: slugify('All Categories'),
      link: {
        as: `/categories`,
        href: {
          pathname: `/categories`,
        },
      },
    };
    const array = !noAll ? [...modifiedArray, lastItem] : modifiedArray;

    return (
      <>
        <ListContainer
          items={array}
          item={CategoryItem}
          width={[1, 1 / 2]}
          limit={limit}
          mx={[2, 0]}
          {...rest}
        />
      </>
    );
  }
);

export { CategoriesList };
