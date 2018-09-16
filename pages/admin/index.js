import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Link from 'next/link'

import { Button } from '@components/button'
import AdminLayout from '@containers/admin/layout'
import { Section } from '@components/mining-admin/month'
import { Table, Th, Thead, Td, SpacedTd } from '@components/mining-admin/table'

import AppStore from '@stores/apps'
import UserStore from '@stores/user'
import { selectApps, selectApiServer } from '@stores/apps/selectors'

import 'isomorphic-unfetch'

class Admin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.handleSignIn(this.props.apiServer)
  }

  appRows() {
    const { apps } = this.props
    return apps.map((app) => (
      <tr>
        <Td>
          <Link href={`/admin/app?id=${app.id}`}>
            <a>{app.name}</a>
          </Link>
        </Td>
        <SpacedTd>
          {app.category}
        </SpacedTd>
        <SpacedTd>
          {app.Rankings && app.Rankings[0] && app.Rankings[0].twitterMentions || 0}
        </SpacedTd>
        <SpacedTd>
          {app.status}
        </SpacedTd>
      </tr>
    ))
  }

  table() {
    return (
      <Section>
        <h1>Apps</h1>
        <Table>
          <Thead>
            <tr>
              <Th>Name</Th>
              <Th>Category</Th>
              <Th>Tweets/Week</Th>
              <Th>Status</Th>
            </tr>
          </Thead>
          <tbody>
            {this.appRows()}
          </tbody>
        </Table>
      </Section>
    )
  }

  render() {
    return (
      <AdminLayout>
        {this.props.user.user ? this.table() : (
          <Button
            type="button/primary"
            onClick={() => {
              this.props.signIn()
            }}
          >
            Sign In with Blockstack
          </Button>
        )}
      </AdminLayout>
    )
  }
}

const mapStateToProps = (state) => ({
  apps: selectApps(state),
  apiServer: selectApiServer(state),
  user: state.user
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, AppStore.actions, UserStore.actions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
