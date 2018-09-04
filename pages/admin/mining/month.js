import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'
import PropTypes from 'prop-types'
import { FieldTextStateless as TextField } from '@atlaskit/field-text'

import MiningActions from '@stores/mining-admin/actions'

import StyledMonth from '@components/mining-admin/month'
import Collapsable from '@containers/admin/collapsable'
import { Input, Button } from '@components/mining-admin/collapsable'
import { FormTd, Table } from '@components/mining-admin/table'

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
          <div style={{paddingBottom: '1em'}}>
            <Table>
              <tbody>
                <tr>
                  <FormTd>
                    Purchase Exchange Name
                  </FormTd>
                  <FormTd textAlign="right">
                    <Input />
                  </FormTd>
                </tr>
                <tr>
                  <FormTd>
                    Purchase date
                  </FormTd>
                  <FormTd textAlign="right">
                    <Input type="datetime-local" />
                  </FormTd>
                </tr>
                <tr>
                  <FormTd>
                    Purchase conversion rate (USD-to-BTC)
                  </FormTd>
                  <FormTd textAlign="right">
                    <Input type="number"/>
                  </FormTd>
                </tr>
                <tr>
                  <FormTd>
                    Disbursement transaction ID
                  </FormTd>
                  <FormTd textAlign="right">
                    <Input />
                  </FormTd>
                </tr>
              </tbody>
            </Table>
            <Button>Save</Button>
          </div>
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
