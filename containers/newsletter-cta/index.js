import React from 'react';
import { Page } from '@containers/page';
import Newsletter from '@components/newsletter-cta';
import { Button } from '@components/button';

const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

export default class NewsletterCTA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      email: '',
      valid: true,
    };
    this.submit = this.submit.bind(this);
  }

  submit() {
    const url = `${this.props.apiServer}/api/subscribe`;
    const { email } = this.state;
    if (email.match(EMAIL_REGEX)) {
      const data = { email };
      this.setState({ submitted: true, valid: true });
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    } else {
      this.setState({ valid: false });
    }
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
                type="email"
              />
              <Newsletter.Button onClick={this.submit}>Submit</Newsletter.Button>
              {!this.state.valid && (
                <div>
                  <br />
                  <p>Please enter a valid email.</p>
                </div>
              )}
            </div>
          )}
        </Newsletter.RightSection>
      </Newsletter.Wrapper>
    );
  }
}
