import React, { Component } from 'react'
import AddIcon from '@atlaskit/icon/glyph/add'
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left'
import ConfluenceIcon from '@atlaskit/icon/glyph/confluence'
import DiscoverIcon from '@atlaskit/icon/glyph/discover'
import JiraIcon from '@atlaskit/icon/glyph/jira'
import Page, { Grid, GridColumn } from '@atlaskit/page'
import PeopleIcon from '@atlaskit/icon/glyph/people'
import SearchIcon from '@atlaskit/icon/glyph/search'
import Tooltip from '@atlaskit/tooltip'
import WarningIcon from '@atlaskit/icon/glyph/warning'
import { AkSearch } from '@atlaskit/quick-search'
import Link from 'next/link'
import { withRouter } from 'next/router'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import AppStore from '@stores/apps'
import UserStore from '@stores/user'

import Navigation, {
  AkContainerLogo,
  AkContainerNavigationNested,
  AkCreateDrawer,
  AkNavigationItemGroup,
  AkNavigationItem,
  AkSearchDrawer,
  presetThemes
} from '@atlaskit/navigation'

const BackIcon = (
  <Tooltip position="right" content="Back">
    <ArrowLeftIcon label="Back icon" size="medium" />
  </Tooltip>
)

const ContainerHeaderComponent = () => (
  <div>
    <AkContainerLogo>App.co</AkContainerLogo>
  </div>
)

const GlobalCreateIcon = ({ openDrawer }) => (
  <Tooltip position="right" content="Create">
    <AddIcon label="Create icon" secondaryColor="inherit" size="medium" onClick={() => openDrawer('create')} />
  </Tooltip>
)

const GlobalSearchIcon = ({ openDrawer }) => (
  <Tooltip position="right" content="Search">
    <SearchIcon label="Search icon" secondaryColor="inherit" size="medium" onClick={() => openDrawer('search')} />
  </Tooltip>
)

class AdminHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: true,
      menuLoading: true,
      openDrawer: null,
      stack: [],
      width: this.props.width
    }
    this.openDrawer = this.openDrawer.bind(this)
    this.closeDrawer = this.closeDrawer.bind(this)
  }

  componentDidMount() {
    if (this.props.jwt) {
      this.props.fetchAdminApps(this.props.apiServer, this.props.jwt)
    }
  }

  getCreateDrawer() {
    return (
      <AkCreateDrawer
        backIcon={BackIcon}
        isOpen={this.state.openDrawer === 'create'}
        key="create"
        onBackButton={this.closeDrawer}
        // primaryIcon={<ConfluenceIcon label="Confluence icon" size="large" />}
      >
        <AkNavigationItem text="Item outside a group" />
          <AkNavigationItemGroup title="Create item group">
            <AkNavigationItem icon={<ConfluenceIcon label="Confluence icon" />} text="Item with an icon" />
              <AkNavigationItem
                icon={<JiraIcon label="Jira icon" />}
                text="A really, really, quite long, actually super long container name"
              />
          </AkNavigationItemGroup>
      </AkCreateDrawer>
    )
  }

  getSearchDrawer() {
    return (
      <AkSearchDrawer
        backIcon={BackIcon}
        isOpen={this.state.openDrawer === 'search'}
        key="seach"
        onBackButton={this.closeDrawer}
        // primaryIcon={<ConfluenceIcon label="Confluence icon" size="large" />}
      >
        <AkSearch placeholder="Search..." onKeyDown={() => {}} />
      </AkSearchDrawer>
    )
  }

  openDrawer(name) {
    console.log(`on ${name} drawer open called`)

    this.setState({
      openDrawer: name
    })
  }

  closeDrawer() {
    this.setState({
      openDrawer: null
    })
  }

  resize(resizeState) {
    console.log('onResize called')
    this.setState({
      isOpen: resizeState.isOpen,
      width: resizeState.width
    })
  }

  goBackHome() {
    if (this.state.stack.length <= 1) {
      return false
    }

    const stack = this.state.stack.slice(0, this.state.stack.length - 1)
    return this.setState({ stack })
  }

  timerMenu() {
    setTimeout(() => this.setState({ menuLoading: false }), 2000)
  }

  render() {
    const stack = [[]]
    let item = null
    if (this.props.user.user) {
      const isPending = this.props.router.route === '/admin/pending'
      stack[0] = [
        <Link href="/admin" key="apps">
          <AkNavigationItem
            text="Apps"
            icon={<DiscoverIcon label="Apps Icon" size="medium" />}
            isSelected={!isPending}
          />
        </Link>,
        <Link href="/admin/pending" key="pending">
          <AkNavigationItem
            text="Pending"
            icon={<WarningIcon label="Pending Apps Icon" size="medium" />}
            isSelected={isPending}
          />
        </Link>,
        <AkNavigationItemGroup title="App Mining" key="appMining">
          <Link href="/admin/mining/months">
            <AkNavigationItem text="Months" />
          </Link>
        </AkNavigationItemGroup>,
        <AkNavigationItemGroup title="Authentication" key="authentication">
          <AkNavigationItem text="Log Out" onClick={() => this.props.signOut()} />
        </AkNavigationItemGroup>
      ]
    } else {
      item = (
        <AkNavigationItem
          text="Sign In"
          icon={<PeopleIcon label="Sign In Icon" size="medium" />}
          isSelected
          key="sign-in"
        />
      )
    }
    stack[0].push(item)
    return (
      <Page
        navigation={
          <Navigation
            drawers={[this.getSearchDrawer(), this.getCreateDrawer()]}
            containerTheme={presetThemes.global}
            containerHeaderComponent={() => <ContainerHeaderComponent />}
            globalCreateIcon={<GlobalCreateIcon openDrawer={this.openDrawer} />}
            // globalPrimaryIcon={<ConfluenceIcon label="Confluence icon" size="large" />}
            globalPrimaryItemHref="//www.atlassian.com/software/confluence"
            globalSearchIcon={<GlobalSearchIcon openDrawer={this.openDrawer} />}
            isOpen={this.state.isOpen}
            // onResize={this.resize}
            // onResizeStart={(e) => console.log('resizeStart', e)}
            width={this.state.width}
            hasScrollHintTop
          >
            <AkContainerNavigationNested stack={stack} />
          </Navigation>
        }
      >
        <Grid layout="fixed">
          <GridColumn medium={12}>
            <br />
              <br />
            {this.props.children}
          </GridColumn>
        </Grid>
      </Page>
    )
  }
}

const mapStateToProps = (state) => ({
  apps: state.apps.apps,
  apiServer: state.apps.apiServer,
  jwt: state.user.jwt,
  user: state.user
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, AppStore.actions, UserStore.actions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AdminHome))
