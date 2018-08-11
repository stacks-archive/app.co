import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Page } from '@components/page'
import { AppsList } from '@components/list/apps'
import Modal from '@containers/modals/app'
import Head from '@containers/head'

import { doSelectCategoryFilter } from '@stores/apps'
import { selectCategoryName } from '@stores/apps/selectors'

const mapStateToProps = (state) => ({
  categoryName: selectCategoryName(state)
})

/**
 * We are using connect on this component and not the class
 * because the class cannot run getInitialProps if it's connected
 */
const PageContent = connect(mapStateToProps)(({ categoryName, category }) => (
  <>
    <Head title={categoryName || 'All Categories'} />
    <Page.Section flexDirection="column" px>
      <AppsList filterBy="category" single={!!category} limit={category ? undefined : 7} />
    </Page.Section>
    <Modal />
  </>
))

class CategoryPage extends React.PureComponent {
  static propTypes = {
    category: PropTypes.string,
    categoryName: PropTypes.string
  }

  static async getInitialProps({ req, query, reduxStore }) {
    if (req) {
      /**
       * On the server we need to check the req object for the param
       */
      const {
        params: { category }
      } = req

      if (category) {
        reduxStore.dispatch(doSelectCategoryFilter(category))
        return { category }
      }
    }
    if (query) {
      /**
       * On the client we need to check the query param for what category we're trying to display
       */
      const { category } = query
      if (category) {
        reduxStore.dispatch(doSelectCategoryFilter(category))
        return { category }
      }
    }
    return {}
  }

  render() {
    return (
      <Page>
        <PageContent {...this.props} />
      </Page>
    )
  }
}

export default CategoryPage
