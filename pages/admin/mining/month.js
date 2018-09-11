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
import { FormTd, Table, Td } from '@components/mining-admin/table'
import { Type } from '@components/typography'

let AdminLayout = () => ''

class MiningMonth extends React.Component {
  state = {
    purchasedAt: '',
    purchaseExchangeName: '',
    BTCTransactionId: '',
    purchaseConversionRate: ''
  }

  static propTypes = {
    fetchMiningMonths: PropTypes.func.isRequired,
    saveMonth: PropTypes.func.isRequired,
    month: PropTypes.object,
    id: PropTypes.string.isRequired
  }

  static defaultProps = {
    month: null
  }

  static getInitialProps({ req }) {
    const { id } = req.params
    return {
      id
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.purchasedAt && nextProps.month) {
      this.setState({ ...nextProps.month })
    }
  }

  componentDidMount() {
    AdminLayout = require('../../../containers/admin/layout').default
    this.props.fetchMiningMonths()
  }

  save() {
    const data = { ...this.state }
    if (this.state.purchasedAt) {
      const date = moment(this.state.purchasedAt).utcOffset(-4)
      data.purchasedAt = date.format()
    } 
    console.log(data)
    this.props.saveMonth(data)
    this.notifications.addNotification({
      message: `Report for ${this.monthName()} was saved successfully.`,
      level: 'success'
    })
  }

  monthName() {
    const { month } = this.props
    const date = moment(`${month.month} ${month.year}`, 'M YYYY')
    return date.format('MMMM YYYY')
  }

  reviewers() {
    return this.props.month.MiningReviewerReports.map((report) => (
        <tr>
          <Td>
            <Link href={`/admin/mining/months/${this.props.id}/reports/${report.id}`}>
              <a>{report.reviewerName}</a>
            </Link>
          </Td>
          <Td>
            <Link href={`/admin/mining/months/${this.props.id}/reports/${report.id}`}>
              <a>
                <Type.span textAlign="right" fontSize="12px">Delete</Type.span>
              </a>
            </Link>
          </Td>
        </tr>
      ))
  }

  month() {
    const date = this.monthName()
    return (
      <>
        <StyledMonth.Section>
          <h1>{date}</h1>
        </StyledMonth.Section>

        <Collapsable title="BTC transactions">
          <div style={{paddingBottom: '1em'}}>
            <Table>
              <tbody>
                <tr>
                  <FormTd>
                    Purchase Exchange Name
                  </FormTd>
                  <FormTd textAlign="right">
                    <Input 
                      type="text"
                      value={this.state.purchaseExchangeName} 
                      onChange={(evt) => this.setState({purchaseExchangeName: evt.target.value})}
                    />
                  </FormTd>
                </tr>
                <tr>
                  <FormTd>
                    Purchase date
                  </FormTd>
                  <FormTd textAlign="right">
                    <Input type="datetime-local" 
                      value={moment(this.state.purchasedAt).format('YYYY-MM-DDTHH:mm')}
                      onChange={(evt) => this.setState({purchasedAt: evt.target.value})} 
                    />
                  </FormTd>
                </tr>
                <tr>
                  <FormTd>
                    Purchase conversion rate (USD-to-BTC)
                  </FormTd>
                  <FormTd textAlign="right">
                    <Input type="number"
                      value={this.state.purchaseConversionRate}
                      onChange={(evt) => this.setState({ purchaseConversionRate: evt.target.value })}
                    />
                  </FormTd>
                </tr>
                <tr>
                  <FormTd>
                    Disbursement transaction ID
                  </FormTd>
                  <FormTd textAlign="right">
                    <Input type="text"
                      value={this.state.BTCTransactionId}
                      onChange={(evt) => this.setState({ BTCTransactionId: evt.target.value })}
                    />
                  </FormTd>
                </tr>
              </tbody>
            </Table>
            <Button onClick={() => this.save()}>Save</Button>
          </div>
        </Collapsable>

        <Collapsable title="Reviewer Reports">
          <Box px={5} py={3} style={{ borderTop: "1px solid #e6e9ee" }}>
            <Link href={`/admin/mining/months/${this.props.id}/upload-report`}>
              <a>
                <Type.span fontSize="12px">
                  Add Report
                </Type.span>
              </a>
            </Link>
          </Box>
          <Table>
            <tbody>
              {this.reviewers()}
            </tbody>
          </Table>
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
        <NotificationSystem
          ref={(c) => {
            this.notifications = c
          }}
        />
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
