import React from 'react';
import * as blockstack from 'blockstack';

import { Page } from '@containers/page';
import { Header } from '@containers/header';
import { Hero } from '@containers/hero';
import { Button } from '@components/button';

import 'isomorphic-unfetch';

const signIn = () => {
  const redirect = `${window.location.origin}/admin`;
  const manifest = `${window.location.origin}/static/manifest.json`;
  blockstack.redirectToSignIn(redirect, manifest);
};

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signingIn: false,
    };
  }

  componentDidMount() {
    this.signInWithToken();
  }

  async signInWithToken() {
    const token = blockstack.getAuthResponseToken();
    if (!token || this.state.signingIn) {
      return true;
    }
    this.setState({ signingIn: true });
    // console.log(token);
    const url = `${this.props.data.apiServer}/api/authenticate?authToken=${token}`;
    const response = await fetch(url, {
      method: 'POST',
    });
    const json = await response.json();
    console.log(json);
    return true;
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
                signIn();
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
