import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'
import PropTypes from 'prop-types'
import NotificationSystem from 'react-notification-system'
import Link from 'next/link'
import { Box } from 'rebass'

import MiningActions from '@stores/mining-admin/actions'

import StyledMonth from '@components/mining-admin/month'
import Collapsable from '@containers/admin/collapsable'
import { Input, Button } from '@components/mining-admin/collapsable'
import { Table, Th, Thead, SpacedTd as Td } from '@components/mining-admin/table'
import { Type } from '@components/typography'
import { monthName } from '@utils/admin'

let AdminLayout = () => ''

class Reviewer extends React.Component {
  static getInitialProps({ req }) {
    const { monthId, reviewerId } = req.params
    return {
      monthId,
      reviewerId
    }
  }

  componentDidMount() {
    AdminLayout = require('../../../containers/admin/layout').default
    this.props.fetchMiningMonths()
  }

  apps() {
    return this.props.apps.map((ranking) => {
      const app = ranking.App
      return (
        <tr>
          <Td>
            {ranking.ranking}.
          </Td>
          <Td>
            {app.name}
          </Td>
          <Td textAlign="right">
            {app.website}
          </Td>
        </tr>
      )
    })
  }

  reviewer() {
    const { reviewer, month } = this.props
    return (
      <>
        <StyledMonth.Section>
          <h1>{reviewer.reviewerName} report for {monthName(month)}</h1>
        </StyledMonth.Section>

        <StyledMonth.Section mt={4}>
          <h2>Summary</h2>
          <StyledMonth.Content>
            <Type.p>
              {reviewer.summary}
            </Type.p>
          </StyledMonth.Content>
        </StyledMonth.Section>

        <StyledMonth.Section mt={4}>
          <h2>Rankings</h2>
          <Table>
            <Thead>
              <tr>
                <Th>Rank</Th>
                <Th>App name</Th>
                <Th textAlign="right">App domain</Th>
              </tr>
            </Thead>
            <tbody>
              {this.apps()}
            </tbody>
          </Table>
        </StyledMonth.Section>
      </>
    )
  }

  render() {
    return (
      <>
        <NotificationSystem
          ref={(c) => {
            this.notifications = c
          }}
        />
        {AdminLayout && (
          <AdminLayout>
            {this.props.month && this.reviewer()}
            <br />
            <br />
          </AdminLayout>
        )}
      </>
    )
  }
}

const mapStateToProps = (state, props) => {
  const month = state.miningAdmin.months.find((_month) => _month.id === parseInt(props.monthId, 10))
  const reviewer = month && month.MiningReviewerReports.find((review) => review.id === parseInt(props.reviewerId, 10))
  const apps = reviewer && reviewer.MiningReviewerRankings
  return {
    month,
    reviewer,
    apps
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, MiningActions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Reviewer)
