import React from 'react';
import { Page } from '@containers/page';
import Newsletter from '@components/newsletter-cta';
import { Button } from '@components/button';

export default class NewsletterCTA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
    };
  }

  render() {
    return (
      <Newsletter.Wrapper>
        <Newsletter.Section>
          <h2>Join Our Newsletter</h2>
          <p>Keep up to date with Dapps and Dabbing</p>
        </Newsletter.Section>
        <Newsletter.RightSection>
          <Newsletter.Input placeholder="Enter your email" />
          <Newsletter.Button>Submit</Newsletter.Button>
        </Newsletter.RightSection>
      </Newsletter.Wrapper>
    );
  }
}
