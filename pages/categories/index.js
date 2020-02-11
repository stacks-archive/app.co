import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CategoriesList } from '@components/list/categories';

import { Page } from '@components/page';
import { AppsList } from '@components/list/apps';
import Modal from '@containers/modals/app';
import Head from '@containers/head';

import { doSelectCategoryFilter, doClearCategoryFilter } from '@stores/apps';
import { selectCategoryName } from '@stores/apps/selectors';

const mapStateToProps = state => ({
  categoryName: selectCategoryName(state),
});

/**
 * We are using connect on this component and not the class
 * because the class cannot run getInitialProps if it's connected
 */
const PageContent = connect(mapStateToProps)(
  ({ categoryName, category, ...rest }) => (
    <>
      <Head title={categoryName || 'All Categories'} />
      {category ? (
        <Page.Section flexDirection="column" px>
          <AppsList
            filterBy="category"
            single={!!category}
            limit={category ? undefined : 7}
            {...rest}
          />
        </Page.Section>
      ) : (
        <Page.Section p={0} pl={[0, 4]} pr={[0, 4]}>
          <Page.Section wrap flexDirection={['column', 'column', 'row']} p={0}>
            <CategoriesList limit={0} width={[1, 1 / 4]} noAll />
          </Page.Section>
        </Page.Section>
      )}
      <Modal />
    </>
  )
);

class CategoryPage extends React.PureComponent {
  static propTypes = {
    category: PropTypes.string,
    categoryName: PropTypes.string,
  };

  static async getInitialProps({ req, query, reduxStore }) {
    if (req) {
      /**
       * On the server we need to check the req object for the param
       */

      // eslint-disable-next-line prefer-destructuring
      const category = req.params.category;

      if (category) {
        reduxStore.dispatch(doSelectCategoryFilter(category));
        return { category };
      } else {
        reduxStore.dispatch(doClearCategoryFilter());
      }
    }
    if (query) {
      /**
       * On the client we need to check the query param for what category we're trying to display
       */
      // eslint-disable-next-line prefer-destructuring
      const category = query.category;
      if (category) {
        reduxStore.dispatch(doSelectCategoryFilter(category));
        return { category };
      } else {
        reduxStore.dispatch(doClearCategoryFilter());
      }
    }
    return {};
  }

  render() {
    return (
      <Page>
        <PageContent {...this.props} category={this.props.category} />
      </Page>
    );
  }
}

export default CategoryPage;
