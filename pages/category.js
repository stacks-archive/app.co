import React from 'react'

import Page, { Grid, GridColumn } from '@atlaskit/page'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Page as Container } from '@containers/page'
import { Header } from '@containers/header'
import { Hero } from '@containers/hero'
import AppList from '@containers/app-list'
import Head from '@containers/head'

import AppStore from '@stores/apps'
import { doSelectCategoryFilter } from '@stores/apps'
import { selectCategoryFilter, selectCategoryName } from '@stores/apps/selectors'
import UserStore from '@stores/user'

class Category extends React.Component {
  static getInitialProps({ req, reduxStore }) {

    const {
      params: { category }
    } = req

    reduxStore.dispatch(doSelectCategoryFilter(category))

    return { category }
  }

  render() {
    return (
      <>
        <Head title={`${this.props.categoryName} Apps`} />
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
  categoryName: selectCategoryName(state)
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, AppStore.actions, UserStore.actions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)
