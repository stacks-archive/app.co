import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Section } from '@components/mining-admin/month'
import { AppLink, Img, Container, Name, Description } from '@components/mining/registered-apps/styled'

import { selectAppMiningApps } from '@stores/apps/selectors'
import AppStore from '@stores/apps'


class RegisteredApps extends React.Component {
  componentDidMount() {
    this.props.fetchAppMiningApps()
  }

  apps() {
    const { apps } = this.props
    if (!apps) {
      return ''
    }
    return apps.filter((app) => app.miningReady === true)
      .map((app) => (
      <AppLink href={app.website} target="_blank">
        <Img src={app.imgixImageUrl} />
        <Container>
          <Name>{app.name}</Name>
          <Description>{app.description}</Description>
        </Container>
      </AppLink>
    ))
  }

  render() {
    return (
      <Section mx="auto" mt={3} mb={5} width={[1, 0.6]}>
        <h3>Registered Apps</h3>
        {this.apps()}
      </Section>
    )
  }
}

const mapStateToProps = (state) => ({
  apps: selectAppMiningApps(state)
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, AppStore.actions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisteredApps)
