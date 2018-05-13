import React from 'react';
import { Page } from '@containers/page';
import Newsletter from '@components/newsletter-cta';
import { Button } from '@components/button';

export default class NewsletterCTA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      email: '',
    };
    this.submit = this.submit.bind(this);
  }

  submit() {
    const url = `${this.props.apiServer}/api/subscribe`;
    this.setState({ submitted: true });
    const { email } = this.state;
    const data = { email };
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  render() {
    return (
      <Newsletter.Wrapper>
        <Newsletter.Section>
          <h2>Join Our Newsletter</h2>
          <p>Keep updated as we build new features and add more dapps.</p>
        </Newsletter.Section>
        <Newsletter.RightSection>
          {this.state.submitted ? (
            <p>Thanks for joining!</p>
          ) : (
            <div>
              <Newsletter.Input
                placeholder="Enter your email"
                onChange={(evt) => this.setState({ email: evt.target.value })}
              />
              <Newsletter.Button onClick={this.submit}>Submit</Newsletter.Button>
            </div>
          )}
        </Newsletter.RightSection>
      </Newsletter.Wrapper>
    );
  }
}
