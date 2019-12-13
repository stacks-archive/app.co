import React from 'react';
import { Page } from '@components/page';
import { Section, Content } from '@components/mining-admin/month';
import Head from '@containers/head';
import { Type } from 'blockstack-ui';
import { Ol, Li } from '@components/mining/instructions';
import RegisteredApps from '@components/mining/registered-apps';

class DeveloperInstructions extends React.Component {
  static async getInitialProps() {
    const response = await fetch(`https://api.app.co/api/app-mining-apps`);
    const data = await response.json();
    return { apps: data.apps };
  }
  render() {
    return (
      <Page>
        <Head title="App Mining Developer Instructions" />
        <Section mx="auto" my={5} width={[1, 0.6]}>
          <h2>Register for App Mining</h2>
          <Content>
            <Type.p>
              Complete all of the following steps to register your app for App
              Mining and start receiving rewards.
            </Type.p>
            <Ol>
              <Li>
                <Type.p mt={0}>
                  <a href="https://blockstack.org/tutorials/todo-list/">
                    Integrate Blockstack Auth into your app
                  </a>
                </Type.p>
              </Li>
              <Li>
                <Type.p mt={0}>
                  <a href="https://app.co/submit">Add your app to App.co</a>
                </Type.p>
                <Type.p>
                  Make sure to indicate "Blockstack" for authentication at the
                  bottom of the form.
                </Type.p>
              </Li>
              <Li>
                <Type.p>Complete our identity verification process</Type.p>
                <Type.p>
                  <a href="mailto:app-mining@blockstack.org&subject=Register for App Mining">
                    Email us with the domain you used to register your app
                  </a>{' '}
                  and we'll send you verification materials.
                </Type.p>
                <Type.p>
                  Fill them out and email them back to us along with the BTC
                  address with which you'd like to be paid rewards.
                </Type.p>
              </Li>
            </Ol>
            <Type.p>
              <em>
                The above steps must be completed before any month in which
                you'd like to receive rewards!
              </em>
            </Type.p>
            <Type.p>
              If we can't verify their completion by the first day of the month,
              your app won't be eligible until the following month at the
              earliest.
            </Type.p>
            <Type.p>
              Your app will appear in the list below as soon as it's fully
              registered.
            </Type.p>
          </Content>
        </Section>

        <RegisteredApps apps={this.props.apps} />
      </Page>
    );
  }
}

export default DeveloperInstructions;
