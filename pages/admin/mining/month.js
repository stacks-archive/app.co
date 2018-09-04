import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'
import PropTypes from 'prop-types'

import MiningActions from '@stores/mining-admin/actions'

import StyledMonth from '@components/mining-admin/month'

import Collapsable from '@containers/admin/collapsable'

let AdminLayout = () => ''

class MiningMonth extends React.Component {
  static getInitialProps({ req }) {
    const { id } = req.params
    return {
      id
    }
  }

  componentDidMount() {
    AdminLayout = require('../../../containers/admin/layout').default
    this.props.fetchMiningMonths()
  }

  month() {
    const { month } = this.props
    const date = moment(`${month.month} ${month.year}`, 'M YYYY')
    return (
      <>
        <StyledMonth.Section>
          <h1>{date.format('MMMM YYYY')}</h1>
        </StyledMonth.Section>

        <Collapsable title="BTC transactions">
          Child content
        </Collapsable>

        <Collapsable title="Reviewer Reports">
          Child content
        </Collapsable>

        <Collapsable title="Composite Rankings">
          Child content
        </Collapsable>
      </>
    )
  }

  render() {
    return (
      <>
        {AdminLayout && (
          <AdminLayout>
            {this.props.month && this.month()}
            <br />
            <br />
          </AdminLayout>
        )}
      </>
    )
  }
}

const mapStateToProps = (state, props) => ({
  month: state.miningAdmin.months.find((month) => month.id === parseInt(props.id, 10))
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, MiningActions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MiningMonth)
