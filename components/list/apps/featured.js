/**
 * TODO: this should not be its own component
 */
import React from 'react';
import PropTypes from 'prop-types';
import sortBy from 'lodash/sortBy';
import { background } from '@common';

import { connect } from 'react-redux';

import { selectApps } from '@stores/apps/selectors';

import { ListContainer } from '@components/list/index';
import AppItem from './item';

class FeaturedListComponent extends React.Component {
  static propTypes = {
    allApps: PropTypes.array.isRequired,
    appNames: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    query: PropTypes.string,
    singular: PropTypes.string,
    filterBy: PropTypes.string,
    href: PropTypes.string,
    limit: PropTypes.number,
  };

  getFilteredApps() {
    const { allApps, appNames } = this.props;
    let filtered = allApps.filter(app => appNames.indexOf(app.name) !== -1);
    filtered = sortBy(filtered, app => appNames.indexOf(app.name));
    return [...new Set(filtered)];
  }

  render() {
    const {
      title,
      href,
      filterBy,
      singular,
      query,
      image,
      hrefAttrs,
    } = this.props;
    const link = href
      ? hrefAttrs || {
          as: `/${filterBy}/${query}`,
          href: {
            pathname: `/${filterBy}`,
            query: {
              [singular]: query,
            },
          },
        }
      : {};

    const bg = image !== 'none' ? background(image || title) : undefined;
    const header = {
      title,
      background: bg,
      white: true,
      ...link,
    };

    if (href) {
      header.action = { label: 'View All' };
    }
    return (
      <ListContainer
        header={header}
        items={this.getFilteredApps()}
        item={AppItem}
        width={[1, 1 / 2, 1 / 3]}
        single={false}
        href={href}
        limit={this.props.limit}
      />
    );
  }
}

const mapStateToProps = state => ({
  allApps: selectApps(state),
});

const FeaturedList = connect(mapStateToProps)(FeaturedListComponent);

export default FeaturedList;
