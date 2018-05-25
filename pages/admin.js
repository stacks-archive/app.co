import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Page } from '@containers/page';
import { Header } from '@containers/header';
import { Hero } from '@containers/hero';
import { Button } from '@components/button';

import AppStore from '@stores/apps';
import UserStore from '@stores/user';

import 'isomorphic-unfetch';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signingIn: false,
    };
  }

  componentDidMount() {
    // this.signInWithToken();
    this.props.handleSignIn(this.props.apiServer);
  }

  render() {
    return (
      <div>
        <Header data={this.props.data} />
        <Hero />

        <Page.Section wrap={1}>
          <Page.Section.Content>
            <Button
              type="button/primary"
              onClick={() => {
                this.props.signIn();
              }}
            >
              Sign In with Blockstack
            </Button>
          </Page.Section.Content>
        </Page.Section>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
