import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'
import PropTypes from 'prop-types'

import MiningActions from '@stores/mining-admin/actions'

import StyledMonths from '@components/mining-admin/months'

let AdminLayout = () => ''

class MiningMonths extends React.Component {
  static propTypes = {
    fetchMiningMonths: PropTypes.func.isRequired,
    months: PropTypes.array.isRequired
  }

  componentDidMount() {
    AdminLayout = require('../../../containers/admin/layout').default
    this.props.fetchMiningMonths()
  }

  monthsList() {
    if (!this.props.months) {
      return ''
    }

    return this.props.months.map((month) => {
      const date = moment(`${month.month} ${month.year}`, 'M YYYY')
      return (
        <tr>
          <StyledMonths.Td>
            {date.format('MMMM YYYY')}
          </StyledMonths.Td>
          <StyledMonths.Td textAlign="right">
            {month.status || 'Not Published'}
          </StyledMonths.Td>
        </tr>
      )
    })
  }

  months() {
    return (
      <StyledMonths.Table>
        <thead>
          <tr>
            <StyledMonths.Th>
              Month
            </StyledMonths.Th>
            <StyledMonths.Th textAlign="right">
              Status
          </StyledMonths.Th>
          </tr>
        </thead>
        <tbody>
          {this.monthsList()}
        </tbody>
      </StyledMonths.Table>
    )
  }

  render() {
    return (
      <>
        {AdminLayout && (
          <AdminLayout>
            <br />
            <br />
            {this.months()}
            <br />
            <br />
          </AdminLayout>
        )}
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  months: state.miningAdmin.months
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, MiningActions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MiningMonths)
