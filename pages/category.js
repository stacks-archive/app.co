import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Page } from '@components/page'
import { Newsletter } from '@components/newsletter'
import { AppsList } from '@components/list/apps'
import { CategoriesList } from '@components/list/categories'
import { PlatformsList } from '@components/list/platforms'
import Modal from '@components/modal'
import Head from '@containers/head'

import { doSelectCategoryFilter } from '@stores/apps'
import { selectCategoryName } from '@stores/apps/selectors'

class CategoryPage extends React.PureComponent {
  propTypes = {
    category: PropTypes.string,
    categoryName: PropTypes.string
  }

  static async getInitialProps({ query, reduxStore }) {
    const { category } = query

    if (category) {
      reduxStore.dispatch(doSelectCategoryFilter(category))
    }

    return {
      category
    }
  }

  render() {
    const { categoryName } = this.props
    return (
      <Page>
        <Head title={categoryName ? `${categoryName} Apps` : 'All Categories'} />
        <Page.Section px>
          <Newsletter wrap />
        </Page.Section>
        <Page.Section p={0} px>
          <Page.Section wrap flexDirection={['column', 'column', 'row']} p={0}>
            <PlatformsList mr={[0, 3]} />
            <CategoriesList />
          </Page.Section>
        </Page.Section>
        <Page.Section flexDirection="column" px>
          <AppsList
            filterBy='category'
            single={!!this.props.category}
            limit={this.props.category ? undefined : 7}
          />
        </Page.Section>
        <Modal />
      </Page>
    )
  }
}

const mapStateToProps = (state) => ({
  categoryName: selectCategoryName(state)
})

export default connect(mapStateToProps)(CategoryPage)
