import React, { Component } from 'react';
import AddIcon from '@atlaskit/icon/glyph/add';
import AddonIcon from '@atlaskit/icon/glyph/addon';
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import Button from '@atlaskit/button';
import ChevronRightIcon from '@atlaskit/icon/glyph/chevron-right';
import CalendarIcon from '@atlaskit/icon/glyph/calendar';
import ConfluenceIcon from '@atlaskit/icon/glyph/confluence';
import { ConfluenceWordmark } from '@atlaskit/logo';
import CrossCircleIcon from '@atlaskit/icon/glyph/cross-circle';
import DiscoverIcon from '@atlaskit/icon/glyph/discover';
import EditorAlignLeftIcon from '@atlaskit/icon/glyph/editor/align-left';
import EditorFeedbackIcon from '@atlaskit/icon/glyph/editor/feedback';
import FolderIcon from '@atlaskit/icon/glyph/folder';
import JiraIcon from '@atlaskit/icon/glyph/jira';
import Lorem from 'react-lorem-component';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import PeopleIcon from '@atlaskit/icon/glyph/people';
import SearchIcon from '@atlaskit/icon/glyph/search';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import Tooltip from '@atlaskit/tooltip';
import TrayIcon from '@atlaskit/icon/glyph/tray';
import WorldIcon from '@atlaskit/icon/glyph/world';
import QuestionIcon from '@atlaskit/icon/glyph/question';
import { AkSearch } from '@atlaskit/quick-search';
import Link from 'next/link';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AppStore from '@stores/apps';
import UserStore from '@stores/user';

import Navigation, {
  AkContainerLogo,
  AkContainerNavigationNested,
  AkCreateDrawer,
  AkNavigationItemGroup,
  AkNavigationItem,
  AkSearchDrawer,
  presetThemes,
} from '@atlaskit/navigation';

const BackIcon = (
  <Tooltip position="right" content="Back">
    <ArrowLeftIcon label="Back icon" size="medium" />
  </Tooltip>
);

const ContainerHeaderComponent = () => (
  <div>
    <AkContainerLogo>App.co</AkContainerLogo>
  </div>
);

const GlobalCreateIcon = ({ openDrawer }) => (
  <Tooltip position="right" content="Create">
    <AddIcon label="Create icon" secondaryColor="inherit" size="medium" onClick={() => openDrawer('create')} />
  </Tooltip>
);

const GlobalSearchIcon = ({ openDrawer }) => (
  <Tooltip position="right" content="Search">
    <SearchIcon label="Search icon" secondaryColor="inherit" size="medium" onClick={() => openDrawer('search')} />
  </Tooltip>
);

class AdminHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
      menuLoading: true,
      openDrawer: null,
      stack: [],
      width: this.props.width,
    };
    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
  }

  getCreateDrawer() {
    return (
      <AkCreateDrawer
        backIcon={BackIcon}
        isOpen={this.state.openDrawer === 'create'}
        key="create"
        onBackButton={this.closeDrawer}
        primaryIcon={<ConfluenceIcon label="Confluence icon" size="large" />}
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
    );
  }

  getSearchDrawer() {
    return (
      <AkSearchDrawer
        backIcon={BackIcon}
        isOpen={this.state.openDrawer === 'search'}
        key="seach"
        onBackButton={this.closeDrawer}
        primaryIcon={<ConfluenceIcon label="Confluence icon" size="large" />}
      >
        <AkSearch placeholder="Search..." onKeyDown={() => {}}>
          <AkNavigationItemGroup title="RECENTLY VIEWED">
            <AkNavigationItem icon={<EditorAlignLeftIcon label="Editor icon" />} text="Article 1" />
            <AkNavigationItem icon={<EditorAlignLeftIcon label="Editor icon" />} text="Article 2" />
          </AkNavigationItemGroup>
          <AkNavigationItemGroup title="RECENT SPACES">
            <AkNavigationItem icon={<ConfluenceIcon label="Confluence icon" />} text="Confluence" />
            <AkNavigationItem icon={<JiraIcon label="Jira icon" />} text="Jira" />
          </AkNavigationItemGroup>
        </AkSearch>
      </AkSearchDrawer>
    );
  }

  openDrawer(name) {
    console.log(`on ${name} drawer open called`);

    this.setState({
      openDrawer: name,
    });
  }

  closeDrawer() {
    this.setState({
      openDrawer: null,
    });
  }

  resize(resizeState) {
    console.log('onResize called');
    this.setState({
      isOpen: resizeState.isOpen,
      width: resizeState.width,
    });
  }

  goBackHome() {
    if (this.state.stack.length <= 1) {
      return false;
    }

    const stack = this.state.stack.slice(0, this.state.stack.length - 1);
    return this.setState({ stack });
  }

  timerMenu() {
    setTimeout(() => this.setState({ menuLoading: false }), 2000);
  }

  render() {
    const stack = [[]];
    let item = null;
    if (this.props.user.user) {
      item = (
        <Link href="/admin" key="apps">
          <AkNavigationItem text="Apps" icon={<DiscoverIcon label="Apps Icon" size="medium" />} isSelected />
        </Link>
      );
    } else {
      item = (
        <AkNavigationItem
          text="Sign In"
          icon={<PeopleIcon label="Sign In Icon" size="medium" />}
          isSelected
          key="sign-in"
        />
      );
    }
    stack[0].push(item);
    return (
      <Page
        navigation={
          <Navigation
            drawers={[this.getSearchDrawer(), this.getCreateDrawer()]}
            containerTheme={presetThemes.global}
            containerHeaderComponent={() => <ContainerHeaderComponent />}
            globalCreateIcon={<GlobalCreateIcon openDrawer={this.openDrawer} />}
            globalPrimaryIcon={<ConfluenceIcon label="Confluence icon" size="large" />}
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
    );
  }
}

const mapStateToProps = (state) => ({
  apps: state.apps.apps,
  apiServer: state.apps.apiServer,
  user: state.user,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, AppStore.actions, UserStore.actions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminHome);
