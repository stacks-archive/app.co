import React from 'react';

import Page, { Grid, GridColumn } from '@atlaskit/page';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Head from 'next/head';

import { Page as Container } from '@containers/page';
import { Header } from '@containers/header';
import { Hero } from '@containers/hero';
import AppList from '@containers/app-list';

import AppStore from '@stores/apps';
import { doSelectCategoryFilter } from '@stores/apps';
import { selectCategoryFilter, selectAppCategories } from '@stores/apps/selectors';
import UserStore from '@stores/user';

import { capitalize } from '@utils';

class Category extends React.Component {
  static getInitialProps({ req, reduxStore }) {

    const {
      params: { category },
    } = req;

    reduxStore.dispatch(doSelectCategoryFilter(category));

    return { category };
  }

  render() {
    console.log(Object.keys(this.props.categoryEnums))
    const categoryName = Object.keys(this.props.categoryEnums).find((cat) => {
      console.log(cat, encodeURIComponent(cat.toLowerCase()), this.props.categoryFilter);
      return cat.toLowerCase() === this.props.categoryFilter;
    });
    return (
      <>
        <Head>
          <title>{capitalize(categoryName)} Apps on App.co - The Universal Dapp Store</title>
        </Head>
        <Header />
        <Hero />
        <Container.Section wrap={1}>
          <Container.Section.Content>
            <AppList show={25} />
          </Container.Section.Content>
        </Container.Section>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  categoryFilter: selectCategoryFilter(state),
  categoryEnums: selectAppCategories(state),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, AppStore.actions, UserStore.actions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);