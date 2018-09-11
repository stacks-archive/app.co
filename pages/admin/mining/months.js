import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'
import PropTypes from 'prop-types'
import Link from 'next/link'
import download from 'downloadjs'

import MiningActions from '@stores/mining-admin/actions'

import StyledMonths from '@components/mining-admin/table'
import StyledMonth from '@components/mining-admin/month'

let AdminLayout = () => ''

class MiningMonths extends React.Component {
  static propTypes = {
    fetchMiningMonths: PropTypes.func.isRequired,
    months: PropTypes.array.isRequired
  }

  componentDidMount() {
    AdminLayout = require('../../../containers/admin/layout').default // eslint-disable-line global-require
    this.props.fetchMiningMonths()
  }

  async download() {
    const { jwt, apiServer } = this.props 
    const url = `${apiServer}/api/admin/mining-ready-apps`
    const res = await fetch(url, {
      headers: new Headers({
        Authorization: `Bearer ${jwt}`
      })
    })
    const blob = await res.blob()
    download(blob, 'app-mining-rankings.csv', 'text/csv')
  }

  monthsList() {
    if (!this.props.months) {
      return ''
    }

    return this.props.months.map((month) => {
      const date = moment(`${month.month} ${month.year}`, 'M YYYY')
      return (
        <tr key={month.id}>
          <StyledMonths.Td>
            <Link href={`/admin/mining/months/${month.id}`}>
              {date.format('MMMM YYYY')}
            </Link>
          </StyledMonths.Td>
          <StyledMonths.Td textAlign="right">
            <Link href={`/admin/mining/months/${month.id}`}>
              {month.status || 'Not Published'}
            </Link>
          </StyledMonths.Td>
        </tr>
      )
    })
  }

  months() {
    return (
      <>
        <StyledMonth.Section mb={4}>
          <StyledMonth.Content pl={5} fontSize={12}>
            <a href="javascript:void(0)" onClick={() => { this.download() }}>Download registered apps</a>
          </StyledMonth.Content>
        </StyledMonth.Section>

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
      </>
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
  months: state.miningAdmin.months,
  apiServer: state.apps.apiServer,
  jwt: state.user.jwt
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, MiningActions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MiningMonths)
