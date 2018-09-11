import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import NotificationSystem from 'react-notification-system'
import Papa from 'papaparse'
import Router from 'next/router'

import { monthName } from '@utils'
import MiningActions from '@stores/mining-admin/actions'
import StyledMonth from '@components/mining-admin/month'
import { FormTd, Table } from '@components/mining-admin/table'
import { Input, Button, Textarea } from '@components/mining-admin/collapsable'

let AdminLayout = () => ''

class UploadReport extends React.Component {
  state = {
    reviewerName: '',
    summary: ''
  }
  static getInitialProps({ req }) {
    const { id } = req.params
    return {
      id
    }
  }

  constructor(props) {
    super(props)
    this.csv = React.createRef()
    this.notifications = React.createRef()
  }

  componentDidMount() {
    AdminLayout = require('../../../containers/admin/layout').default // eslint-disable-line global-require
    console.log(this.props)
    this.props.fetchMiningMonths()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.saved) {
      Router.push(`/admin/mining/months/${this.props.id}`)
    }
  }

  save() {
    // console.log(this)
    const csv = this.csv.current.files[0]
    Papa.parse(csv, { 
      header: true,
      complete: ({ data }) => {
        const apps = data.map((app) => ({
            ...app,
            appId: app['App Id']
          }))
        const report = {
          ...this.state,
          apps,
          monthId: this.props.id
        }
        this.props.saveReport(report)
        console.log(report)
      }
    })
  }

  form() {
    // console.log(Section)
    return (
      <StyledMonth.Section>
        <h2>Add reviewer report for {monthName(this.props.month)}</h2>
        <div style={{ paddingBottom: '1em' }}>
          <Table>
            <tbody>
              <tr>
                <FormTd>
                  Reviewer Name
                </FormTd>
                <FormTd>
                  <Input type="text"
                    value={this.state.reviewerName}
                    onChange={(evt) => this.setState({reviewerName: evt.target.value })}
                  />
                </FormTd>
              </tr>
              <tr>
                <FormTd>
                  Spreadsheet
                </FormTd>
                <FormTd>
                  <Input type="file" innerRef={this.csv}/>
                </FormTd>
              </tr>
              <tr>
                <FormTd>
                  Summary
                </FormTd>
                <FormTd>
                  <Textarea 
                    value={this.state.summary}
                    onChange={(evt) => this.setState({ summary: evt.target.value })}
                  />
                </FormTd>
              </tr>
            </tbody>
          </Table>
          <Button onClick={() => this.save()}>Submit</Button>
        </div>
      </StyledMonth.Section>
    )
  }

  render() {
    return (
      <>
        <NotificationSystem
          ref={this.notifications}
        />
        {AdminLayout && (
          <AdminLayout>
            {this.props.month && this.form()}
            <br />
            <br />
          </AdminLayout>
        )}
      </>
    )
  }
}

const mapStateToProps = (state, props) => ({
  month: state.miningAdmin.months.find((month) => month.id === parseInt(props.id, 10)),
  saved: state.miningAdmin.reportSaved
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, MiningActions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadReport)
