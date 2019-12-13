import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Link from 'next/link';
import keys from 'lodash/keys';

import AppStore from '@stores/apps';
import { selectAppCategories } from '@stores/apps/selectors';
import UserStore from '@stores/user';

import * as StyledPlatformFilters from '@components/platform-filters';

import { slugifyCategory } from '@utils';

const CategoryFilters = ({ categories }) => {
  const categoryURL = category => `/category/${slugifyCategory(category)}`;
  const categoryEl = (category, opts) => (
    <Link href={categoryURL(category)} key={category}>
      <StyledPlatformFilters.Filter key={category} href={categoryURL(category)}>
        <StyledPlatformFilters.PlatformTitle>
          {category}
        </StyledPlatformFilters.PlatformTitle>
      </StyledPlatformFilters.Filter>
    </Link>
  );

  const categoryKeys = keys(categories);
  const length = categoryKeys.length - (categoryKeys.length % 3);
  const categoryEls = categoryKeys
    .slice(0, length)
    .map(category => <>' '{categoryEl(category)}' '</>);
  return (
    <>
      ' '
      <StyledPlatformFilters.FilterSubtitle>
        Show Dapps by Category
      </StyledPlatformFilters.FilterSubtitle>
      ' '
      <StyledPlatformFilters.Filters>
        {categoryEls}
      </StyledPlatformFilters.Filters>
      ' '
    </>
  );
};

const mapStateToProps = state => ({
  categories: selectAppCategories(state),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    Object.assign({}, AppStore.actions, UserStore.actions),
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryFilters);
